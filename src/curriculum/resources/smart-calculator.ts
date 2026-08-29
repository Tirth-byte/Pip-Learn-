import { Resource } from "../types";

export const smartCalculatorResources: Resource[] = [
  {
    id: "res-recipe-model",
    title: "The Recipe Mental Model",
    category: "concept",
    conceptId: "concept-variables",
    summary: "Python executes instructions sequentially from top to bottom.",
    content: "Think of a Python script as a cooking recipe: each line is executed in exact order.",
  },
  {
    id: "res-input-str-trap",
    title: "Why input() Always Returns Text",
    category: "common_mistake",
    conceptId: "concept-type-conversion",
    summary: "input() returns string data. Adding '10' + '20' yields '1020'.",
    codeSnippet: "# Problem:\nnum = input('Number: ')  # '10'\n# Solution:\nnum = float(input('Number: '))  # 10.0",
  },
  {
    id: "res-float-conversion",
    title: "Type Casting with float() and int()",
    category: "syntax",
    conceptId: "concept-type-conversion",
    summary: "Wrap textual numbers with float() to enable decimal calculations.",
    codeSnippet: "price = float(input('Enter price: '))\nquantity = int(input('Enter quantity: '))",
  },
  {
    id: "res-arithmetic-table",
    title: "Python Arithmetic Operators Reference",
    category: "syntax",
    conceptId: "concept-arithmetic",
    summary: "Overview of +, -, *, /, //, %, ** operators.",
    content: "Exact division (/) produces floats; floor division (//) truncates decimals; modulus (%) calculates remainder.",
  },
];
