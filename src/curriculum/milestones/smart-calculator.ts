import { Milestone } from "../types";

export const smartCalculatorMilestones: Milestone[] = [
  {
    id: "milestone-calc-1",
    projectId: "project-smart-calculator",
    order: 1,
    title: "Welcome Banner & User Input",
    objective: "Display a welcome message, ask the user for their name, and greet them.",
    criteria: [
      {
        id: "crit-1-header",
        description: "Prints calculator welcome banner.",
        contractDescription: "Outputs welcome header to stdout.",
      },
      {
        id: "crit-1-name-input",
        description: "Prompts and captures user name with input().",
        contractDescription: "Uses input() to capture user name.",
      },
      {
        id: "crit-1-greeting",
        description: "Greets user with captured name.",
        contractDescription: "Outputs greeting containing user name.",
      },
    ],
    starterFiles: {
      "calculator.py": "# Milestone 1: Welcome & User Input\n# Use print() and input() to welcome the user.\n",
    },
    resourceIds: ["res-recipe-model"],
  },
  {
    id: "milestone-calc-2",
    projectId: "project-smart-calculator",
    order: 2,
    title: "Addition Engine",
    objective: "Extend your calculator so it asks for two numbers and prints their sum.",
    criteria: [
      {
        id: "crit-2-num1",
        description: "Prompts for first number with input().",
        contractDescription: "Captures first number via input().",
      },
      {
        id: "crit-2-num2",
        description: "Prompts for second number with input().",
        contractDescription: "Captures second number via input().",
      },
      {
        id: "crit-2-sum",
        description: "Calculates and prints the sum as numbers.",
        contractDescription: "Output contains numerical sum rather than string concatenation.",
      },
    ],
    resourceIds: ["res-input-str-trap", "res-float-conversion"],
  },
  {
    id: "milestone-calc-3",
    projectId: "project-smart-calculator",
    order: 3,
    title: "Multi-Operator Arithmetic Suite",
    objective: "Implement subtraction, multiplication, exact division, floor division, remainder, and power.",
    criteria: [
      {
        id: "crit-3-basic-math",
        description: "Calculates difference (-) and product (*).",
      },
      {
        id: "crit-3-division",
        description: "Calculates true division (/), floor division (//), and remainder (%).",
      },
      {
        id: "crit-3-power",
        description: "Calculates exponentiation (**).",
      },
    ],
    resourceIds: ["res-arithmetic-table"],
  },
  {
    id: "milestone-calc-4",
    projectId: "project-smart-calculator",
    order: 4,
    title: "Formatted Calculation Receipt",
    objective: "Assemble all calculations into a structured, readable terminal summary receipt.",
    criteria: [
      {
        id: "crit-4-format",
        description: "Formats all 7 calculation results in a clean summary block.",
      },
    ],
    resourceIds: ["res-recipe-model"],
  },
];
