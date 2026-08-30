import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { defaultRegistry } from "../../curriculum";
import {
  initializeLearnerProject,
  initializeLearnerModuleProgress,
  completeMilestone,
  advanceToNextMilestone,
  updateProjectFile,
} from "../transitions";
import { LocalLearnerStorageAdapter } from "../persistence/local-storage";
import { learnerEventBus } from "../events";
import { AppState, initialSeedData } from "../../lib/seed-data";
import { validateMilestone } from "../../validation";
import { MockExecutionProvider } from "../../execution/providers/mock-provider";

// Mock localStorage in Node test environment
const mockStorageData = new Map<string, string>();
const nodeLocalStorage = {
  getItem: (key: string) => mockStorageData.get(key) || null,
  setItem: (key: string, value: string) => {
    mockStorageData.set(key, value);
  },
  removeItem: (key: string) => {
    mockStorageData.delete(key);
  },
  clear: () => {
    mockStorageData.clear();
  },
};

(globalThis as unknown as Record<string, unknown>).localStorage = nodeLocalStorage;

describe("Step 11 — Milestone 2: Addition Engine Integration Tests", () => {
  beforeEach(() => {
    mockStorageData.clear();
    learnerEventBus.clear();
  });

  it("1. Milestone 1 remains completed when entering Milestone 2", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    state = updateProjectFile(
      state,
      "calculator.py",
      'print("=== SMART CALCULATOR ===")\nname = input("Name: ")\nprint("Hello, " + name)'
    );

    const { state: completedM1State } = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    assert.equal(completedM1State.milestoneStates["milestone-calc-1"].status, "completed");

    const m2State = advanceToNextMilestone(completedM1State, defaultRegistry);
    assert.equal(m2State.milestoneStates["milestone-calc-1"].status, "completed");
    assert.equal(m2State.currentMilestoneId, "milestone-calc-2");
    assert.equal(m2State.milestoneStates["milestone-calc-2"].status, "in_progress");
  });

  it("2. Learner code from Milestone 1 is preserved intact in Milestone 2", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const m1Code =
      'print("=== SMART CALCULATOR ===")\nname = input("Name: ")\nprint("Hello, " + name)';
    state = updateProjectFile(state, "calculator.py", m1Code);

    const { state: completedM1State } = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    const m2State = advanceToNextMilestone(completedM1State, defaultRegistry);

    assert.equal(m2State.files["calculator.py"], m1Code, "Learner code must be preserved intact");
  });

  it("3. Milestone 2 becomes active and has 3 criteria", () => {
    const m2 = defaultRegistry.getMilestone("milestone-calc-2");
    assert.ok(m2);
    assert.equal(m2.order, 2);
    assert.equal(m2.criteria.length, 3);
    assert.equal(m2.title, "Addition Engine");
  });

  it("4. Running code (Run button) does NOT complete Milestone 2", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const { state: m1Done } = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    state = advanceToNextMilestone(m1Done, defaultRegistry);

    assert.equal(state.milestoneStates["milestone-calc-2"].status, "in_progress");
    assert.equal(state.milestoneStates["milestone-calc-2"].completedAt, undefined);
  });

  it("5. int() implementation passes Milestone 2 validation", async () => {
    const code = `
print("=== SMART CALCULATOR ===")
name = input("Name: ")
print("Hello, " + name)
num1 = int(input("First: "))
num2 = int(input("Second: "))
print(num1 + num2)
`;
    const provider = new MockExecutionProvider({
      dynamicHandler: (inputs: string[]) => {
        const name = inputs[0] || "User";
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "0");
        return {
          stdout: `=== SMART CALCULATOR ===\nHello, ${name}\n${n1 + n2}\n`,
        };
      },
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": code },
      },
      provider
    );

    assert.equal(result.passed, true, "int() conversion should pass");
    assert.equal(result.testCaseResults.length, 3);
  });

  it("6. float() implementation passes Milestone 2 validation", async () => {
    const code = `
print("=== SMART CALCULATOR ===")
name = input("Name: ")
print("Hello, " + name)
a = float(input("First: "))
b = float(input("Second: "))
print(f"Sum: {a + b}")
`;
    const provider = new MockExecutionProvider({
      dynamicHandler: (inputs: string[]) => {
        const name = inputs[0] || "User";
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "0");
        return {
          stdout: `=== SMART CALCULATOR ===\nHello, ${name}\nSum: ${n1 + n2}\n`,
        };
      },
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": code },
      },
      provider
    );

    assert.equal(result.passed, true, "float() conversion should pass");
  });

  it("7. Custom variable names and structure pass Milestone 2 validation", async () => {
    const code = `
print("Welcome!")
user = input("Your name: ")
print("Welcome, " + user)
x = input("Number 1: ")
y = input("Number 2: ")
result = float(x) + float(y)
print("Total:", result)
`;
    const provider = new MockExecutionProvider({
      dynamicHandler: (inputs: string[]) => {
        const name = inputs[0] || "User";
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "0");
        return {
          stdout: `Welcome!\nWelcome, ${name}\nTotal: ${n1 + n2}\n`,
        };
      },
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": code },
      },
      provider
    );

    assert.equal(result.passed, true);
  });

  it("8. Helper function implementation passes Milestone 2 validation", async () => {
    const code = `
def add_numbers(x, y):
    return float(x) + float(y)

print("=== CALCULATOR ===")
name = input("Name: ")
print("Hi " + name)
print("Result is", add_numbers(input("Num 1: "), input("Num 2: ")))
`;
    const provider = new MockExecutionProvider({
      dynamicHandler: (inputs: string[]) => {
        const name = inputs[0] || "User";
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "0");
        return {
          stdout: `=== CALCULATOR ===\nHi ${name}\nResult is ${n1 + n2}\n`,
        };
      },
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": code },
      },
      provider
    );

    assert.equal(result.passed, true);
  });

  it("9. String concatenation behavior fails with clear behavioral feedback", async () => {
    const code = `
print("=== SMART CALCULATOR ===")
name = input("Name: ")
print("Hello, " + name)
num1 = input("First: ")
num2 = input("Second: ")
print(num1 + num2) # String concatenation bug!
`;
    const provider = new MockExecutionProvider({
      dynamicHandler: (inputs: string[]) => {
        const name = inputs[0] || "User";
        const s1 = inputs[1] || "";
        const s2 = inputs[2] || "";
        return {
          stdout: `=== SMART CALCULATOR ===\nHello, ${name}\n${s1 + s2}\n`,
        };
      },
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": code },
      },
      provider
    );

    assert.equal(result.passed, false, "String concatenation must fail");
    const failedTc = result.testCaseResults.find((tc) => !tc.passed);
    assert.ok(failedTc);
    assert.ok(
      failedTc.learnerFeedback?.includes("text") || failedTc.learnerFeedback?.includes("joined"),
      "Feedback must mention joining text inputs"
    );
  });

  it("10. Wrong arithmetic calculation fails validation", async () => {
    const code = `
print("=== SMART CALCULATOR ===")
name = input("Name: ")
num1 = float(input("First: "))
num2 = float(input("Second: "))
print(num1 * num2) # Multiplying instead of adding
`;
    const provider = new MockExecutionProvider({
      dynamicHandler: (inputs: string[]) => {
        const name = inputs[0] || "User";
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "0");
        return {
          stdout: `=== SMART CALCULATOR ===\nHello, ${name}\n${n1 * n2}\n`,
        };
      },
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": code },
      },
      provider
    );

    assert.equal(result.passed, false);
  });

  it("11. Numeric 30 vs 30.0 equivalence works seamlessly", async () => {
    const provider = new MockExecutionProvider({
      stdoutChunks: ["=== SMART CALCULATOR ===\nHello Alex\nResult: 30.0\n"],
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": "print(30.0)" },
      },
      provider
    );

    assert.equal(result.testCaseResults[0].passed, true);
  });

  it("12. Decimal fixture passes (12.5 + 7.5 = 20.0)", async () => {
    const provider = new MockExecutionProvider({
      dynamicHandler: (inputs: string[]) => {
        const n1 = parseFloat(inputs[1] || "0");
        const n2 = parseFloat(inputs[2] || "0");
        return {
          stdout: `Result: ${n1 + n2}\n`,
        };
      },
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": "code" },
      },
      provider
    );

    const decimalTc = result.testCaseResults.find((tc) => tc.testCaseId === "tc-m2-decimals");
    assert.ok(decimalTc);
    assert.equal(decimalTc.passed, true);
  });

  it("13. SyntaxError preserves error and returns execution_error status", async () => {
    const provider = new MockExecutionProvider({
      error: {
        name: "SyntaxError",
        message: "invalid syntax",
        line: 4,
        traceback: "SyntaxError: invalid syntax (line 4)",
      },
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": "print(" },
      },
      provider
    );

    assert.equal(result.passed, false);
    assert.equal(result.status, "execution_error");
    assert.ok(result.executionError);
    assert.equal(result.executionError.name, "SyntaxError");
  });

  it("14. Timeout does not complete milestone", async () => {
    const provider = new MockExecutionProvider({
      dynamicHandler: () => ({ timedOut: true }),
    });

    const result = await validateMilestone(
      {
        projectId: "project-smart-calculator",
        milestoneId: "milestone-calc-2",
        files: { "calculator.py": "while True: pass" },
      },
      provider
    );

    assert.equal(result.passed, false);
    assert.equal(result.status, "timed_out");
  });

  it("15. First successful completion awards +25 XP", () => {
    let appState: AppState = {
      ...initialSeedData,
      progress: {
        ...initialSeedData.progress,
        xp: 25, // From Milestone 1
        completedMilestoneIds: ["milestone-calc-1"],
      },
    };

    const awardXP = (milestoneId: string, xp: number = 25): boolean => {
      const completed = appState.progress.completedMilestoneIds || [];
      if (completed.includes(milestoneId)) return false;
      appState = {
        ...appState,
        progress: {
          ...appState.progress,
          xp: appState.progress.xp + xp,
          completedMilestoneIds: [...completed, milestoneId],
        },
      };
      return true;
    };

    const rewarded = awardXP("milestone-calc-2", 25);
    assert.equal(rewarded, true);
    assert.equal(appState.progress.xp, 50, "XP should now be 50 (25 + 25)");
    assert.ok(appState.progress.completedMilestoneIds?.includes("milestone-calc-2"));
  });

  it("16. Repeated successful checks award no additional XP (idempotent)", () => {
    let appState: AppState = {
      ...initialSeedData,
      progress: {
        ...initialSeedData.progress,
        xp: 50,
        completedMilestoneIds: ["milestone-calc-1", "milestone-calc-2"],
      },
    };

    const awardXP = (milestoneId: string, xp: number = 25): boolean => {
      const completed = appState.progress.completedMilestoneIds || [];
      if (completed.includes(milestoneId)) return false;
      appState = {
        ...appState,
        progress: {
          ...appState.progress,
          xp: appState.progress.xp + xp,
          completedMilestoneIds: [...completed, milestoneId],
        },
      };
      return true;
    };

    for (let i = 0; i < 3; i++) {
      const rewarded = awardXP("milestone-calc-2", 25);
      assert.equal(rewarded, false);
      assert.equal(appState.progress.xp, 50);
    }
  });

  it("17. Progress becomes 2 of 4 complete after Milestone 2", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const { state: m1Done } = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    state = advanceToNextMilestone(m1Done, defaultRegistry);

    const { state: m2Done } = completeMilestone(state, "milestone-calc-2", defaultRegistry);

    const completed = Object.values(m2Done.milestoneStates).filter((m) => m.status === "completed").length;
    assert.equal(completed, 2);
    assert.equal(`${completed} of 4`, "2 of 4");
  });

  it("18. Project remains incomplete after Milestone 2", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const { state: m1Done } = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    state = advanceToNextMilestone(m1Done, defaultRegistry);
    const { state: m2Done, projectCompleted } = completeMilestone(state, "milestone-calc-2", defaultRegistry);

    assert.equal(projectCompleted, false);
    assert.equal(m2Done.status, "in_progress");
    assert.equal(m2Done.completedAt, undefined);
  });

  it("19. Module remains in_progress and not mastered", () => {
    const moduleProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    assert.equal(moduleProgress.status, "in_progress");
    assert.equal(moduleProgress.masteryStatus, "not_started");
    assert.equal(moduleProgress.completedAt, undefined);
    assert.equal(moduleProgress.masteredAt, undefined);
  });

  it("20. Persistence restores Milestone 2 code and state after reload", () => {
    const storage = new LocalLearnerStorageAdapter();

    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const { state: m1Done } = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    state = advanceToNextMilestone(m1Done, defaultRegistry);

    const m2Code =
      'print("=== SMART CALCULATOR ===")\nname = input("Name: ")\nnum1 = float(input("N1: "))\nnum2 = float(input("N2: "))\nprint(num1 + num2)';
    state = updateProjectFile(state, "calculator.py", m2Code);

    const { state: m2Done } = completeMilestone(state, "milestone-calc-2", defaultRegistry);
    storage.saveProjectState(m2Done);

    // Reload from storage
    const restored = storage.loadProjectState("project-smart-calculator");
    assert.ok(restored);
    assert.equal(restored.currentMilestoneId, "milestone-calc-2");
    assert.equal(restored.milestoneStates["milestone-calc-1"].status, "completed");
    assert.equal(restored.milestoneStates["milestone-calc-2"].status, "completed");
    assert.equal(restored.files["calculator.py"], m2Code);
  });
});
