import {
  LearnerProjectState,
  WorkspaceSnapshot,
  SnapshotReason,
} from "./types";

const MAX_SNAPSHOTS_RETAINED = 10;

/**
 * Creates an immutable snapshot of current workspace files.
 */
export function createSnapshot(
  state: LearnerProjectState,
  reason: SnapshotReason,
  milestoneId?: string
): WorkspaceSnapshot {
  return {
    id: `snap_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    reason,
    milestoneId: milestoneId || state.currentMilestoneId,
    files: { ...state.files },
  };
}

/**
 * Appends a snapshot to project state, capping total snapshots to prevent memory bloat.
 */
export function withSnapshot(
  state: LearnerProjectState,
  snapshot: WorkspaceSnapshot,
  maxSnapshots = MAX_SNAPSHOTS_RETAINED
): LearnerProjectState {
  const existing = state.snapshots || [];
  const updated = [...existing, snapshot];
  if (updated.length > maxSnapshots) {
    updated.splice(0, updated.length - maxSnapshots);
  }
  return {
    ...state,
    snapshots: updated,
  };
}
