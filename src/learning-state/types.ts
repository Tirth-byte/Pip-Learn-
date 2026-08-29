/**
 * PipLearn Mutable Learner State Types
 * 
 * Defines the state model representing a learner's progression, active project code,
 * milestone transitions, and mastery verification.
 * 
 * Note: Strictly decoupled from immutable curriculum manifests in src/curriculum/.
 */

export type ModuleProgressStatus =
  | "not_started"
  | "in_progress"
  | "project_completed"
  | "mastered";

export type MasteryChallengeStatus =
  | "not_started"
  | "in_progress"
  | "passed"
  | "needs_retry";

export type ProjectProgressStatus =
  | "not_started"
  | "in_progress"
  | "completed";

export type MilestoneProgressStatus =
  | "not_started"
  | "in_progress"
  | "validation_failed"
  | "completed";

export type SnapshotReason =
  | "milestone_completion"
  | "manual_checkpoint"
  | "pre_reset"
  | "pre_restart";

/**
 * Learner-owned project files in the workspace (filename -> code string).
 * Supports single-file and multi-file projects.
 */
export type LearnerWorkspaceFiles = Record<string, string>;

/**
 * Historical snapshot of learner workspace files for safe rollback and recovery.
 */
export interface WorkspaceSnapshot {
  id: string;
  timestamp: string;
  reason: SnapshotReason;
  milestoneId?: string;
  files: LearnerWorkspaceFiles;
}

/**
 * State for a single milestone inside a learner's active project.
 */
export interface LearnerMilestoneState {
  milestoneId: string;
  status: MilestoneProgressStatus;
  attemptsCount: number;
  lastValidatedAt?: string;
  completedAt?: string;
}

/**
 * Complete state for a project being built by a learner.
 */
export interface LearnerProjectState {
  projectId: string;
  curriculumVersion: string; // Tracks the curriculum version this project was started with
  status: ProjectProgressStatus;
  currentMilestoneId: string;
  milestoneStates: Record<string, LearnerMilestoneState>;
  files: LearnerWorkspaceFiles;
  snapshots: WorkspaceSnapshot[];
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}

/**
 * Learner progress through a curriculum Module (Unit).
 * Note: 'project_completed' (building the tool) is strictly distinct from 'mastered' (concept transfer).
 */
export interface LearnerModuleProgress {
  moduleId: string;
  curriculumVersion: string;
  status: ModuleProgressStatus;
  primaryProjectId: string;
  masteryStatus?: MasteryChallengeStatus;
  startedAt: string;
  completedAt?: string; // Set when primary project reaches 'completed'
  masteredAt?: string;  // Set when mastery challenge reaches 'passed'
}

/**
 * Learner progress across an entire learning path (e.g. Python Masterclass).
 */
export interface LearnerLearningPathProgress {
  learningPathId: string;
  curriculumVersion: string;
  activeModuleId: string;
  moduleProgress: Record<string, LearnerModuleProgress>;
  startedAt: string;
  updatedAt: string;
}
