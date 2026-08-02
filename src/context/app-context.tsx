"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState, UserProfile, UserProgress, initialSeedData } from "@/lib/seed-data";

const STORAGE_KEY = "piplearn_state_v1";

interface AppContextType extends AppState {
  login: (email?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateProgress: (xpAdd: number, streakUpdate?: number) => void;
  completeProblem: (problemId: string, xpEarned: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error("Failed to load state from localStorage", e);
      }
    }
    return initialSeedData;
  });

  // Sync state to localStorage on any change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [state]);

  const login = (email?: string) => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      user: {
        ...prev.user,
        email: email || prev.user.email,
      },
    }));
  };

  const logout = () => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: false,
    }));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setState((prev) => {
      const newFirstName = updates.firstName !== undefined ? updates.firstName : prev.user.firstName;
      const newLastName = updates.lastName !== undefined ? updates.lastName : prev.user.lastName;
      const fullName = `${newFirstName} ${newLastName}`.trim() || prev.user.name;

      return {
        ...prev,
        user: {
          ...prev.user,
          ...updates,
          name: fullName,
        },
      };
    });
  };

  const updateProgress = (xpAdd: number, streakUpdate?: number) => {
    setState((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        xp: prev.progress.xp + xpAdd,
        streak: streakUpdate !== undefined ? streakUpdate : prev.progress.streak,
      },
    }));
  };

  const completeProblem = (problemId: string, xpEarned: number = 20) => {
    setState((prev) => {
      const alreadySolved = prev.progress.solvedProblemIds.includes(problemId);
      if (alreadySolved) return prev;

      return {
        ...prev,
        progress: {
          ...prev.progress,
          xp: prev.progress.xp + xpEarned,
          solvedProblemIds: [...prev.progress.solvedProblemIds, problemId],
        },
      };
    });
  };

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
