import {
  LearnerProjectState,
  LearnerModuleProgress,
  LearnerLearningPathProgress,
} from "../types";

/**
 * Server-Side Learner State Repository Interface.
 * Defines the contract for future canonical authenticated persistence (Postgres, SQLite, or REST).
 * 
 * Note: Decouples the state engine from any direct dependency on browser LocalStorage.
 */
export interface LearnerStateRepository {
  loadProjectState(userId: string, projectId: string): Promise<LearnerProjectState | null>;
  saveProjectState(userId: string, state: LearnerProjectState): Promise<void>;
  
  loadModuleProgress(userId: string, moduleId: string): Promise<LearnerModuleProgress | null>;
  saveModuleProgress(userId: string, progress: LearnerModuleProgress): Promise<void>;
  
  loadLearningPathProgress(userId: string, pathId: string): Promise<LearnerLearningPathProgress | null>;
  saveLearningPathProgress(userId: string, progress: LearnerLearningPathProgress): Promise<void>;
  
  deleteProjectState(userId: string, projectId: string): Promise<void>;
}
