import {
  LearnerProjectState,
  LearnerModuleProgress,
  LearnerMilestoneState,
} from "./types";
import { createSnapshot, withSnapshot } from "./snapshots";
import { learnerEventBus } from "./events";
import {
  defaultRegistry,
  CurriculumRegistry,
} from "../curriculum";

/**
 * Initializes a fresh project state for a learner from the curriculum registry.
 */
export function initializeLearnerProject(
  projectId: string,
  registry: CurriculumRegistry = defaultRegistry
): LearnerProjectState {
  const project = registry.getProject(projectId);
  if (!project) {
    throw new Error(`Cannot initialize project: Project "${projectId}" not found in registry.`);
  }

  const milestones = registry.getMilestonesForProject(projectId);
  if (milestones.length === 0) {
    throw new Error(`Cannot initialize project: No milestones found for project "${projectId}".`);
  }

  const now = new Date().toISOString();
  const firstMilestone = milestones[0];

  // Initialize milestone states
  const milestoneStates: Record<string, LearnerMilestoneState> = {};
  for (let i = 0; i < milestones.length; i++) {
    const m = milestones[i];
    milestoneStates[m.id] = {
      milestoneId: m.id,
      status: i === 0 ? "in_progress" : "not_started",
      attemptsCount: 0,
    };
  }

  // Copy initial starter files from first milestone (or project defaults)
  const initialFiles: Record<string, string> = {};
  if (firstMilestone.starterFiles) {
    for (const [filename, content] of Object.entries(firstMilestone.starterFiles)) {
      initialFiles[filename] = content;
    }
  }

  const state: LearnerProjectState = {
    projectId: project.id,
    curriculumVersion: project.version,
    status: "in_progress",
    currentMilestoneId: firstMilestone.id,
    milestoneStates,
    files: initialFiles,
    snapshots: [],
    startedAt: now,
    updatedAt: now,
  };

  learnerEventBus.emit({
    type: "PROJECT_STARTED",
    projectId: project.id,
    curriculumVersion: project.version,
    timestamp: now,
  });

  learnerEventBus.emit({
    type: "MILESTONE_STARTED",
    projectId: project.id,
    milestoneId: firstMilestone.id,
    timestamp: now,
  });

  return state;
}

/**
 * Initializes a fresh module progress record for a learner.
 */
export function initializeLearnerModuleProgress(
  moduleId: string,
  registry: CurriculumRegistry = defaultRegistry
): LearnerModuleProgress {
  const mod = registry.getModule(moduleId);
  if (!mod) {
    throw new Error(`Cannot initialize module progress: Module "${moduleId}" not found in registry.`);
  }

  const now = new Date().toISOString();

  return {
    moduleId: mod.id,
    curriculumVersion: mod.version,
    status: "in_progress",
    primaryProjectId: mod.primaryProjectId,
    masteryStatus: "not_started",
    startedAt: now,
  };
}

/**
 * Updates code for a specific file in the learner's workspace.
 */
export function updateProjectFile(
  state: LearnerProjectState,
  filename: string,
  content: string
): LearnerProjectState {
  const now = new Date().toISOString();
  return {
    ...state,
    files: {
      ...state.files,
      [filename]: content,
    },
    updatedAt: now,
  };
}

/**
 * Records a failed milestone validation attempt.
 */
export function failMilestoneValidation(
  state: LearnerProjectState,
  milestoneId: string
): LearnerProjectState {
  const mState = state.milestoneStates[milestoneId];
  if (!mState) {
    throw new Error(`Milestone "${milestoneId}" does not exist in project "${state.projectId}".`);
  }

  const now = new Date().toISOString();
  const updatedAttempts = mState.attemptsCount + 1;

  const updatedMilestoneStates: Record<string, LearnerMilestoneState> = {
    ...state.milestoneStates,
    [milestoneId]: {
      ...mState,
      status: "validation_failed",
      attemptsCount: updatedAttempts,
      lastValidatedAt: now,
    },
  };

  learnerEventBus.emit({
    type: "MILESTONE_VALIDATION_FAILED",
    projectId: state.projectId,
    milestoneId,
    attemptsCount: updatedAttempts,
    timestamp: now,
  });

  return {
    ...state,
    milestoneStates: updatedMilestoneStates,
    updatedAt: now,
  };
}

/**
 * Completes a milestone and checks if the entire project is completed.
 */
export function completeMilestone(
  state: LearnerProjectState,
  milestoneId: string,
  registry: CurriculumRegistry = defaultRegistry
): { state: LearnerProjectState; projectCompleted: boolean; isFirstCompletion: boolean } {
  const mState = state.milestoneStates[milestoneId];
  if (!mState) {
    throw new Error(`Milestone "${milestoneId}" does not exist in project "${state.projectId}".`);
  }

  const isFirstCompletion = mState.status !== "completed";
  const now = new Date().toISOString();
  const completedAt = mState.completedAt || now;

  // Create recovery snapshot upon milestone completion
  const snapshot = createSnapshot(state, "milestone_completion", milestoneId);

  const updatedMilestoneStates: Record<string, LearnerMilestoneState> = {
    ...state.milestoneStates,
    [milestoneId]: {
      ...mState,
      status: "completed",
      completedAt: completedAt,
      lastValidatedAt: now,
    },
  };

  if (isFirstCompletion) {
    learnerEventBus.emit({
      type: "MILESTONE_COMPLETED",
      projectId: state.projectId,
      milestoneId,
      timestamp: now,
    });
  }

  // Check if ALL milestones for this project in curriculum are completed
  const projectMilestones = registry.getMilestonesForProject(state.projectId);
  const allCompleted = projectMilestones.length > 0 && projectMilestones.every(
    (m) => updatedMilestoneStates[m.id]?.status === "completed"
  );

  let updatedProjectState: LearnerProjectState = {
    ...state,
    milestoneStates: updatedMilestoneStates,
    updatedAt: now,
  };

  updatedProjectState = withSnapshot(updatedProjectState, snapshot);

  if (allCompleted) {
    updatedProjectState.status = "completed";
    updatedProjectState.completedAt = state.completedAt || now;

    if (!state.completedAt) {
      learnerEventBus.emit({
        type: "PROJECT_COMPLETED",
        projectId: state.projectId,
        timestamp: now,
      });
    }
  }

  return {
    state: updatedProjectState,
    projectCompleted: allCompleted,
    isFirstCompletion,
  };
}

/**
 * Advances the learner to the next sequential milestone in the project.
 */
export function advanceToNextMilestone(
  state: LearnerProjectState,
  registry: CurriculumRegistry = defaultRegistry
): LearnerProjectState {
  const projectMilestones = registry.getMilestonesForProject(state.projectId);
  const currentIndex = projectMilestones.findIndex((m) => m.id === state.currentMilestoneId);

  if (currentIndex === -1) {
    throw new Error(`Current milestone "${state.currentMilestoneId}" not found in project.`);
  }

  const currentMilestoneState = state.milestoneStates[state.currentMilestoneId];
  if (currentMilestoneState?.status !== "completed") {
    throw new Error(
      `Cannot advance: Milestone "${state.currentMilestoneId}" must be completed before advancing.`
    );
  }

  if (currentIndex + 1 >= projectMilestones.length) {
    // Already on the final milestone
    return state;
  }

  const nextMilestone = projectMilestones[currentIndex + 1];
  const now = new Date().toISOString();

  // Merge any new starter files from next milestone without overwriting existing files
  const updatedFiles = { ...state.files };
  if (nextMilestone.starterFiles) {
    for (const [filename, content] of Object.entries(nextMilestone.starterFiles)) {
      if (updatedFiles[filename] === undefined) {
        updatedFiles[filename] = content;
      }
    }
  }

  const updatedMilestoneStates: Record<string, LearnerMilestoneState> = {
    ...state.milestoneStates,
    [nextMilestone.id]: {
      ...state.milestoneStates[nextMilestone.id],
      milestoneId: nextMilestone.id,
      status: "in_progress",
      attemptsCount: state.milestoneStates[nextMilestone.id]?.attemptsCount || 0,
    },
  };

  learnerEventBus.emit({
    type: "MILESTONE_STARTED",
    projectId: state.projectId,
    milestoneId: nextMilestone.id,
    timestamp: now,
  });

  return {
    ...state,
    currentMilestoneId: nextMilestone.id,
    milestoneStates: updatedMilestoneStates,
    files: updatedFiles,
    updatedAt: now,
  };
}

/**
 * Transitions module progress when its primary project completes.
 * Note: Module status becomes 'project_completed', NOT 'mastered'.
 */
export function syncModuleOnProjectComplete(
  moduleProgress: LearnerModuleProgress
): LearnerModuleProgress {
  const now = new Date().toISOString();
  return {
    ...moduleProgress,
    status: "project_completed",
    completedAt: now,
  };
}

/**
 * Begins the transfer mastery challenge for a module.
 */
export function startMasteryChallenge(
  moduleProgress: LearnerModuleProgress
): LearnerModuleProgress {
  if (moduleProgress.status === "not_started") {
    throw new Error(`Cannot start mastery challenge: Module "${moduleProgress.moduleId}" is not started.`);
  }

  const now = new Date().toISOString();
  learnerEventBus.emit({
    type: "MASTERY_CHALLENGE_STARTED",
    moduleId: moduleProgress.moduleId,
    timestamp: now,
  });

  return {
    ...moduleProgress,
    masteryStatus: "in_progress",
  };
}

/**
 * Marks module mastery as achieved after independently passing the transfer challenge.
 */
export function passMasteryChallenge(
  moduleProgress: LearnerModuleProgress
): LearnerModuleProgress {
  const now = new Date().toISOString();

  learnerEventBus.emit({
    type: "MODULE_MASTERED",
    moduleId: moduleProgress.moduleId,
    timestamp: now,
  });

  return {
    ...moduleProgress,
    status: "mastered",
    masteryStatus: "passed",
    masteredAt: now,
  };
}

/**
 * Resets a single milestone to its starter code while preserving previous work in a snapshot.
 */
export function resetMilestoneToStarter(
  state: LearnerProjectState,
  milestoneId: string,
  registry: CurriculumRegistry = defaultRegistry
): LearnerProjectState {
  const milestone = registry.getMilestone(milestoneId);
  if (!milestone) {
    throw new Error(`Milestone "${milestoneId}" not found in registry.`);
  }

  // 1. Create pre-reset recovery snapshot
  const snapshot = createSnapshot(state, "pre_reset", milestoneId);

  // 2. Restore starter files for this milestone
  const updatedFiles = { ...state.files };
  if (milestone.starterFiles) {
    for (const [filename, content] of Object.entries(milestone.starterFiles)) {
      updatedFiles[filename] = content;
    }
  }

  const now = new Date().toISOString();
  const updatedMilestoneStates: Record<string, LearnerMilestoneState> = {
    ...state.milestoneStates,
    [milestoneId]: {
      ...state.milestoneStates[milestoneId],
      status: "in_progress",
    },
  };

  const updatedState: LearnerProjectState = {
    ...state,
    files: updatedFiles,
    milestoneStates: updatedMilestoneStates,
    updatedAt: now,
  };

  return withSnapshot(updatedState, snapshot);
}

/**
 * Safely restarts an entire project from Milestone 1, saving a pre-restart checkpoint.
 */
export function restartProject(
  state: LearnerProjectState,
  registry: CurriculumRegistry = defaultRegistry
): LearnerProjectState {
  const snapshot = createSnapshot(state, "pre_restart");
  const fresh = initializeLearnerProject(state.projectId, registry);
  return withSnapshot(fresh, snapshot);
}
