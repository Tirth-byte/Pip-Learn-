/**
 * PipLearn Behavioral Milestone Validation Engine
 * 
 * Executes black-box behavioral test fixtures against learner Python code,
 * drives automated stdin interactions, evaluates assertion outcomes,
 * and formats learner-safe diagnostic feedback.
 * 
 * Crucial Boundary Invariant:
 * Validation does NOT mutate learner progress or workspace state.
 */

import { ExecutionProvider } from "@/execution/execution-provider.interface";
import { createExecutionProvider } from "@/execution";
import { PythonRuntimeError } from "@/execution/types";
import { evaluateAssertion } from "./comparison";
import { smartCalculatorValidationSuites } from "./suites/smart-calculator";
import {
  CriterionValidationResult,
  MilestoneValidationSuite,
  TestCaseValidationResult,
  ValidationEngine,
  ValidationRequest,
  ValidationResult,
  ValidationStatus,
} from "./types";

export class DefaultValidationEngine implements ValidationEngine {
  private executionProvider: ExecutionProvider | null = null;
  private suiteRegistry: Record<string, MilestoneValidationSuite>;

  constructor(
    customProvider?: ExecutionProvider,
    customSuites?: Record<string, MilestoneValidationSuite>
  ) {
    if (customProvider) {
      this.executionProvider = customProvider;
    }
    this.suiteRegistry = customSuites || smartCalculatorValidationSuites;
  }

  public registerSuite(suite: MilestoneValidationSuite): void {
    this.suiteRegistry[suite.milestoneId] = suite;
  }

  public getSuite(milestoneId: string): MilestoneValidationSuite | undefined {
    return this.suiteRegistry[milestoneId];
  }

  public async validateMilestone(request: ValidationRequest): Promise<ValidationResult> {
    const startTime = performance.now();
    const timestamp = new Date().toISOString();

    // 1. Resolve validation suite
    const suite = request.customSuite || this.suiteRegistry[request.milestoneId];
    if (!suite) {
      return {
        status: "invalid_configuration",
        passed: false,
        projectId: request.projectId,
        milestoneId: request.milestoneId,
        curriculumVersion: request.curriculumVersion || "unknown",
        totalChecks: 0,
        passedChecks: 0,
        criteriaResults: [],
        testCaseResults: [],
        durationMs: Math.round(performance.now() - startTime),
        timestamp,
      };
    }

    // 2. Resolve code to execute
    const entrypoint = request.entrypoint || "calculator.py";
    const code = request.files[entrypoint] || Object.values(request.files)[0] || "";

    if (!code.trim()) {
      return {
        status: "failed",
        passed: false,
        projectId: request.projectId,
        milestoneId: request.milestoneId,
        curriculumVersion: suite.version,
        totalChecks: suite.testCases.length,
        passedChecks: 0,
        criteriaResults: [],
        testCaseResults: suite.testCases.map((tc) => ({
          testCaseId: tc.id,
          name: tc.name,
          passed: false,
          learnerFeedback: "No code found in active file to validate.",
          durationMs: 0,
        })),
        durationMs: Math.round(performance.now() - startTime),
        timestamp,
      };
    }

    // 3. Resolve execution provider
    const provider = this.executionProvider || createExecutionProvider("pyodide");

    const testCaseResults: TestCaseValidationResult[] = [];
    let overallExecutionError: PythonRuntimeError | undefined = undefined;
    let hasTimeout = false;
    let hasExecutionError = false;

    // 4. Execute each behavioral test case fixture sequentially
    for (const testCase of suite.testCases) {
      const tcStartTime = performance.now();
      const inputQueue = [...testCase.simulatedInputs];
      let collectedStdout = "";
      let tcExecutionError: PythonRuntimeError | undefined = undefined;

      try {
        const execResult = await provider.run(
          {
            code,
            timeoutMs: testCase.timeoutMs || 8000,
            cleanEnvironment: true,
          },
          async (event) => {
            if (event.type === "waiting_for_input") {
              if (inputQueue.length > 0) {
                const nextInput = inputQueue.shift()!;
                await provider.provideStdin(nextInput);
              } else {
                // Empty string on unexpected extra input
                await provider.provideStdin("");
              }
            } else if (event.type === "stdout") {
              collectedStdout += event.chunk;
            }
          }
        );

        const tcDurationMs = Math.round(performance.now() - tcStartTime);

        // Handle execution statuses
        if (execResult.status === "timed_out") {
          hasTimeout = true;
          testCaseResults.push({
            testCaseId: testCase.id,
            name: testCase.name,
            passed: false,
            learnerFeedback: `Execution timed out while testing inputs: [${testCase.simulatedInputs.join(", ")}]. Check for runaway loops.`,
            actualStdout: collectedStdout,
            durationMs: tcDurationMs,
          });
          continue;
        }

        if (execResult.status === "runtime_error" && execResult.error) {
          hasExecutionError = true;
          tcExecutionError = execResult.error;
          if (!overallExecutionError) {
            overallExecutionError = execResult.error;
          }

          testCaseResults.push({
            testCaseId: testCase.id,
            name: testCase.name,
            passed: false,
            learnerFeedback: `Your program could not finish this check because Python encountered a ${execResult.error.name}: ${execResult.error.message}`,
            actualStdout: collectedStdout,
            executionError: execResult.error,
            durationMs: tcDurationMs,
          });
          continue;
        }

        // Evaluate all behavioral assertions for this test case
        let tcPassed = true;
        let failureFeedback: string | undefined = undefined;

        for (const assertion of testCase.assertions) {
          const evalResult = evaluateAssertion(collectedStdout, assertion);
          if (!evalResult.passed) {
            tcPassed = false;
            failureFeedback = evalResult.failureMessage;
            break; // Stop at first failing assertion in this fixture
          }
        }

        testCaseResults.push({
          testCaseId: testCase.id,
          name: testCase.name,
          passed: tcPassed,
          learnerFeedback: tcPassed ? undefined : failureFeedback,
          actualStdout: collectedStdout,
          executionError: tcExecutionError,
          durationMs: tcDurationMs,
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        hasExecutionError = true;
        testCaseResults.push({
          testCaseId: testCase.id,
          name: testCase.name,
          passed: false,
          learnerFeedback: `Execution engine error: ${errorMsg}`,
          durationMs: Math.round(performance.now() - tcStartTime),
        });
      }
    }

    // 5. Map test case results to criteria
    const criteriaResults = this.mapResultsToCriteria(suite, testCaseResults);

    // 6. Calculate overall pass/fail status
    const totalChecks = testCaseResults.length;
    const passedChecks = testCaseResults.filter((r) => r.passed).length;
    const allPassed = passedChecks === totalChecks && totalChecks > 0;

    let overallStatus: ValidationStatus = "failed";
    if (allPassed) {
      overallStatus = "passed";
    } else if (hasTimeout) {
      overallStatus = "timed_out";
    } else if (hasExecutionError && passedChecks === 0) {
      overallStatus = "execution_error";
    } else {
      overallStatus = "failed";
    }

    return {
      status: overallStatus,
      passed: allPassed,
      projectId: suite.projectId,
      milestoneId: suite.milestoneId,
      curriculumVersion: suite.version,
      totalChecks,
      passedChecks,
      criteriaResults,
      testCaseResults,
      executionError: overallExecutionError,
      durationMs: Math.round(performance.now() - startTime),
      timestamp,
    };
  }

  private mapResultsToCriteria(
    suite: MilestoneValidationSuite,
    testCaseResults: TestCaseValidationResult[]
  ): CriterionValidationResult[] {
    const criterionMap = new Map<string, { passed: boolean; descriptions: string[]; feedbacks: string[] }>();

    for (const tc of suite.testCases) {
      const tcResult = testCaseResults.find((r) => r.testCaseId === tc.id);
      const isPassed = tcResult?.passed ?? false;

      if (tc.criterionIds && tc.criterionIds.length > 0) {
        for (const critId of tc.criterionIds) {
          const existing = criterionMap.get(critId) || { passed: true, descriptions: [], feedbacks: [] };
          existing.passed = existing.passed && isPassed;
          existing.descriptions.push(tc.description);
          if (!isPassed && tcResult?.learnerFeedback) {
            existing.feedbacks.push(tcResult.learnerFeedback);
          }
          criterionMap.set(critId, existing);
        }
      }
    }

    const results: CriterionValidationResult[] = [];
    for (const [critId, data] of criterionMap.entries()) {
      results.push({
        criterionId: critId,
        passed: data.passed,
        description: data.descriptions[0] || critId,
        learnerFeedback: data.passed ? undefined : data.feedbacks[0],
      });
    }

    return results;
  }
}
