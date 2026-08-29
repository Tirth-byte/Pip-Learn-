/**
 * PipLearn Behavioral Validation Subsystem
 * 
 * Public entrypoint for milestone validation.
 */

export * from "./types";
export * from "./comparison";
export * from "./engine";
export * from "./suites/smart-calculator";

import { DefaultValidationEngine } from "./engine";
import { ValidationEngine, ValidationRequest, ValidationResult } from "./types";
import { ExecutionProvider } from "@/execution/execution-provider.interface";

/**
 * Factory to create a ValidationEngine instance
 */
export function createValidationEngine(executionProvider?: ExecutionProvider): ValidationEngine {
  return new DefaultValidationEngine(executionProvider);
}

/**
 * Convenience function to validate a milestone request using the default engine
 */
export async function validateMilestone(
  request: ValidationRequest,
  executionProvider?: ExecutionProvider
): Promise<ValidationResult> {
  const engine = new DefaultValidationEngine(executionProvider);
  return engine.validateMilestone(request);
}
