"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";
import { AppState, UserProfile, initialSeedData } from "@/lib/seed-data";

const STORAGE_KEY = "piplearn_state_v1";

interface AppContextType extends AppState {
  login: (userInfo?: { name?: string; email?: string } | string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setInstitution: (institutionId: string | null) => void;
  updateProgress: (xpAdd: number, streakUpdate?: number) => void;
  completeProblem: (problemId: string, xpEarned?: number) => void;
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

  const login = useCallback((userInfo?: { name?: string; email?: string } | string) => {
    let nameInput = "";
    let emailInput = "";

    if (typeof userInfo === "string") {
      emailInput = userInfo;
    } else if (userInfo) {
      nameInput = userInfo.name || "";
      emailInput = userInfo.email || "";
    }

    const rawEmail = emailInput.trim() || currentState.user.email || "learner@piplearn.ai";
    const rawName = nameInput.trim() || (rawEmail.includes("@") ? rawEmail.split("@")[0] : "Learner");

    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const nameParts = formattedName.split(" ");
    const firstName = nameParts[0] || "Learner";
    const lastName = nameParts.slice(1).join(" ") || "";
    const fullName = formattedName;

    setStateAndPersist({
      ...currentState,
      isAuthenticated: true,
      user: {
        ...currentState.user,
        name: fullName,
        firstName: firstName,
        lastName: lastName,
        email: rawEmail,
        github: `github.com/${firstName.toLowerCase()}`,
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

  const setInstitution = useCallback((institutionId: string | null) => {
    setStateAndPersist({
      ...currentState,
      user: {
        ...currentState.user,
        institutionId: institutionId,
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
        setInstitution,
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
