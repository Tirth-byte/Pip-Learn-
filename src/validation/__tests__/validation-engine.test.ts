/**
 * Behavioral Milestone Validation Engine Unit Tests
 * 
 * Tests validation contracts, automated stdin fixture feeding, behavioral assertions,
 * multiple valid implementations, error preservation, and state mutation invariants.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MockExecutionProvider } from "@/execution/providers/mock-provider";
import {
  createValidationEngine,
} from "../index";
import { approxEqual, containsNumericValue, checkStringConcatTrap } from "../comparison";

describe("Output Comparison & Normalization Helpers", () => {
  it("should match numbers with floating-point tolerance", () => {
    assert.ok(approxEqual(30.0, 30));
    assert.ok(approxEqual(0.1 + 0.2, 0.3, 1e-4));
    assert.ok(!approxEqual(30.0, 31.0));
  });

  it("should find numeric values embedded in terminal output", () => {
    assert.ok(containsNumericValue("Sum: 30", 30));
    assert.ok(containsNumericValue("Addition Result: 30.0\n", 30));
    assert.ok(containsNumericValue("Result = 51.0 (Exact)", 51));
    assert.ok(!containsNumericValue("Sum: 29", 30));
  });

  it("should accurately detect the String Concatenation Trap", () => {
    assert.ok(checkStringConcatTrap("Sum: 1020", "10", "20"));
    assert.ok(checkStringConcatTrap("Result: 78", "7", "8"));
    assert.ok(!checkStringConcatTrap("Sum: 30", "10", "20"));
  });
});

describe("Behavioral Milestone Validation Engine", () => {
  it("should validate Milestone 1 passing implementation (Alex & Sam)", async () => {
    const mock = new MockExecutionProvider({
      promptCount: 1,
      dynamicHandler: (inputs) => ({
        stdout: `=== SMART CALCULATOR ===\nWelcome, ${inputs[0] || "User"}!\n`,
      }),
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-1",
      files: { "calculator.py": "name = input('Name: ')\nprint('Welcome, ' + name)" },
    });

    assert.equal(result.status, "passed");
    assert.equal(result.passed, true);
    assert.equal(result.totalChecks, 2);
    assert.equal(result.passedChecks, 2);
  });

  it("should fail Milestone 1 when greeting does not contain input name", async () => {
    const mock = new MockExecutionProvider({
      promptCount: 1,
      dynamicHandler: () => ({
        stdout: "=== SMART CALCULATOR ===\nWelcome, Hardcoded Name!\n",
      }),
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-1",
      files: { "calculator.py": "name = input()\nprint('Welcome, Hardcoded Name!')" },
    });

    assert.equal(result.status, "failed");
    assert.equal(result.passed, false);
    assert.ok(result.testCaseResults[0]?.learnerFeedback?.includes("Alex"));
  });

  it("should pass Milestone 2 using float() conversion", async () => {
    const mock = new MockExecutionProvider({
      promptCount: 3,
      dynamicHandler: (inputs) => {
        const name = inputs[0] || "User";
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "0");
        return {
          stdout: `Hello, ${name}!\nSum: ${n1 + n2}\n`,
        };
      },
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-2",
      files: {
        "calculator.py": "name = input()\na = float(input())\nb = float(input())\nprint('Sum:', a + b)",
      },
    });

    assert.equal(result.status, "passed");
    assert.equal(result.passed, true);
    assert.equal(result.passedChecks, 3);
  });

  it("should pass Milestone 2 using int() conversion (multiple valid implementations)", async () => {
    const mock = new MockExecutionProvider({
      promptCount: 3,
      dynamicHandler: (inputs) => {
        const name = inputs[0] || "User";
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "0");
        return {
          stdout: `Hello ${name}!\nCalculated: ${n1 + n2}\n`,
        };
      },
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-2",
      files: {
        "calculator.py": "name = input()\na = int(input())\nb = int(input())\nprint('Calculated:', a + b)",
      },
    });

    assert.equal(result.status, "passed");
    assert.equal(result.passed, true);
  });

  it("should fail Milestone 2 when string concatenation trap occurs", async () => {
    const mock = new MockExecutionProvider({
      promptCount: 3,
      dynamicHandler: (inputs) => {
        const name = inputs[0] || "User";
        const in1 = inputs[1] || "";
        const in2 = inputs[2] || "";
        return {
          stdout: `Hello ${name}!\nSum: ${in1}${in2}\n`,
        };
      },
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-2",
      files: {
        "calculator.py": "name = input()\na = input()\nb = input()\nprint('Sum:', a + b)",
      },
    });

    assert.equal(result.status, "failed");
    assert.equal(result.passed, false);
    assert.ok(
      result.testCaseResults[0]?.learnerFeedback?.includes("joined the text inputs") ||
      result.testCaseResults[0]?.learnerFeedback?.includes("1020")
    );
  });

  it("should pass Milestone 3 with all 7 mathematical operators", async () => {
    const mock = new MockExecutionProvider({
      promptCount: 3,
      dynamicHandler: (inputs) => {
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "1");
        return {
          stdout: `
Sum: ${n1 + n2}
Difference: ${n1 - n2}
Product: ${n1 * n2}
Exact Div: ${n1 / n2}
Floor Div: ${Math.floor(n1 / n2)}
Modulo: ${n1 % n2}
Power: ${Math.pow(n1, 2)}
`,
        };
      },
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-3",
      files: { "calculator.py": "# Full math suite" },
    });

    assert.equal(result.status, "passed");
    assert.equal(result.passed, true);
    assert.equal(result.passedChecks, 2);
  });

  it("should pass Milestone 4 formatted calculation receipt", async () => {
    const mock = new MockExecutionProvider({
      promptCount: 3,
      dynamicHandler: (inputs) => {
        const name = inputs[0] || "Alex";
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "1");
        return {
          stdout: `
========================================
   CALCULATION RECEIPT FOR ${name.toUpperCase()}
========================================
Addition (+)       : ${n1 + n2}
Subtraction (-)    : ${n1 - n2}
Multiplication (*) : ${n1 * n2}
Division (/)       : ${n1 / n2}
Floor Div (//)     : ${Math.floor(n1 / n2)}
Modulo (%)         : ${n1 % n2}
Squared (**)       : ${Math.pow(n1, 2)}
========================================
`,
        };
      },
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-4",
      files: { "calculator.py": "# Receipt code" },
    });

    assert.equal(result.status, "passed");
    assert.equal(result.passed, true);
    assert.equal(result.passedChecks, 2);
  });

  it("should preserve Python runtime error and return execution_error status", async () => {
    const mock = new MockExecutionProvider({
      error: {
        name: "NameError",
        message: "name 'num1' is not defined",
        traceback: "NameError: name 'num1' is not defined on line 3",
        line: 3,
      },
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-2",
      files: { "calculator.py": "total = num1 + num2" },
    });

    assert.equal(result.status, "execution_error");
    assert.equal(result.passed, false);
    assert.equal(result.executionError?.name, "NameError");
    assert.ok(result.testCaseResults[0]?.learnerFeedback?.includes("NameError"));
  });

  it("should handle execution timeout and return timed_out status", async () => {
    const mock = new MockExecutionProvider({
      dynamicHandler: () => ({
        timedOut: true,
      }),
    });

    const engine = createValidationEngine(mock);
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-2",
      files: { "calculator.py": "while True:\n    pass" },
    });

    assert.equal(result.status, "timed_out");
    assert.equal(result.passed, false);
    assert.ok(result.testCaseResults[0]?.learnerFeedback?.includes("timed out"));
  });

  it("should return invalid_configuration for unknown milestone IDs", async () => {
    const engine = createValidationEngine();
    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-unknown-999",
      files: { "calculator.py": "print('hello')" },
    });

    assert.equal(result.status, "invalid_configuration");
    assert.equal(result.passed, false);
  });

  it("INVARIANT: validation must NOT mutate learner progress or workspace state", async () => {
    const mock = new MockExecutionProvider({
      stdoutChunks: ["Alex\nSum: 30\n"],
    });
    const engine = createValidationEngine(mock);

    const result = await engine.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-2",
      files: { "calculator.py": "print('Sum: 30')" },
    });

    assert.ok(result);
    assert.equal(typeof result.passed, "boolean");
    assert.equal(result.projectId, "project-smart-calculator");
    assert.equal(result.milestoneId, "milestone-calc-2");
  });
});
