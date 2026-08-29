import { Module } from "../types";

export const module01Fundamentals: Module = {
  id: "module-1-fundamentals",
  slug: "python-fundamentals",
  unitNumber: 1,
  title: "Python Fundamentals",
  tagline: "Build a Smart Calculator from scratch using Python fundamentals.",
  description:
    "Master variables, terminal I/O, data types, type conversion, and arithmetic operators by building a real-world CLI Smart Calculator.",
  version: "1.0.0",
  primaryProjectId: "project-smart-calculator",
  conceptIds: [
    "concept-variables",
    "concept-io",
    "concept-data-types",
    "concept-type-conversion",
    "concept-arithmetic",
  ],
  primer: {
    readingMinutes: 3,
    cards: [
      {
        id: "primer-card-1",
        title: "The Recipe Mental Model",
        description:
          "Python reads your code like a cooking recipe: top to bottom, one instruction at a time.",
        diagramType: "recipe",
      },
      {
        id: "primer-card-2",
        title: "Basic Communication",
        description:
          "Use print() to output messages to the terminal screen, and variables to store data for later.",
        diagramType: "io_box",
        codeSnippet: 'user = "Alex"\nprint("Welcome, " + user)',
      },
    ],
    runnableMicroSnippet: {
      initialCode: 'name = "Engineer"\nprint("Ready to build, " + name)\n',
      expectedOutput: "Ready to build, Engineer\n",
    },
  },
  estimatedMinutes: 45,
};
