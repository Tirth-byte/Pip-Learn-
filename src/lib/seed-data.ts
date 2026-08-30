export interface UserProfile {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarIndex: number;
  bio: string;
  website: string;
  github: string;
  role: string;
  institutionId: string | null;
}

export interface UserProgress {
  streak: number;
  xp: number;
  currentTarget: string;
  solvedProblemIds: string[];
  completedModuleIds: string[];
  completedMilestoneIds?: string[];
}

export interface AppState {
  isAuthenticated: boolean;
  user: UserProfile;
  progress: UserProgress;
}

export const initialSeedData: AppState = {
  isAuthenticated: false,
  user: {
    name: "Learner",
    firstName: "Learner",
    lastName: "",
    email: "",
    avatarIndex: 0,
    bio: "Passionate learner building projects in Python, AI, and Next.js.",
    website: "",
    github: "",
    role: "Python Learner",
    institutionId: "stanford",
  },
  progress: {
    streak: 1,
    xp: 0,
    currentTarget: "Start Learning",
    solvedProblemIds: [],
    completedModuleIds: [],
    completedMilestoneIds: [],
  },
};

