import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  initializeLearnerProject,
  initializeLearnerModuleProgress,
  updateProjectFile,
  failMilestoneValidation,
  completeMilestone,
  advanceToNextMilestone,
  syncModuleOnProjectComplete,
  startMasteryChallenge,
  passMasteryChallenge,
  resetMilestoneToStarter,
  restartProject,
  LocalLearnerStorageAdapter,
  MemoryStorageAdapter,
} from "../index";
import { defaultRegistry } from "../../curriculum";

describe("Learner State & Milestone Progression", () => {
  it("1. Starting Module 1 / Smart Calculator initializes correctly from registry", () => {
    const projectState = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    assert.ok(projectState);
    assert.equal(projectState.projectId, "project-smart-calculator");
    assert.equal(projectState.status, "in_progress");
    assert.equal(projectState.curriculumVersion, "1.0.0");
    assert.equal(projectState.currentMilestoneId, "milestone-calc-1");

    const moduleProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    assert.ok(moduleProgress);
    assert.equal(moduleProgress.moduleId, "module-1-fundamentals");
    assert.equal(moduleProgress.status, "in_progress");
    assert.equal(moduleProgress.primaryProjectId, "project-smart-calculator");
    assert.equal(moduleProgress.curriculumVersion, "1.0.0");
    assert.equal(moduleProgress.masteryStatus, "not_started");
  });

  it("2. First milestone becomes active (in_progress) and other milestones are not_started", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    assert.equal(state.milestoneStates["milestone-calc-1"].status, "in_progress");
    assert.equal(state.milestoneStates["milestone-calc-2"].status, "not_started");
    assert.equal(state.milestoneStates["milestone-calc-3"].status, "not_started");
    assert.equal(state.milestoneStates["milestone-calc-4"].status, "not_started");
  });

  it("3. Starter files are copied into learner-owned workspace state", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    assert.ok(state.files["calculator.py"], "calculator.py starter file should be present");
    assert.ok(state.files["calculator.py"].includes("Milestone 1: Welcome & User Input"));
  });

  it("4. Learner code persists when moving to another milestone", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);

    // Learner writes Milestone 1 code
    const customCode = 'print("=== Smart Calculator ===")\nname = input("Name: ")\nprint(f"Hello {name}")\n';
    state = updateProjectFile(state, "calculator.py", customCode);
    assert.equal(state.files["calculator.py"], customCode);

    // Complete Milestone 1 and advance to Milestone 2
    const completeRes = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    state = advanceToNextMilestone(completeRes.state, defaultRegistry);

    assert.equal(state.currentMilestoneId, "milestone-calc-2");
    assert.equal(state.milestoneStates["milestone-calc-2"].status, "in_progress");
    // Crucial: Code from Milestone 1 carried forward!
    assert.equal(state.files["calculator.py"], customCode);
  });

  it("5. Invalid milestone transitions are rejected", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);

    // Milestone 1 is still in_progress, cannot advance to next milestone
    assert.throws(
      () => advanceToNextMilestone(state, defaultRegistry),
      /must be completed before advancing/
    );

    // Trying to complete a non-existent milestone
    assert.throws(
      () => completeMilestone(state, "non-existent-milestone", defaultRegistry),
      /does not exist/
    );
  });

  it("6. Completing intermediate milestones does not complete the project", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);

    // Complete Milestone 1
    const res1 = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    assert.equal(res1.projectCompleted, false);
    assert.equal(res1.state.status, "in_progress");

    // Advance to M2 and complete M2
    state = advanceToNextMilestone(res1.state, defaultRegistry);
    const res2 = completeMilestone(state, "milestone-calc-2", defaultRegistry);
    assert.equal(res2.projectCompleted, false);
    assert.equal(res2.state.status, "in_progress");

    // Advance to M3 and complete M3
    state = advanceToNextMilestone(res2.state, defaultRegistry);
    const res3 = completeMilestone(state, "milestone-calc-3", defaultRegistry);
    assert.equal(res3.projectCompleted, false);
    assert.equal(res3.state.status, "in_progress");
  });

  it("7. Completing all required milestones completes the project", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);

    // M1
    let res = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    state = advanceToNextMilestone(res.state, defaultRegistry);

    // M2
    res = completeMilestone(state, "milestone-calc-2", defaultRegistry);
    state = advanceToNextMilestone(res.state, defaultRegistry);

    // M3
    res = completeMilestone(state, "milestone-calc-3", defaultRegistry);
    state = advanceToNextMilestone(res.state, defaultRegistry);

    // M4 (Final Milestone)
    res = completeMilestone(state, "milestone-calc-4", defaultRegistry);
    assert.equal(res.projectCompleted, true);
    assert.equal(res.state.status, "completed");
    assert.ok(res.state.completedAt);
  });

  it("8. Project completion marks module project_completed", () => {
    let moduleProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    assert.equal(moduleProgress.status, "in_progress");

    // When primary project completes
    moduleProgress = syncModuleOnProjectComplete(moduleProgress);
    assert.equal(moduleProgress.status, "project_completed");
    assert.ok(moduleProgress.completedAt);
  });

  it("9. Project completion does NOT mark module mastered", () => {
    let moduleProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    moduleProgress = syncModuleOnProjectComplete(moduleProgress);

    // Project completed, but NOT mastered
    assert.equal(moduleProgress.status, "project_completed");
    assert.notEqual(moduleProgress.status, "mastered");
    assert.equal(moduleProgress.masteryStatus, "not_started");
    assert.equal(moduleProgress.masteredAt, undefined);
  });

  it("10. Passing mastery changes module to mastered", () => {
    let moduleProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    moduleProgress = syncModuleOnProjectComplete(moduleProgress);

    // Start mastery challenge
    moduleProgress = startMasteryChallenge(moduleProgress);
    assert.equal(moduleProgress.masteryStatus, "in_progress");

    // Pass mastery challenge
    moduleProgress = passMasteryChallenge(moduleProgress);
    assert.equal(moduleProgress.status, "mastered");
    assert.equal(moduleProgress.masteryStatus, "passed");
    assert.ok(moduleProgress.masteredAt);
  });

  it("11. Local persistence round-trip works", () => {
    const memoryBackend = new MemoryStorageAdapter();
    const storage = new LocalLearnerStorageAdapter(memoryBackend);

    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    state = updateProjectFile(state, "calculator.py", "# User custom solution line 1");
    storage.saveProjectState(state);

    const loaded = storage.loadProjectState("project-smart-calculator");
    assert.ok(loaded);
    assert.equal(loaded?.projectId, "project-smart-calculator");
    assert.equal(loaded?.files["calculator.py"], "# User custom solution line 1");
    assert.equal(loaded?.curriculumVersion, "1.0.0");

    let moduleProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    moduleProgress = syncModuleOnProjectComplete(moduleProgress);
    storage.saveModuleProgress(moduleProgress);

    const loadedMod = storage.loadModuleProgress("module-1-fundamentals");
    assert.ok(loadedMod);
    assert.equal(loadedMod?.status, "project_completed");
  });

  it("12. Malformed persisted state fails/recovers safely", () => {
    const memoryBackend = new MemoryStorageAdapter();
    const storage = new LocalLearnerStorageAdapter(memoryBackend);

    // Inject corrupted JSON
    memoryBackend.setItem("piplearn_local_project_corrupted-proj", "invalid json {{{");
    const result = storage.loadProjectState("corrupted-proj");
    assert.equal(result, null);

    // Inject mismatched schema version
    const staleEnvelope = JSON.stringify({
      schemaVersion: 999, // Unknown future/stale version
      savedAt: new Date().toISOString(),
      payload: { projectId: "stale-proj" },
    });
    memoryBackend.setItem("piplearn_local_project_stale-proj", staleEnvelope);
    const staleResult = storage.loadProjectState("stale-proj");
    assert.equal(staleResult, null);
  });

  it("13. Curriculum version is retained in learner state", () => {
    const projectState = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    assert.equal(projectState.curriculumVersion, "1.0.0");

    const moduleProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    assert.equal(moduleProgress.curriculumVersion, "1.0.0");
  });

  it("14. Milestone reset and project restart preserve recovery snapshots", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    state = updateProjectFile(state, "calculator.py", "experimental_broken_code = 123");

    // Reset milestone
    state = resetMilestoneToStarter(state, "milestone-calc-1", defaultRegistry);
    assert.equal(state.snapshots.length, 1);
    assert.equal(state.snapshots[0].reason, "pre_reset");
    assert.equal(state.snapshots[0].files["calculator.py"], "experimental_broken_code = 123");
    // Restored starter code
    assert.ok(state.files["calculator.py"].includes("Milestone 1: Welcome & User Input"));

    // Restart project
    const restarted = restartProject(state, defaultRegistry);
    assert.equal(restarted.snapshots.length, 1);
    assert.equal(restarted.snapshots[0].reason, "pre_restart");
  });

  it("15. Validation failures increment attempts count and update status", () => {
    let state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    assert.equal(state.milestoneStates["milestone-calc-1"].attemptsCount, 0);

    state = failMilestoneValidation(state, "milestone-calc-1");
    assert.equal(state.milestoneStates["milestone-calc-1"].status, "validation_failed");
    assert.equal(state.milestoneStates["milestone-calc-1"].attemptsCount, 1);
    assert.ok(state.milestoneStates["milestone-calc-1"].lastValidatedAt);

    state = failMilestoneValidation(state, "milestone-calc-1");
    assert.equal(state.milestoneStates["milestone-calc-1"].attemptsCount, 2);
  });
});
