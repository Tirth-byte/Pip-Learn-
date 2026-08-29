/**
 * PipLearn Behavioral Output Comparison & Normalization Utilities
 * 
 * Implements conservative output normalization, numeric token extraction,
 * floating-point tolerance comparisons, and behavioral assertion evaluators.
 */

import { BehavioralAssertion } from "./types";

/**
 * Normalizes output text conservatively:
 * - Normalizes Windows (\r\n) and Mac (\r) line breaks to Unix (\n)
 * - Trims trailing whitespace from each line
 * - Normalizes consecutive spaces (excluding indentation)
 */
export function normalizeOutput(text: string): string {
  if (!text) return "";
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

/**
 * Compares two numbers with a conservative absolute/relative tolerance.
 * Accounts for floating-point inaccuracies like 0.1 + 0.2 = 0.30000000000000004.
 */
export function approxEqual(actual: number, expected: number, tolerance = 1e-4): boolean {
  if (Object.is(actual, expected)) return true;
  const diff = Math.abs(actual - expected);
  if (diff <= tolerance) return true;
  // Relative tolerance for larger magnitudes
  const maxMag = Math.max(Math.abs(actual), Math.abs(expected));
  return maxMag > 0 && diff / maxMag <= tolerance;
}

/**
 * Extracts all numeric values (integers, decimals, negative numbers) from output text.
 */
export function extractNumericTokens(text: string): number[] {
  if (!text) return [];
  // Match numbers: -?(\d+(\.\d+)?([eE][+-]?\d+)?)
  // Avoid matching numbers that are part of identifiers like var123
  const matches = text.match(/(?:^|[^\w.])(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)(?:[^\w.]|$)/g);
  if (!matches) return [];

  const numbers: number[] = [];
  for (const m of matches) {
    // Extract actual numeric token from match
    const numMatch = m.match(/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);
    if (numMatch) {
      const parsed = parseFloat(numMatch[0]);
      if (!isNaN(parsed)) {
        numbers.push(parsed);
      }
    }
  }
  return numbers;
}

/**
 * Checks if output text contains a numeric value equivalent to `expected` within tolerance.
 * e.g. expected = 30 matches "30", "30.0", "30.00", "Sum: 30".
 */
export function containsNumericValue(
  output: string,
  expected: number,
  tolerance = 1e-4
): boolean {
  const numbers = extractNumericTokens(output);
  return numbers.some((num) => approxEqual(num, expected, tolerance));
}

/**
 * Specifically detects if learner code committed the beginner "String Concatenation Trap"
 * (e.g. inputs "10" and "20" resulting in the token "1020" instead of 30).
 */
export function checkStringConcatTrap(output: string, in1: string, in2: string): boolean {
  const trapToken = `${in1}${in2}`;
  if (!trapToken || trapToken.length <= 1) return false;

  // Check if output contains the combined string as a numeric token or substring
  return output.includes(trapToken);
}

/**
 * Evaluates a single behavioral assertion against raw program output.
 */
export function evaluateAssertion(
  rawOutput: string,
  assertion: BehavioralAssertion
): { passed: boolean; failureMessage?: string } {
  const normalized = normalizeOutput(rawOutput);

  switch (assertion.type) {
    case "contains_text": {
      const haystack = assertion.caseSensitive ? normalized : normalized.toLowerCase();
      const needle = assertion.caseSensitive ? assertion.text : assertion.text.toLowerCase();
      const passed = haystack.includes(needle);
      return {
        passed,
        failureMessage: passed
          ? undefined
          : assertion.failureMessage || `Output was expected to contain "${assertion.text}".`,
      };
    }

    case "contains_numeric": {
      const passed = containsNumericValue(normalized, assertion.value, assertion.tolerance);
      return {
        passed,
        failureMessage: passed
          ? undefined
          : assertion.failureMessage ||
            `Expected output to include a calculated value equivalent to ${assertion.value} (${assertion.label || "result"}).`,
      };
    }

    case "contains_all_numerics": {
      const missing: string[] = [];
      for (const item of assertion.values) {
        if (!containsNumericValue(normalized, item.value, item.tolerance)) {
          missing.push(`${item.label} (${item.value})`);
        }
      }
      const passed = missing.length === 0;
      return {
        passed,
        failureMessage: passed
          ? undefined
          : assertion.failureMessage ||
            `Output was missing expected calculation results: ${missing.join(", ")}.`,
      };
    }

    case "not_contains_concat_trap": {
      const [in1, in2] = assertion.inputs;
      const isTrapped = checkStringConcatTrap(normalized, in1, in2);
      const hasCorrectSum = containsNumericValue(normalized, assertion.expectedSum);

      if (isTrapped && !hasCorrectSum) {
        return {
          passed: false,
          failureMessage:
            assertion.failureMessage ||
            `Your program joined the text inputs together ("${in1}${in2}") instead of calculating the numerical sum (${assertion.expectedSum}). Remember that input() returns text (str).`,
        };
      }

      return {
        passed: hasCorrectSum,
        failureMessage: hasCorrectSum
          ? undefined
          : `Expected calculated sum of ${assertion.expectedSum}.`,
      };
    }

    case "matches_regex": {
      const re = new RegExp(assertion.pattern, assertion.flags || "i");
      const passed = re.test(normalized);
      return {
        passed,
        failureMessage: passed
          ? undefined
          : assertion.failureMessage || `Output did not match expected pattern: ${assertion.description}`,
      };
    }

    case "custom": {
      const res = assertion.check(normalized);
      return {
        passed: res.passed,
        failureMessage: res.passed ? undefined : res.message || assertion.failureMessage,
      };
    }

    default:
      return { passed: false, failureMessage: "Unknown assertion type" };
  }
}
