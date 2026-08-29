import {
  LearnerProjectState,
  LearnerModuleProgress,
  LearnerLearningPathProgress,
} from "../types";

export const LOCAL_STORAGE_SCHEMA_VERSION = 1;

interface StorageEnvelope<T> {
  schemaVersion: number;
  savedAt: string;
  payload: T;
}

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * In-memory fallback storage for SSR / Node environments / Unit tests.
 */
export class MemoryStorageAdapter implements KeyValueStorage {
  private store = new Map<string, string>();

  public getItem(key: string): string | null {
    return this.store.get(key) || null;
  }

  public setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  public removeItem(key: string): void {
    this.store.delete(key);
  }

  public clear(): void {
    this.store.clear();
  }
}

/**
 * LocalStorage Adapter for client-side workspace caching.
 * Note: Explicitly documented as a local cache, not a cross-device synchronization engine.
 */
export class LocalLearnerStorageAdapter {
  private storage: KeyValueStorage;

  constructor(storage?: KeyValueStorage) {
    if (storage) {
      this.storage = storage;
    } else if (typeof window !== "undefined" && window.localStorage) {
      this.storage = window.localStorage;
    } else {
      this.storage = new MemoryStorageAdapter();
    }
  }

  private getKey(prefix: string, id: string): string {
    return `piplearn_local_${prefix}_${id}`;
  }

  private wrap<T>(payload: T): string {
    const envelope: StorageEnvelope<T> = {
      schemaVersion: LOCAL_STORAGE_SCHEMA_VERSION,
      savedAt: new Date().toISOString(),
      payload,
    };
    return JSON.stringify(envelope);
  }

  private unwrap<T>(raw: string | null): T | null {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as StorageEnvelope<T>;
      if (!parsed || typeof parsed !== "object") return null;
      if (parsed.schemaVersion !== LOCAL_STORAGE_SCHEMA_VERSION) {
        // Stale schema version: fail safely rather than corrupting state
        console.warn(
          `Local state schema mismatch. Expected ${LOCAL_STORAGE_SCHEMA_VERSION}, got ${parsed.schemaVersion}.`
        );
        return null;
      }
      return parsed.payload;
    } catch (err) {
      console.error("Failed to parse local storage envelope:", err);
      return null;
    }
  }

  // --- Project State ---

  public saveProjectState(state: LearnerProjectState): void {
    const key = this.getKey("project", state.projectId);
    this.storage.setItem(key, this.wrap(state));
  }

  public loadProjectState(projectId: string): LearnerProjectState | null {
    const key = this.getKey("project", projectId);
    return this.unwrap<LearnerProjectState>(this.storage.getItem(key));
  }

  public removeProjectState(projectId: string): void {
    const key = this.getKey("project", projectId);
    this.storage.removeItem(key);
  }

  // --- Module Progress ---

  public saveModuleProgress(progress: LearnerModuleProgress): void {
    const key = this.getKey("module", progress.moduleId);
    this.storage.setItem(key, this.wrap(progress));
  }

  public loadModuleProgress(moduleId: string): LearnerModuleProgress | null {
    const key = this.getKey("module", moduleId);
    return this.unwrap<LearnerModuleProgress>(this.storage.getItem(key));
  }

  // --- Learning Path Progress ---

  public saveLearningPathProgress(progress: LearnerLearningPathProgress): void {
    const key = this.getKey("path", progress.learningPathId);
    this.storage.setItem(key, this.wrap(progress));
  }

  public loadLearningPathProgress(pathId: string): LearnerLearningPathProgress | null {
    const key = this.getKey("path", pathId);
    return this.unwrap<LearnerLearningPathProgress>(this.storage.getItem(key));
  }
}

export const defaultLocalStorageAdapter = new LocalLearnerStorageAdapter();
