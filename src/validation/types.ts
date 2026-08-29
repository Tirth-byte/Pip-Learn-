/**
 * PipLearn Behavioral Milestone Validation Engine — Types & Contracts
 * 
 * Defines domain models for behavioral test cases, assertions, validation suites,
 * and structured diagnostic results.
 * 
 * Core Architectural Principle:
 * Run Code ≠ Check Milestone ≠ Progress
 */

import { PythonRuntimeError } from "@/execution/types";
import { LearnerWorkspaceFiles } from "@/learning-state/types";

export type ValidationStatus =
  | "passed"
  | "failed"
  | "execution_error"
  | "timed_out"
  | "invalid_configuration";

export type AssertionType =
  | "contains_text"
  | "contains_numeric"
  | "contains_all_numerics"
  | "not_contains_concat_trap"
  | "matches_regex"
  | "custom";

export interface BaseAssertion {
  type: AssertionType;
  description: string;
  failureMessage?: string; // Learner-safe diagnostic message (explains WHAT failed, not HOW to fix code)
}

export interface ContainsTextAssertion extends BaseAssertion {
  type: "contains_text";
  text: string;
  caseSensitive?: boolean;
}

export interface ContainsNumericAssertion extends BaseAssertion {
  type: "contains_numeric";
  value: number;
  tolerance?: number; // Default: 1e-4
  label?: string; // e.g. "Sum", "Quotient"
}

export interface ContainsAllNumericsAssertion extends BaseAssertion {
  type: "contains_all_numerics";
  values: { label: string; value: number; tolerance?: number }[];
}

export interface NotContainsConcatTrapAssertion extends BaseAssertion {
  type: "not_contains_concat_trap";
  inputs: [string, string];
  expectedSum: number;
}

export interface MatchesRegexAssertion extends BaseAssertion {
  type: "matches_regex";
  pattern: string;
  flags?: string;
}

export interface CustomAssertion extends BaseAssertion {
  type: "custom";
  check: (output: string) => { passed: boolean; message?: string };
}

export type BehavioralAssertion =
  | ContainsTextAssertion
  | ContainsNumericAssertion
  | ContainsAllNumericsAssertion
  | NotContainsConcatTrapAssertion
  | MatchesRegexAssertion
  | CustomAssertion;

/**
 * Individual behavioral test case fixture with automated stdin inputs
 */
export interface BehavioralTestCase {
  id: string;
  name: string;
  description: string;
  simulatedInputs: string[]; // Sequential inputs fed automatically on waiting_for_input
  assertions: BehavioralAssertion[];
  criterionIds?: string[]; // Maps test case to milestone Acceptance Criteria IDs
  timeoutMs?: number; // Per-test case execution timeout (default: 8,000ms)
}

/**
 * Declarative validation suite for a specific milestone
 */
export interface MilestoneValidationSuite {
  id: string;
  projectId: string;
  milestoneId: string;
  version: string; // Semantic version matching curriculum
  title: string;
  testCases: BehavioralTestCase[];
}

/**
 * Validation result for an individual milestone acceptance criterion
 */
export interface CriterionValidationResult {
  criterionId: string;
  passed: boolean;
  description: string;
  learnerFeedback?: string;
}

/**
 * Validation result for an individual behavioral test case
 */
export interface TestCaseValidationResult {
  testCaseId: string;
  name: string;
  passed: boolean;
  learnerFeedback?: string;
  actualStdout?: string;
  executionError?: PythonRuntimeError;
  durationMs: number;
}

/**
 * Complete structured validation result returned to UI/caller
 */
export interface ValidationResult {
  status: ValidationStatus;
  passed: boolean;
  projectId: string;
  milestoneId: string;
  curriculumVersion: string;
  totalChecks: number;
  passedChecks: number;
  criteriaResults: CriterionValidationResult[];
  testCaseResults: TestCaseValidationResult[];
  executionError?: PythonRuntimeError;
  durationMs: number;
  timestamp: string; // ISO 8601
}

/**
 * Request payload for milestone validation
 */
export interface ValidationRequest {
  projectId: string;
  milestoneId: string;
  curriculumVersion?: string;
  files: LearnerWorkspaceFiles;
  entrypoint?: string; // Default: calculator.py
  customSuite?: MilestoneValidationSuite;
}

/**
 * Validation Engine Contract
 */
export interface ValidationEngine {
  validateMilestone(request: ValidationRequest): Promise<ValidationResult>;
}
