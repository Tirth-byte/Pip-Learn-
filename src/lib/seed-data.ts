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
}

export interface UserProgress {
  streak: number;
  xp: number;
  currentTarget: string;
  solvedProblemIds: string[];
  completedModuleIds: string[];
}

export interface AppState {
  isAuthenticated: boolean;
  user: UserProfile;
  progress: UserProgress;
}

export const initialSeedData: AppState = {
  isAuthenticated: true,
  user: {
    name: "Tirth Patel",
    firstName: "Tirth",
    lastName: "Patel",
    email: "tirth@piplearn.ai",
    avatarIndex: 0, // Girl Avatar (Blue Ring) / Pencil Boy
    bio: "Passionate learner building projects in Python, AI, and Next.js.",
    website: "https://tirthpatel.dev",
    github: "github.com/tirthpatel",
    role: "Full-Stack Developer",
  },
  progress: {
    streak: 12,
    xp: 2450,
    currentTarget: "Python Control Flow",
    solvedProblemIds: ["1", "5"],
    completedModuleIds: ["1", "2"],
  },
};
