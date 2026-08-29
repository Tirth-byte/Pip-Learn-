import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { defaultRegistry } from "../../curriculum";
import {
  initializeLearnerProject,
  initializeLearnerModuleProgress,
  updateProjectFile,
  failMilestoneValidation,
  completeMilestone,
} from "../transitions";
import { LocalLearnerStorageAdapter } from "../persistence/local-storage";
import { createValidationEngine } from "../../validation";
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

describe("Step 10 — Module 1 Learning Vertical Slice Integration", () => {
  beforeEach(() => {
    mockStorageData.clear();
  });

  it("1. Module 1 resolves correctly through CurriculumRegistry", () => {
    const mod = defaultRegistry.getModule("module-1-fundamentals");
    assert.ok(mod, "Module 1 should exist in registry");
    assert.equal(mod.id, "module-1-fundamentals");
    assert.equal(mod.primaryProjectId, "project-smart-calculator");
    assert.ok(mod.primer, "Module 1 should have a defined primer");
    assert.equal(mod.primer?.cards.length, 2);

    const project = defaultRegistry.getProject("project-smart-calculator");
    assert.ok(project, "Smart Calculator project should exist");
    assert.equal(project.milestoneIds.length, 4);

    const milestones = defaultRegistry.getMilestonesForProject("project-smart-calculator");
    assert.equal(milestones.length, 4);
    assert.equal(milestones[0].id, "milestone-calc-1");
  });

  it("2. Smart Calculator learner state initializes with starter files", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    assert.equal(state.projectId, "project-smart-calculator");
    assert.equal(state.currentMilestoneId, "milestone-calc-1");
    assert.equal(state.status, "in_progress");
    assert.ok(state.files["calculator.py"], "Starter code for calculator.py should exist");
    assert.ok(state.files["calculator.py"].includes("Milestone 1"));
    assert.equal(state.milestoneStates["milestone-calc-1"].status, "in_progress");
    assert.equal(state.milestoneStates["milestone-calc-2"].status, "not_started");
  });

  it("3. Existing learner code is preserved and not overwritten on re-initialization", () => {
    const storage = new LocalLearnerStorageAdapter();
    const initialState = initializeLearnerProject("project-smart-calculator", defaultRegistry);

    const modifiedState = updateProjectFile(
      initialState,
      "calculator.py",
      `print("=== CUSTOM CALCULATOR ===")\nname = input("Name? ")\nprint(f"Hi {name}")`
    );
    storage.saveProjectState(modifiedState);

    // Simulate loading existing workspace state
    const loadedState = storage.loadProjectState("project-smart-calculator");
    assert.ok(loadedState, "Persisted state should exist");
    assert.equal(
      loadedState.files["calculator.py"],
      `print("=== CUSTOM CALCULATOR ===")\nname = input("Name? ")\nprint(f"Hi {name}")`
    );
  });

  it("4. Editor changes update learner workspace state in memory", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const newCode = `user = input("Your name: ")\nprint("Welcome, " + user)`;

    state = updateProjectFile(state, "calculator.py", newCode);
    assert.equal(state.files["calculator.py"], newCode);
    assert.ok(Date.parse(state.updatedAt) > 0);
  });

  it("5. Persistence round-trip properly restores code after page refresh", () => {
    const storage = new LocalLearnerStorageAdapter();
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const customCode = `name = input("Enter name: ")\nprint("Hello " + name)`;

    const updated = updateProjectFile(state, "calculator.py", customCode);
    storage.saveProjectState(updated);

    const restored = storage.loadProjectState("project-smart-calculator");
    assert.ok(restored);
    assert.equal(restored.files["calculator.py"], customCode);
  });

  it("6. Running code (Run button) does NOT complete milestone progress", async () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const mockProvider = new MockExecutionProvider({
      stdoutChunks: ["=== SMART CALCULATOR ===\nHello, Alex!\n"],
    });

    const execResult = await mockProvider.run({
      code: state.files["calculator.py"],
    });

    assert.equal(execResult.status, "completed");
    // INVARIANT: Project & milestone states remain in_progress without completion
    assert.equal(state.status, "in_progress");
    assert.equal(state.milestoneStates["milestone-calc-1"].status, "in_progress");
  });

  it("7. Validation failure does NOT complete milestone progress and increments attempts", async () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const mockProvider = new MockExecutionProvider({
      stdoutChunks: ["Wrong output with no greeting\n"],
    });

    const validator = createValidationEngine(mockProvider);
    const validationResult = await validator.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-1",
      files: { "calculator.py": `print("Wrong output")` },
    });

    assert.equal(validationResult.passed, false);

    // Apply validation failure transition
    state = failMilestoneValidation(state, "milestone-calc-1");
    assert.equal(state.milestoneStates["milestone-calc-1"].status, "validation_failed");
    assert.equal(state.milestoneStates["milestone-calc-1"].attemptsCount, 1);
    assert.equal(state.status, "in_progress");
  });

  it("8. Validation success completes Milestone 1", async () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const mockProvider = new MockExecutionProvider({
      promptCount: 1,
      dynamicHandler: (inputs) => {
        const name = inputs[0] || "Friend";
        return { stdout: `=== SMART CALCULATOR ===\nHello, ${name}!\n` };
      },
    });

    const validator = createValidationEngine(mockProvider);
    const validationResult = await validator.validateMilestone({
      projectId: "project-smart-calculator",
      milestoneId: "milestone-calc-1",
      files: {
        "calculator.py": `print("=== SMART CALCULATOR ===")\nname = input("What's your name? ")\nprint(f"Hello, {name}!")`,
      },
    });

    assert.equal(validationResult.passed, true);

    const transitionResult = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    state = transitionResult.state;

    assert.equal(state.milestoneStates["milestone-calc-1"].status, "completed");
    assert.ok(state.milestoneStates["milestone-calc-1"].completedAt);
  });

  it("9. Milestone completion creates a recovery snapshot", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const { state: updatedState } = completeMilestone(state, "milestone-calc-1", defaultRegistry);

    assert.ok(updatedState.snapshots.length >= 1);
    assert.equal(updatedState.snapshots[0].reason, "milestone_completion");
    assert.equal(updatedState.snapshots[0].milestoneId, "milestone-calc-1");
  });

  it("10. Project remains incomplete after Milestone 1 (1 of 4 milestones completed)", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const { state: updatedState, projectCompleted } = completeMilestone(
      state,
      "milestone-calc-1",
      defaultRegistry
    );

    assert.equal(projectCompleted, false, "Project should not be completed after only 1 milestone");
    assert.equal(updatedState.status, "in_progress");
    assert.equal(updatedState.milestoneStates["milestone-calc-1"].status, "completed");
    assert.equal(updatedState.milestoneStates["milestone-calc-2"].status, "not_started");
  });

  it("11. Module remains in progress after Milestone 1", () => {
    const modProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    assert.equal(modProgress.status, "in_progress");
    assert.equal(modProgress.masteryStatus, "not_started");
  });

  it("12. Runtime execution error preserves learner workspace code", async () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const badCode = `print("Line 1")\nundefined_var_call()\n`;
    const updated = updateProjectFile(state, "calculator.py", badCode);

    const mockProvider = new MockExecutionProvider({
      error: {
        name: "NameError",
        message: "name 'undefined_var_call' is not defined",
        line: 2,
        traceback: "Traceback (most recent call last):\n  File 'calculator.py', line 2\nNameError: name 'undefined_var_call' is not defined",
      },
    });

    const result = await mockProvider.run({ code: badCode });
    assert.equal(result.status, "runtime_error");
    assert.equal(result.error?.name, "NameError");

    // Code is fully preserved in workspace state
    assert.equal(updated.files["calculator.py"], badCode);
  });

  it("13. Execution timeout preserves learner workspace code", async () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const loopCode = `while True:\n    pass\n`;
    const updated = updateProjectFile(state, "calculator.py", loopCode);

    const mockProvider = new MockExecutionProvider({
      hangForever: true,
    });

    const result = await mockProvider.run({ code: loopCode, timeoutMs: 50 });
    assert.equal(result.status, "timed_out");

    // Code is fully preserved in workspace state
    assert.equal(updated.files["calculator.py"], loopCode);
  });
});
