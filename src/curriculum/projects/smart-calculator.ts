import { Project } from "../types";

export const smartCalculatorProject: Project = {
  id: "project-smart-calculator",
  slug: "smart-calculator",
  title: "Smart Calculator",
  version: "1.0.0",
  type: "module_project",
  difficulty: "beginner",
  missionStatement:
    "Build a command-line arithmetic calculation tool from scratch that accepts user input, processes mathematical operations, and formats calculation receipts.",
  outcomePreview: {
    description:
      "An interactive CLI arithmetic tool that calculates addition, subtraction, multiplication, true division, floor division, remainder, and power.",
    simulatedInputs: ["Alex", "45", "6"],
    simulatedOutputs: [
      "=== SMART CALCULATOR ===",
      "Hello, Alex!",
      "Sum (+): 51.0",
      "Exact Div (/): 7.5",
      "Floor Div (//): 7",
      "Remainder (%): 3",
      "Power (**): 2025.0",
    ],
    terminalTranscript: `=== PIP LEARN SMART CALCULATOR ===
What is your name? Alex
Enter first number: 45
Enter second number: 6

--- RESULTS FOR ALEX ---
Addition (+)       : 51.0
Subtraction (-)    : 39.0
Multiplication (*) : 270.0
Exact Div (/)      : 7.5
Floor Div (//)     : 7
Remainder (%)      : 3
45 squared (**)    : 2025.0
========================`,
  },
  milestoneIds: [
    "milestone-calc-1",
    "milestone-calc-2",
    "milestone-calc-3",
    "milestone-calc-4",
  ],
  conceptIds: [
    "concept-variables",
    "concept-io",
    "concept-data-types",
    "concept-type-conversion",
    "concept-arithmetic",
  ],
  tags: ["Python", "CLI", "Math", "Types", "Variables"],
  estimatedMinutes: 45,
};
