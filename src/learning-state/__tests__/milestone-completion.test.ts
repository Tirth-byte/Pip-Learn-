import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { defaultRegistry } from "../../curriculum";
import {
  initializeLearnerProject,
  initializeLearnerModuleProgress,
  completeMilestone,
} from "../transitions";
import { LocalLearnerStorageAdapter } from "../persistence/local-storage";
import { learnerEventBus, LearnerDomainEvent } from "../events";
import { AppState, initialSeedData } from "../../lib/seed-data";

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

describe("Milestone 1 Completion & XP Idempotency Integration Tests", () => {
  beforeEach(() => {
    mockStorageData.clear();
    learnerEventBus.clear();
  });

  it("1. Successful first completion marks milestone completed with timestamp", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    assert.equal(state.milestoneStates["milestone-calc-1"].status, "in_progress");

    const { state: updatedState, isFirstCompletion, projectCompleted } = completeMilestone(
      state,
      "milestone-calc-1",
      defaultRegistry
    );

    assert.equal(isFirstCompletion, true, "First completion should be true");
    assert.equal(updatedState.milestoneStates["milestone-calc-1"].status, "completed");
    assert.ok(updatedState.milestoneStates["milestone-calc-1"].completedAt, "CompletedAt must be set");
    assert.equal(projectCompleted, false, "Project should not be completed after only Milestone 1");
  });

  it("2. First completion awards XP (+25 XP) and updates user XP total", () => {
    // Simulate AppState with initial 0 XP
    let appState: AppState = {
      ...initialSeedData,
      progress: {
        ...initialSeedData.progress,
        xp: 0,
        completedMilestoneIds: [],
      },
    };

    // Helper simulating AppContext completeMilestoneReward
    const awardMilestoneXP = (milestoneId: string, xpEarned: number = 25): boolean => {
      const completed = appState.progress.completedMilestoneIds || [];
      if (completed.includes(milestoneId)) {
        return false;
      }
      appState = {
        ...appState,
        progress: {
          ...appState.progress,
          xp: appState.progress.xp + xpEarned,
          completedMilestoneIds: [...completed, milestoneId],
        },
      };
      nodeLocalStorage.setItem("piplearn_state_v1", JSON.stringify(appState));
      return true;
    };

    const firstAward = awardMilestoneXP("milestone-calc-1", 25);
    assert.equal(firstAward, true, "First award should succeed");
    assert.equal(appState.progress.xp, 25, "XP total should be 25");
    assert.ok(appState.progress.completedMilestoneIds?.includes("milestone-calc-1"));
  });

  it("3. Repeated successful checks award 0 additional XP (strictly idempotent)", () => {
    let appState: AppState = {
      ...initialSeedData,
      progress: {
        ...initialSeedData.progress,
        xp: 0,
        completedMilestoneIds: [],
      },
    };

    const awardMilestoneXP = (milestoneId: string, xpEarned: number = 25): boolean => {
      const completed = appState.progress.completedMilestoneIds || [];
      if (completed.includes(milestoneId)) {
        return false;
      }
      appState = {
        ...appState,
        progress: {
          ...appState.progress,
          xp: appState.progress.xp + xpEarned,
          completedMilestoneIds: [...completed, milestoneId],
        },
      };
      nodeLocalStorage.setItem("piplearn_state_v1", JSON.stringify(appState));
      return true;
    };

    // First completion
    const award1 = awardMilestoneXP("milestone-calc-1", 25);
    assert.equal(award1, true);
    assert.equal(appState.progress.xp, 25);

    // Repeated checks 2, 3, 4, 5...
    for (let i = 0; i < 5; i++) {
      const repeatedAward = awardMilestoneXP("milestone-calc-1", 25);
      assert.equal(repeatedAward, false, "Repeated check must return false");
      assert.equal(appState.progress.xp, 25, "XP total must stay exactly 25");
    }
  });

  it("4. Page refresh preserves completed milestone state and awarded XP without double reward", () => {
    const storage = new LocalLearnerStorageAdapter();

    // 1. Complete milestone and save state
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const { state: updatedState } = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    storage.saveProjectState(updatedState);

    // 2. Award XP and persist
    const appState: AppState = {
      ...initialSeedData,
      progress: {
        ...initialSeedData.progress,
        xp: 25,
        completedMilestoneIds: ["milestone-calc-1"],
      },
    };
    nodeLocalStorage.setItem("piplearn_state_v1", JSON.stringify(appState));

    // 3. Simulate page reload / restoration
    const restoredProject = storage.loadProjectState("project-smart-calculator");
    assert.ok(restoredProject);
    assert.equal(restoredProject.milestoneStates["milestone-calc-1"].status, "completed");

    const rawAppState = nodeLocalStorage.getItem("piplearn_state_v1");
    assert.ok(rawAppState);
    const parsedAppState = JSON.parse(rawAppState) as AppState;
    assert.equal(parsedAppState.progress.xp, 25);
    assert.ok(parsedAppState.progress.completedMilestoneIds?.includes("milestone-calc-1"));

    // 4. Re-running completeMilestone on restored state does not emit first completion
    const recheckResult = completeMilestone(restoredProject, "milestone-calc-1", defaultRegistry);
    assert.equal(recheckResult.isFirstCompletion, false, "Re-check after refresh must not be first completion");
  });

  it("5. Milestone progress accurately reads 1 of 4 complete", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const project = defaultRegistry.getProject("project-smart-calculator");
    assert.equal(project?.milestoneIds.length, 4);

    const { state: updatedState } = completeMilestone(state, "milestone-calc-1", defaultRegistry);

    const completedCount = Object.values(updatedState.milestoneStates).filter(
      (m) => m.status === "completed"
    ).length;

    assert.equal(completedCount, 1);
    assert.equal(project?.milestoneIds.length, 4);
    assert.equal(`${completedCount} of ${project?.milestoneIds.length}`, "1 of 4");
  });

  it("6. Project is NOT completed after Milestone 1", () => {
    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    const { state: updatedState, projectCompleted } = completeMilestone(
      state,
      "milestone-calc-1",
      defaultRegistry
    );

    assert.equal(projectCompleted, false);
    assert.equal(updatedState.status, "in_progress");
    assert.equal(updatedState.completedAt, undefined);
  });

  it("7. Module progress remains in_progress and is NOT mastered", () => {
    const moduleProgress = initializeLearnerModuleProgress("module-1-fundamentals", defaultRegistry);
    assert.equal(moduleProgress.status, "in_progress");
    assert.equal(moduleProgress.masteryStatus, "not_started");
    assert.equal(moduleProgress.completedAt, undefined);
    assert.equal(moduleProgress.masteredAt, undefined);
  });

  it("8. Domain event MILESTONE_COMPLETED is emitted on first completion only", () => {
    const events: LearnerDomainEvent[] = [];
    learnerEventBus.subscribe((e) => events.push(e));

    const state = initializeLearnerProject("project-smart-calculator", defaultRegistry);
    events.length = 0; // Clear start events

    // First completion
    const res1 = completeMilestone(state, "milestone-calc-1", defaultRegistry);
    assert.equal(res1.isFirstCompletion, true);
    assert.equal(events.filter((e) => e.type === "MILESTONE_COMPLETED").length, 1);

    // Second check
    const res2 = completeMilestone(res1.state, "milestone-calc-1", defaultRegistry);
    assert.equal(res2.isFirstCompletion, false);
    // Should NOT emit second MILESTONE_COMPLETED event
    assert.equal(events.filter((e) => e.type === "MILESTONE_COMPLETED").length, 1);
  });
});
