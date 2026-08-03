"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";
import { AppState, UserProfile, UserProgress, initialSeedData } from "@/lib/seed-data";

const STORAGE_KEY = "piplearn_state_v1";

interface AppContextType extends AppState {
  login: (email?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateProgress: (xpAdd: number, streakUpdate?: number) => void;
  completeProblem: (problemId: string, xpEarned: number) => void;
}

// --- External store backed by localStorage ---------------------------------
// Reading localStorage via useSyncExternalStore keeps the server render and the
// first client render identical (both use initialSeedData), then swaps in the
// persisted state after hydration without a mismatch.
let currentState: AppState = initialSeedData;
let hasLoadedFromStorage = false;
const listeners = new Set<() => void>();

function loadFromStorage(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<AppState>;
      return {
        ...initialSeedData,
        ...parsed,
        user: { ...initialSeedData.user, ...parsed.user },
        progress: { ...initialSeedData.progress, ...parsed.progress },
      };
    }
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
  }
  return initialSeedData;
}

function getSnapshot(): AppState {
  if (!hasLoadedFromStorage) {
    hasLoadedFromStorage = true;
    currentState = loadFromStorage();
  }
  return currentState;
}

function getServerSnapshot(): AppState {
  return initialSeedData;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setStateAndPersist(next: AppState) {
  currentState = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
  listeners.forEach((listener) => listener());
}

// ---------------------------------------------------------------------------

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = useCallback((email?: string) => {
    setStateAndPersist({
      ...currentState,
      isAuthenticated: true,
      user: {
        ...currentState.user,
        email: email || currentState.user.email,
      },
    });
  }, []);

  const logout = useCallback(() => {
    setStateAndPersist({
      ...currentState,
      isAuthenticated: false,
    });
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    const newFirstName = updates.firstName !== undefined ? updates.firstName : currentState.user.firstName;
    const newLastName = updates.lastName !== undefined ? updates.lastName : currentState.user.lastName;
    const fullName = `${newFirstName} ${newLastName}`.trim() || currentState.user.name;

    setStateAndPersist({
      ...currentState,
      user: {
        ...currentState.user,
        ...updates,
        name: fullName,
      },
    });
  }, []);

  const updateProgress = useCallback((xpAdd: number, streakUpdate?: number) => {
    setStateAndPersist({
      ...currentState,
      progress: {
        ...currentState.progress,
        xp: currentState.progress.xp + xpAdd,
        streak: streakUpdate !== undefined ? streakUpdate : currentState.progress.streak,
      },
    });
  }, []);

  const completeProblem = useCallback((problemId: string, xpEarned: number = 20) => {
    if (currentState.progress.solvedProblemIds.includes(problemId)) return;

    setStateAndPersist({
      ...currentState,
      progress: {
        ...currentState.progress,
        xp: currentState.progress.xp + xpEarned,
        solvedProblemIds: [...currentState.progress.solvedProblemIds, problemId],
      },
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateProfile,
        updateProgress,
        completeProblem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
