/**
 * PipLearn Core Domain Types — Curriculum & Content Architecture
 * 
 * These types define the immutable, versioned learning content.
 * Note: Curriculum content is strictly separated from mutable Learner Progress.
 */

export type ProjectType =
  | "module_project"
  | "practice_project"
  | "challenge_project"
  | "portfolio_project"
  | "capstone_project";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type ResourceCategory =
  | "concept"
  | "syntax"
  | "example"
  | "documentation"
  | "common_mistake"
  | "debugging"
  | "external";

/**
 * Versioned Content Envelope
 */
export interface ContentEnvelope<T> {
  contentId: string;
  version: string; // Semantic version string, e.g. "1.0.0"
  data: T;
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    contentHash?: string;
  };
}

/**
 * Learning Path (e.g. "Programming with Python")
 */
export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  version: string;
  difficulty: Difficulty;
  moduleIds: string[]; // Ordered list of Module IDs
  capstoneProjectId?: string;
}

/**
 * Essential Primer Definition (<3 min read)
 */
export interface EssentialPrimerCard {
  id: string;
  title: string;
  description: string;
  diagramType?: "recipe" | "io_box" | "data_type" | "memory";
  codeSnippet?: string;
}

export interface EssentialPrimer {
  readingMinutes: number;
  cards: EssentialPrimerCard[];
  runnableMicroSnippet?: {
    initialCode: string;
    expectedOutput: string;
  };
}

/**
 * Curriculum Module (Unit)
 * Note: Module ≠ Project. A module references its core primary project.
 */
export interface Module {
  id: string;
  slug: string;
  unitNumber: number;
  title: string;
  tagline?: string;
  description: string;
  version: string;
  primaryProjectId: string; // Primary hands-on project driving this module
  supplementaryProjectIds?: string[]; // Practice projects
  conceptIds: string[]; // Key concepts taught in this module
  primer?: EssentialPrimer;
  masteryChallengeId?: string; // Reference to transfer mastery challenge
  estimatedMinutes?: number;
}

/**
 * Outcome Preview for Projects (Demonstrates behavior without exposing source code)
 */
export interface OutcomePreview {
  description: string;
  simulatedInputs?: string[];
  simulatedOutputs?: string[];
  terminalTranscript?: string;
}

/**
 * First-Class Project
 * Can exist as a module driver or standalone in the Project Library.
 */
export interface Project {
  id: string;
  slug: string;
  title: string;
  version: string;
  type: ProjectType;
  difficulty: Difficulty;
  missionStatement: string;
  outcomePreview: OutcomePreview;
  milestoneIds: string[]; // Ordered list of Milestone IDs
  conceptIds: string[];
  tags: string[];
  estimatedMinutes?: number;
}

/**
 * Acceptance Criterion for a Milestone
 */
export interface AcceptanceCriterion {
  id: string;
  description: string;
  contractDescription?: string;
}

/**
 * Project Milestone (Verifiable engineering stage)
 */
export interface Milestone {
  id: string;
  projectId: string; // Parent Project ID
  order: number; // 1-based ordering
  title: string;
  objective: string;
  criteria: AcceptanceCriterion[];
  starterFiles?: Record<string, string>; // e.g. { "calculator.py": "# Starter code" }
  validationId?: string;
  resourceIds?: string[];
}

/**
 * Conceptual Topic / Skill Unit
 */
export interface Concept {
  id: string;
  slug: string;
  title: string;
  category?: string;
  summary?: string;
}

/**
 * Contextual Learning Resource (Concept cards, syntax cheatsheets, common mistakes)
 */
export interface Resource {
  id: string;
  title: string;
  category: ResourceCategory;
  summary?: string;
  content?: string;
  codeSnippet?: string;
  conceptId?: string;
  externalUrl?: string;
}
