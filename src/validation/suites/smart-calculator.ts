/**
 * Declarative Validation Suites for Module 1 — Smart Calculator
 * 
 * Provides behavioral black-box validation suites for Milestones 1 through 4.
 * Uses automated stdin fixtures and behavioral assertions.
 */

import { MilestoneValidationSuite } from "../types";

export const smartCalculatorMilestone1Suite: MilestoneValidationSuite = {
  id: "val-smart-calc-m1",
  projectId: "project-smart-calculator",
  milestoneId: "milestone-calc-1",
  version: "1.0.0",
  title: "Milestone 1: Welcome Banner & User Input Validation",
  testCases: [
    {
      id: "tc-m1-alex",
      name: "Greeting Interaction Test (Alex)",
      description: "Verifies the program prompts for the user's name and prints a personalized greeting.",
      simulatedInputs: ["Alex"],
      criterionIds: ["crit-1-header", "crit-1-name-input", "crit-1-greeting"],
      assertions: [
        {
          type: "contains_text",
          text: "Alex",
          description: "Greeting contains the captured user name 'Alex'.",
          failureMessage: "Your program ran, but the greeting did not display the name entered by the user ('Alex').",
        },
      ],
    },
    {
      id: "tc-m1-sam",
      name: "Greeting Interaction Test (Sam)",
      description: "Verifies greeting dynamically adapts to different user names.",
      simulatedInputs: ["Sam"],
      criterionIds: ["crit-1-name-input", "crit-1-greeting"],
      assertions: [
        {
          type: "contains_text",
          text: "Sam",
          description: "Greeting contains the captured user name 'Sam'.",
          failureMessage: "Your program ran, but did not dynamically include 'Sam' in the terminal output.",
        },
      ],
    },
  ],
};

export const smartCalculatorMilestone2Suite: MilestoneValidationSuite = {
  id: "val-smart-calc-m2",
  projectId: "project-smart-calculator",
  milestoneId: "milestone-calc-2",
  version: "1.0.0",
  title: "Milestone 2: Addition Engine & Type Conversion Validation",
  testCases: [
    {
      id: "tc-m2-integers-1",
      name: "Integer Addition & Type Trap Check (10 + 20)",
      description: "Tests addition of 10 and 20. Detects string concatenation trap ('1020').",
      simulatedInputs: ["Alex", "10", "20"],
      criterionIds: ["crit-2-num1", "crit-2-num2", "crit-2-sum"],
      assertions: [
        {
          type: "not_contains_concat_trap",
          inputs: ["10", "20"],
          expectedSum: 30,
          description: "Computes 10 + 20 = 30 without string concatenation.",
        },
        {
          type: "contains_numeric",
          value: 30,
          label: "Sum of 10 and 20",
          description: "Outputs numerical sum of 30.",
          failureMessage: "For inputs 10 and 20, the calculator did not output a sum equivalent to 30.",
        },
      ],
    },
    {
      id: "tc-m2-integers-2",
      name: "Integer Addition Check (7 + 8)",
      description: "Tests addition with a secondary integer fixture (7 and 8).",
      simulatedInputs: ["Sam", "7", "8"],
      criterionIds: ["crit-2-sum"],
      assertions: [
        {
          type: "not_contains_concat_trap",
          inputs: ["7", "8"],
          expectedSum: 15,
          description: "Computes 7 + 8 = 15.",
        },
        {
          type: "contains_numeric",
          value: 15,
          label: "Sum of 7 and 8",
          description: "Outputs numerical sum of 15.",
          failureMessage: "For inputs 7 and 8, the calculator did not output a sum equivalent to 15.",
        },
      ],
    },
    {
      id: "tc-m2-decimals",
      name: "Decimal Addition Check (12.5 + 7.5)",
      description: "Tests decimal numbers (12.5 and 7.5) to verify decimal addition.",
      simulatedInputs: ["Dev", "12.5", "7.5"],
      criterionIds: ["crit-2-sum"],
      assertions: [
        {
          type: "contains_numeric",
          value: 20.0,
          label: "Sum of 12.5 and 7.5",
          description: "Outputs numerical sum of 20.0.",
          failureMessage: "For decimal inputs 12.5 and 7.5, the calculator did not output 20 (or 20.0). Make sure to convert inputs so decimals are supported.",
        },
      ],
    },
  ],
};

export const smartCalculatorMilestone3Suite: MilestoneValidationSuite = {
  id: "val-smart-calc-m3",
  projectId: "project-smart-calculator",
  milestoneId: "milestone-calc-3",
  version: "1.0.0",
  title: "Milestone 3: Multi-Operator Arithmetic Suite Validation",
  testCases: [
    {
      id: "tc-m3-math-suite-1",
      name: "7-Operator Arithmetic Suite (45 and 6)",
      description: "Tests +, -, *, /, //, %, and ** on 45 and 6.",
      simulatedInputs: ["Alex", "45", "6"],
      criterionIds: ["crit-3-basic-math", "crit-3-division", "crit-3-power"],
      assertions: [
        {
          type: "contains_all_numerics",
          description: "Verifies all 7 mathematical operations on 45 and 6.",
          values: [
            { label: "Addition (45 + 6)", value: 51 },
            { label: "Subtraction (45 - 6)", value: 39 },
            { label: "Multiplication (45 * 6)", value: 270 },
            { label: "Exact Division (45 / 6)", value: 7.5 },
            { label: "Floor Division (45 // 6)", value: 7 },
            { label: "Remainder / Modulo (45 % 6)", value: 3 },
            { label: "Exponentiation (45 ** 2)", value: 2025 },
          ],
          failureMessage: "One or more arithmetic operations produced incorrect values for 45 and 6.",
        },
      ],
    },
    {
      id: "tc-m3-math-suite-2",
      name: "7-Operator Arithmetic Suite (10 and 4)",
      description: "Secondary fixture testing all 7 operators on 10 and 4.",
      simulatedInputs: ["Jordan", "10", "4"],
      criterionIds: ["crit-3-basic-math", "crit-3-division", "crit-3-power"],
      assertions: [
        {
          type: "contains_all_numerics",
          description: "Verifies operations on 10 and 4.",
          values: [
            { label: "Addition (10 + 4)", value: 14 },
            { label: "Subtraction (10 - 4)", value: 6 },
            { label: "Multiplication (10 * 4)", value: 40 },
            { label: "Exact Division (10 / 4)", value: 2.5 },
            { label: "Floor Division (10 // 4)", value: 2 },
            { label: "Remainder / Modulo (10 % 4)", value: 2 },
            { label: "Exponentiation (10 ** 2)", value: 100 },
          ],
          failureMessage: "One or more arithmetic operations produced incorrect values for 10 and 4.",
        },
      ],
    },
  ],
};

export const smartCalculatorMilestone4Suite: MilestoneValidationSuite = {
  id: "val-smart-calc-m4",
  projectId: "project-smart-calculator",
  milestoneId: "milestone-calc-4",
  version: "1.0.0",
  title: "Milestone 4: Formatted Calculation Receipt Validation",
  testCases: [
    {
      id: "tc-m4-receipt-alex",
      name: "Calculation Receipt Formatting Test (Alex, 45, 6)",
      description: "Verifies clean receipt summary presentation containing user name and all 7 operations.",
      simulatedInputs: ["Alex", "45", "6"],
      criterionIds: ["crit-4-format"],
      assertions: [
        {
          type: "contains_text",
          text: "Alex",
          description: "Receipt references user name 'Alex'.",
          failureMessage: "The final receipt did not include the learner's name ('Alex').",
        },
        {
          type: "contains_all_numerics",
          description: "Receipt displays all 7 calculated values for 45 and 6.",
          values: [
            { label: "Sum (51)", value: 51 },
            { label: "Difference (39)", value: 39 },
            { label: "Product (270)", value: 270 },
            { label: "Division (7.5)", value: 7.5 },
            { label: "Floor Div (7)", value: 7 },
            { label: "Remainder (3)", value: 3 },
            { label: "Power (2025)", value: 2025 },
          ],
          failureMessage: "The calculation receipt was missing one or more required numerical results for 45 and 6.",
        },
      ],
    },
    {
      id: "tc-m4-receipt-taylor",
      name: "Calculation Receipt Dynamic Test (Taylor, 8, 2)",
      description: "Verifies receipt adapts dynamically for different numbers (8 and 2).",
      simulatedInputs: ["Taylor", "8", "2"],
      criterionIds: ["crit-4-format"],
      assertions: [
        {
          type: "contains_text",
          text: "Taylor",
          description: "Receipt references user name 'Taylor'.",
          failureMessage: "The final receipt did not display the name 'Taylor'.",
        },
        {
          type: "contains_all_numerics",
          description: "Receipt displays all calculated values for 8 and 2.",
          values: [
            { label: "Sum (10)", value: 10 },
            { label: "Difference (6)", value: 6 },
            { label: "Product (16)", value: 16 },
            { label: "Division (4)", value: 4 },
            { label: "Floor Div (4)", value: 4 },
            { label: "Remainder (0)", value: 0 },
            { label: "Power (64)", value: 64 },
          ],
          failureMessage: "The calculation receipt was missing one or more calculated values for 8 and 2.",
        },
      ],
    },
  ],
};

export const smartCalculatorValidationSuites: Record<string, MilestoneValidationSuite> = {
  "milestone-calc-1": smartCalculatorMilestone1Suite,
  "milestone-calc-2": smartCalculatorMilestone2Suite,
  "milestone-calc-3": smartCalculatorMilestone3Suite,
  "milestone-calc-4": smartCalculatorMilestone4Suite,
};
