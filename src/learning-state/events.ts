/**
 * Domain events emitted during learner state transitions.
 * These events allow future gamification (XP, streaks) and telemetry listeners
 * to react asynchronously without polluting core academic progress logic.
 */

export type LearnerDomainEvent =
  | {
      type: "PROJECT_STARTED";
      projectId: string;
      curriculumVersion: string;
      timestamp: string;
    }
  | {
      type: "MILESTONE_STARTED";
      projectId: string;
      milestoneId: string;
      timestamp: string;
    }
  | {
      type: "MILESTONE_VALIDATION_FAILED";
      projectId: string;
      milestoneId: string;
      attemptsCount: number;
      timestamp: string;
    }
  | {
      type: "MILESTONE_COMPLETED";
      projectId: string;
      milestoneId: string;
      timestamp: string;
    }
  | {
      type: "PROJECT_COMPLETED";
      projectId: string;
      timestamp: string;
    }
  | {
      type: "MASTERY_CHALLENGE_STARTED";
      moduleId: string;
      timestamp: string;
    }
  | {
      type: "MODULE_MASTERED";
      moduleId: string;
      timestamp: string;
    };

export type DomainEventListener = (event: LearnerDomainEvent) => void;

class LearnerEventBus {
  private listeners: Set<DomainEventListener> = new Set();

  public subscribe(listener: DomainEventListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public emit(event: LearnerDomainEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (err) {
        console.error("Error in LearnerDomainEvent listener:", err);
      }
    }
  }

  public clear(): void {
    this.listeners.clear();
  }
}

export const learnerEventBus = new LearnerEventBus();
