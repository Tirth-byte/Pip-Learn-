"use client";

/* eslint-disable react-hooks/purity */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles, Send, Code2, Lightbulb, Zap, Brain, Play, Bug,
  Copy, Check, ChevronRight, HelpCircle, BookOpen, Terminal,
  Database, Globe, Cpu
} from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  codeSnippet?: string;
  timestamp: Date;
  followUps?: string[];
};

type KnowledgeEntry = {
  keywords: string[];
  response: string;
  code?: string;
  followUps: string[];
};

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["list", "lists", "append", "extend", "mutable"],
    response: "A **list** is Python's most versatile ordered, mutable collection. You can store any mix of types and modify them freely. Key operations include `append()`, `extend()`, `insert()`, `remove()`, `pop()`, and slicing with `[start:end:step]`.",
    code: `# Lists are mutable — you can change them
fruits = ["apple", "banana", "cherry"]
fruits.append("date")         # Add to end
fruits.insert(1, "blueberry") # Insert at index 1
fruits.remove("banana")       # Remove by value
popped = fruits.pop()         # Remove & return last

# Slicing
print(fruits[::2])  # Every other element

# List comprehension (Pythonic way)
squares = [x**2 for x in range(10) if x % 2 == 0]
print(squares)  # [0, 4, 16, 36, 64]`,
    followUps: [
      "What is the difference between a list and a tuple?",
      "How do list comprehensions work?",
      "Explain Python's sort() vs sorted()",
    ],
  },
  {
    keywords: ["tuple", "tuples", "immutable", "named tuple"],
    response: "A **tuple** is an ordered, immutable sequence. Once created, you cannot add, remove, or change elements. Tuples are faster than lists, hashable (can be dict keys), and signal 'this data shouldn't change'. Use them for fixed records like coordinates or RGB values.",
    code: `# Tuples are immutable
point = (3, 4)
# point[0] = 10  # ❌ TypeError!

# Named tuples for readability
from collections import namedtuple
Color = namedtuple("Color", ["r", "g", "b"])
red = Color(r=255, g=0, b=0)
print(red.r)  # 255

# Tuple unpacking
x, y = point
lat, lon, *_ = (40.7128, -74.0060, "New York", "USA")`,
    followUps: [
      "When should I use a list vs tuple?",
      "How do I use namedtuple?",
      "What are Python sets?",
    ],
  },
  {
    keywords: ["dictionary", "dict", "key", "value", "hashmap"],
    response: "Python **dictionaries** (dicts) are hash maps — O(1) average lookup, insertion, and deletion. Since Python 3.7+ they maintain insertion order. Use `.get()` instead of `[]` to avoid KeyError on missing keys.",
    code: `# Basic dict operations
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Safe access with default
age = person.get("age", 0)

# Dict comprehension
squares = {x: x**2 for x in range(5)}

# Merge dicts (Python 3.9+)
defaults = {"theme": "dark", "lang": "en"}
user_prefs = {"lang": "fr"}
merged = defaults | user_prefs  # user_prefs wins

# Iterate
for key, value in person.items():
    print(f"{key}: {value}")

# defaultdict for auto-initializing values
from collections import defaultdict
word_count = defaultdict(int)
for word in "the cat sat on the mat".split():
    word_count[word] += 1`,
    followUps: [
      "What is the difference between dict.get() and dict[]?",
      "How does Python's Counter work?",
      "Explain defaultdict vs regular dict",
    ],
  },
  {
    keywords: ["loop", "for", "while", "range", "iterate", "iteration"],
    response: "Python offers powerful iteration tools. `for` loops work on any iterable (lists, strings, dicts, generators). Use `range()` for numeric sequences. Python idioms include `enumerate()`, `zip()`, and `itertools` for advanced looping.",
    code: `# for loop with enumerate (index + value)
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# zip — iterate multiple at once
names = ["Alice", "Bob"]
scores = [95, 87]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# while loop with break/continue
count = 0
while True:
    count += 1
    if count == 3:
        continue  # Skip this iteration
    if count > 5:
        break     # Exit loop
    print(count)

# List comprehension (one-liner loop)
even_squares = [x**2 for x in range(20) if x % 2 == 0]`,
    followUps: [
      "What is a generator and how is it different from a list?",
      "How do I use itertools for advanced iteration?",
      "Explain break, continue, and else in loops",
    ],
  },
  {
    keywords: ["function", "def", "return", "argument", "parameter", "lambda"],
    response: "Functions in Python are first-class objects — you can pass them as arguments, return them from other functions, and assign them to variables. Use `*args` for variable positional arguments and `**kwargs` for keyword arguments.",
    code: `# Basic function with type hints (Python 3.9+)
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

# *args and **kwargs
def flexible(*args: int, **kwargs: str) -> None:
    print(f"Positional: {args}")
    print(f"Keyword: {kwargs}")

flexible(1, 2, 3, color="red", size="large")

# Lambda (anonymous inline function)
square = lambda x: x ** 2
sorted_data = sorted([(1, "b"), (3, "a")], key=lambda t: t[1])

# Higher-order functions
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
doubled = list(map(lambda x: x * 2, numbers))`,
    followUps: [
      "What are decorators in Python?",
      "How do closures work?",
      "Explain *args and **kwargs in depth",
    ],
  },
  {
    keywords: ["class", "oop", "object", "inherit", "inheritance", "method", "__init__", "self"],
    response: "Python is a fully object-oriented language. Classes define blueprints for objects. Key OOP pillars: **Encapsulation** (bundling data + methods), **Inheritance** (parent → child classes), **Polymorphism** (same interface, different behavior), and **Abstraction** (hiding implementation).",
    code: `class Animal:
    species_count = 0  # Class variable (shared)

    def __init__(self, name: str, sound: str) -> None:
        self.name = name        # Instance variable
        self._sound = sound     # 'Protected' by convention
        Animal.species_count += 1

    def speak(self) -> str:
        return f"{self.name} says {self._sound}!"

    def __repr__(self) -> str:
        return f"Animal(name={self.name!r})"

class Dog(Animal):  # Inheritance
    def __init__(self, name: str, breed: str) -> None:
        super().__init__(name, "Woof")  # Call parent
        self.breed = breed

    def speak(self) -> str:  # Polymorphism (override)
        return f"{self.name} ({self.breed}) barks!"

dog = Dog("Rex", "Labrador")
print(dog.speak())          # Rex (Labrador) barks!
print(Animal.species_count) # 1`,
    followUps: [
      "What are dunder/magic methods in Python?",
      "How do class methods vs static methods differ?",
      "What is a Python dataclass?",
    ],
  },
  {
    keywords: ["decorator", "decorators", "@", "wrapper", "functools"],
    response: "**Decorators** are functions that wrap other functions to modify or extend their behavior — without changing the original code. They're Python's answer to the Decorator design pattern. Common uses: logging, caching, auth checks, timing.",
    code: `import functools
import time

# Basic decorator pattern
def timer(func):
    @functools.wraps(func)  # Preserves original function metadata
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer  # Sugar for: my_func = timer(my_func)
def slow_function():
    time.sleep(0.1)
    return "done"

slow_function()  # Prints: slow_function took 0.1001s

# Decorator with arguments
def repeat(n: int):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")`,
    followUps: [
      "What is @functools.wraps and why is it important?",
      "How do I write a class-based decorator?",
      "Explain Python's @property decorator",
    ],
  },
  {
    keywords: ["generator", "yield", "generator expression", "lazy"],
    response: "**Generators** use `yield` to produce values lazily — they don't compute everything at once. This makes them memory-efficient for large datasets. A generator function returns a generator object that can be iterated once.",
    code: `# Generator function
def fibonacci():
    a, b = 0, 1
    while True:
        yield a       # Pause here, return value
        a, b = b, a + b

gen = fibonacci()
first_10 = [next(gen) for _ in range(10)]
print(first_10)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Generator expression (like list comprehension but lazy)
squares_gen = (x**2 for x in range(1_000_000))
print(next(squares_gen))  # 0 — computed on demand!

# Using in for loop
def count_up(limit: int):
    n = 0
    while n < limit:
        yield n
        n += 1

for num in count_up(5):
    print(num)`,
    followUps: [
      "What is the difference between yield and return?",
      "How do I use itertools with generators?",
      "What are async generators?",
    ],
  },
  {
    keywords: ["async", "await", "asyncio", "coroutine", "concurrent", "event loop"],
    response: "**AsyncIO** enables concurrent I/O-bound operations without threads. `async def` defines a coroutine, `await` suspends it while waiting for I/O. Perfect for web scraping, API calls, database queries, and network servers.",
    code: `import asyncio
import time

async def fetch_data(url: str, delay: float) -> str:
    """Simulates an async HTTP request"""
    await asyncio.sleep(delay)  # Non-blocking wait
    return f"Data from {url}"

async def main():
    start = time.perf_counter()

    # Run concurrently with asyncio.gather()
    results = await asyncio.gather(
        fetch_data("api.example.com/users", 1.0),
        fetch_data("api.example.com/posts", 1.5),
        fetch_data("api.example.com/comments", 0.5),
    )
    # All 3 run concurrently — total ~1.5s, not 3.0s!

    elapsed = time.perf_counter() - start
    print(f"Done in {elapsed:.2f}s")
    for result in results:
        print(result)

asyncio.run(main())`,
    followUps: [
      "What is the difference between threading and asyncio?",
      "How do I use aiohttp for async HTTP requests?",
      "What are async context managers?",
    ],
  },
  {
    keywords: ["type hint", "type hints", "typing", "annotations", "mypy", "protocol"],
    response: "**Type hints** (PEP 484+) make Python code self-documenting and enable static analysis tools like mypy and pyright. They don't affect runtime but dramatically improve IDE support and catch bugs early. Python 3.10+ supports union types with `|`.",
    code: `from typing import Optional, Union, TypeVar
from collections.abc import Callable, Sequence

# Basic type hints
def greet(name: str, times: int = 1) -> str:
    return (name + "! ") * times

# Python 3.10+ union syntax (preferred)
def process(value: int | str | None) -> str:
    match value:
        case None:
            return "nothing"
        case int(n):
            return f"integer: {n}"
        case str(s):
            return f"string: {s}"

# Generic functions with TypeVar
T = TypeVar("T")
def first(items: Sequence[T]) -> T | None:
    return items[0] if items else None

# Callable type hints
Processor = Callable[[str, int], bool]

def apply(data: str, count: int, fn: Processor) -> bool:
    return fn(data, count)`,
    followUps: [
      "What is Protocol in Python typing?",
      "How do I use mypy for static type checking?",
      "What is a TypeVar and when do I use it?",
    ],
  },
  {
    keywords: ["dataclass", "dataclasses", "@dataclass", "field"],
    response: "**Dataclasses** (Python 3.7+) auto-generate `__init__`, `__repr__`, and `__eq__` based on class attributes. They're the modern replacement for writing boilerplate data-holding classes. Use `field()` for mutable defaults.",
    code: `from dataclasses import dataclass, field
from typing import ClassVar

@dataclass(order=True, frozen=True)  # frozen = immutable
class Point:
    x: float
    y: float

    def distance_from_origin(self) -> float:
        return (self.x**2 + self.y**2) ** 0.5

@dataclass
class Student:
    name: str
    grade: int
    scores: list[int] = field(default_factory=list)  # mutable default!
    _count: ClassVar[int] = 0  # Class variable

    def __post_init__(self):
        Student._count += 1
        self.name = self.name.title()  # Normalize name

    @property
    def average(self) -> float:
        return sum(self.scores) / len(self.scores) if self.scores else 0.0

s = Student("alice", 10, [85, 92, 78])
print(s)  # Student(name='Alice', grade=10, scores=[85, 92, 78])
print(s.average)  # 85.0`,
    followUps: [
      "What is the difference between dataclass and NamedTuple?",
      "How do frozen dataclasses compare to regular ones?",
      "When should I use Pydantic instead of dataclasses?",
    ],
  },
  {
    keywords: ["error", "exception", "try", "except", "raise", "traceback", "debug"],
    response: "Python uses exceptions for error handling. The `try/except/else/finally` pattern gives you fine-grained control. Always catch specific exceptions rather than bare `except:`. Use `raise from` to preserve the original traceback.",
    code: `# Specific exception handling (preferred)
def safe_divide(a: float, b: float) -> float:
    try:
        result = a / b
    except ZeroDivisionError:
        raise ValueError(f"Cannot divide {a} by zero") from None
    except TypeError as e:
        raise TypeError(f"Expected numbers, got {type(a)}, {type(b)}") from e
    else:
        # Runs only if no exception was raised
        print(f"Success: {a} / {b} = {result}")
        return result
    finally:
        # Always runs — good for cleanup
        print("Division attempted")

# Custom exception classes
class ValidationError(ValueError):
    def __init__(self, field: str, message: str) -> None:
        super().__init__(f"Validation failed for '{field}': {message}")
        self.field = field

# Context manager for resource cleanup
with open("data.txt", "r") as f:
    content = f.read()  # File auto-closed after block`,
    followUps: [
      "What is the difference between Exception and BaseException?",
      "How do I create custom exception hierarchies?",
      "What does 'raise from' do in Python?",
    ],
  },
  {
    keywords: ["comprehension", "list comprehension", "dict comprehension", "set comprehension"],
    response: "**Comprehensions** are Pythonic one-liner expressions for creating collections. They're typically faster than equivalent for-loops and more readable. Available for lists, dicts, sets, and generators.",
    code: `# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# Nested comprehension (matrix flatten)
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = [num for row in matrix for num in row]

# Dict comprehension
word_lengths = {word: len(word) for word in ["Python", "is", "great"]}

# Set comprehension (unique values only)
unique_lengths = {len(word) for word in ["hi", "bye", "ok", "yes"]}

# Generator expression (lazy — use when iterating once)
total = sum(x**2 for x in range(1000))  # No list created!

# Conditional expression (ternary)
status = "even" if 4 % 2 == 0 else "odd"`,
    followUps: [
      "When should I use a generator expression vs a list comprehension?",
      "How do walrus operators work with comprehensions?",
      "Are comprehensions always faster than for loops?",
    ],
  },
  {
    keywords: ["f-string", "fstring", "format", "string formatting", "f string"],
    response: "**f-strings** (formatted string literals, Python 3.6+) are the fastest and most readable way to format strings. Python 3.12 added even more power with nested expressions. Use `!r` for repr, `!s` for str, `:` for format specs.",
    code: `name = "Alice"
score = 98.567
items = ["apple", "banana"]

# Basic f-string
print(f"Hello, {name}!")  # Hello, Alice!

# Format specifiers
print(f"Score: {score:.2f}")      # Score: 98.57
print(f"Hex: {255:#010x}")        # Hex: 0x000000ff
print(f"Width: {name:>10}")       # '     Alice'
print(f"Thousand sep: {1000000:,}") # 1,000,000

# Expressions inside {}
print(f"Double: {score * 2:.1f}")   # Double: 197.1
print(f"Upper: {name.upper()!r}")  # Upper: 'ALICE'

# Python 3.12: nested f-strings
print(f"{ {x: x**2 for x in range(3)} }")  # {0: 0, 1: 1, 2: 4}

# Debugging with = (Python 3.8+)
value = 42
print(f"{value = }")  # value = 42`,
    followUps: [
      "What is the difference between f-strings and .format()?",
      "How do I use Python's string Template class?",
      "Explain Python's __format__ method",
    ],
  },
  {
    keywords: ["file", "files", "read", "write", "open", "io", "csv", "json"],
    response: "Python's built-in `open()` function handles file I/O. Always use a `with` statement (context manager) to ensure files are properly closed even if an error occurs. For structured data, use `json` or `csv` modules.",
    code: `import json
import csv
from pathlib import Path

# Text file — using Path (modern approach)
path = Path("data.txt")

# Write
path.write_text("Hello, Python!\\nLine 2", encoding="utf-8")

# Read all at once
content = path.read_text(encoding="utf-8")

# Read line by line (memory efficient for large files)
with open(path, "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())

# JSON (serialize/deserialize)
data = {"name": "Alice", "scores": [95, 87, 92]}
json_str = json.dumps(data, indent=2)
parsed = json.loads(json_str)
Path("data.json").write_text(json_str)

# CSV
with open("data.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "age"])
    writer.writeheader()
    writer.writerow({"name": "Alice", "age": 30})`,
    followUps: [
      "What is the pathlib module and how does it compare to os.path?",
      "How do I handle large files without loading them into memory?",
      "How do I work with binary files in Python?",
    ],
  },
  {
    keywords: ["match", "pattern matching", "structural pattern", "switch", "case"],
    response: "**Structural Pattern Matching** (Python 3.10+) via `match`/`case` is Python's answer to switch statements — but far more powerful. It matches on values, types, shapes of data, and can destructure sequences and mappings.",
    code: `# Basic value matching
def describe_number(n: int) -> str:
    match n:
        case 0:
            return "zero"
        case 1 | 2 | 3:      # OR patterns
            return "small"
        case n if n < 0:      # Guard clause
            return f"negative: {n}"
        case _:               # Wildcard (default)
            return "large"

# Structural matching on types and shapes
def process(command):
    match command:
        case {"action": "move", "x": x, "y": y}:
            print(f"Moving to ({x}, {y})")
        case {"action": "quit"}:
            print("Quitting")
        case [first, *rest]:
            print(f"List starting with {first}, rest: {rest}")
        case str(s):
            print(f"String: {s}")
        case _:
            print(f"Unknown: {command}")`,
    followUps: [
      "How does Python pattern matching compare to switch in other languages?",
      "What are guard clauses in pattern matching?",
      "How do I match on class instances?",
    ],
  },
  {
    keywords: ["pep8", "style", "code style", "linting", "pylint", "black", "isort", "ruff"],
    response: "**PEP 8** is Python's official style guide. Following it makes your code readable and consistent with the wider Python community. Modern tools like **Ruff** (blazing fast), Black (auto-formatter), and mypy (type checker) enforce style automatically.",
    code: `# PEP 8 Key Rules:

# ✅ Naming conventions
snake_case_variable = 42        # Variables & functions
CONSTANT_VALUE = 3.14159        # Constants
class CamelCaseClass:           # Classes
    pass

# ✅ 4 spaces per indent level (never tabs)
def well_formatted_function(
    long_param_one: str,
    long_param_two: int,
) -> bool:
    return len(long_param_one) > long_param_two

# ✅ Max 79 chars per line (PEP 8) or 88 (Black's preference)
# ✅ Two blank lines between top-level definitions
# ✅ One blank line between methods in a class

# ✅ Imports: stdlib → third-party → local
import os                   # stdlib
import sys                  # stdlib
# import requests           # third-party (separate section)
# from myapp import utils   # local (separate section)

# ❌ Avoid
x=1; y=2  # Multiple statements on one line
l = [1,2,3]  # Space after commas is required`,
    followUps: [
      "What is the difference between Black and autopep8?",
      "How do I set up Ruff in my project?",
      "What does a good Python docstring look like?",
    ],
  },
  {
    keywords: ["import", "module", "package", "pip", "virtual env", "venv", "__init__"],
    response: "Python's module system allows you to organize code into reusable files and packages. Use `import` for standard modules, `pip install` for third-party packages, and always work inside a virtual environment to isolate project dependencies.",
    code: `# ===== Module system =====

# Importing
import math                     # Full module
from pathlib import Path        # Specific class
from typing import Optional     # From typing
import numpy as np              # With alias

# __all__ controls what 'from module import *' exports
__all__ = ["PublicClass", "public_function"]

# ===== Virtual environments =====
# Create:  python -m venv .venv
# Activate (macOS/Linux): source .venv/bin/activate
# Activate (Windows):     .venv\\Scripts\\activate
# Install packages:       pip install requests pandas

# requirements.txt (freeze dependencies)
# pip freeze > requirements.txt
# pip install -r requirements.txt

# ===== Package structure =====
# my_package/
# ├── __init__.py     # Makes it a package
# ├── core.py
# └── utils/
#     ├── __init__.py
#     └── helpers.py`,
    followUps: [
      "What is the difference between a module and a package?",
      "How do I publish a package to PyPI?",
      "What is __init__.py for?",
    ],
  },
  {
    keywords: ["walrus", ":=", "assignment expression", "named expression"],
    response: "The **walrus operator** (`:=`) introduced in Python 3.8 allows assignment within an expression. It's called an assignment expression or named expression. Particularly useful in `while` loops and comprehensions to avoid redundant function calls.",
    code: `# Without walrus — reads file twice or uses temp variable
data = file.read()
if data:
    process(data)

# With walrus — clean one-liner
if data := file.read():
    process(data)

# In while loops (classic use case)
import re
text = "price: $42.50, discount: $5.00"
pattern = re.compile(r"\\$(\\d+\\.\\d+)")

# Without walrus:
match = pattern.search(text)
while match:
    print(match.group())
    text = text[match.end():]
    match = pattern.search(text)

# With walrus:
while match := pattern.search(text):
    print(match.group())
    text = text[match.end():]

# In comprehensions — avoid calling expensive fn twice
results = [cleaned for item in data
           if (cleaned := expensive_process(item)) is not None]`,
    followUps: [
      "What are the best use cases for the walrus operator?",
      "Does the walrus operator have any gotchas?",
      "How is := different from regular = assignment?",
    ],
  },
  {
    keywords: ["context manager", "with", "__enter__", "__exit__", "contextlib"],
    response: "**Context managers** use the `with` statement to set up and tear down resources reliably — even if an error occurs. Built-in examples: `open()`, `threading.Lock()`, `decimal.localcontext()`. You can write your own using a class or `@contextmanager`.",
    code: `from contextlib import contextmanager
import time

# Class-based context manager
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self  # Available as 'as' target

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"Elapsed: {self.elapsed:.4f}s")
        return False  # Don't suppress exceptions

with Timer() as t:
    time.sleep(0.1)
print(f"Total: {t.elapsed:.4f}s")

# Generator-based (simpler with @contextmanager)
@contextmanager
def managed_resource(name: str):
    print(f"Acquiring {name}")
    try:
        yield name  # Control goes to 'with' block here
    finally:
        print(f"Releasing {name}")  # Always runs

with managed_resource("database") as db:
    print(f"Using {db}")`,
    followUps: [
      "What is contextlib.suppress?",
      "How do async context managers work?",
      "What is contextlib.ExitStack?",
    ],
  },
];

const quickPrompts = [
  { label: "List vs Tuple", icon: Code2, color: "notion-tag-blue", query: "Explain the difference between a list and a tuple in Python." },
  { label: "For Loops", icon: Zap, color: "notion-tag-green", query: "How do Python for loops work with range() and enumerate()?" },
  { label: "OOP Concepts", icon: Brain, color: "notion-tag-purple", query: "What is object-oriented programming in Python? Explain classes and inheritance." },
  { label: "Decorators", icon: Sparkles, color: "notion-tag-orange", query: "How do Python decorators work? Show me an example." },
  { label: "AsyncIO", icon: Cpu, color: "notion-tag-pink", query: "Explain asyncio and async/await in Python." },
  { label: "Type Hints", icon: BookOpen, color: "notion-tag-gray", query: "How do Python type hints work?" },
  { label: "Error Handling", icon: Bug, color: "notion-tag-red", query: "How do I handle exceptions properly in Python with try/except?" },
  { label: "f-strings", icon: Terminal, color: "notion-tag-yellow", query: "Show me all the ways to use Python f-strings." },
];

function findResponse(query: string): KnowledgeEntry | null {
  const lower = query.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce((acc, kw) => {
      return acc + (lower.includes(kw) ? kw.length : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  return bestScore > 0 ? bestMatch : null;
}

export default function AIMentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I&apos;m your **Pip AI Mentor** — your Python expert available 24/7. I can explain concepts, review code, debug errors, and guide you through algorithms.\n\nWhat would you like to learn about Python today?",
      timestamp: new Date(),
      followUps: [
        "Explain Python decorators with examples",
        "How do async/await and asyncio work?",
        "What is the difference between a list and a generator?",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const entry = findResponse(query);

      let aiText: string;
      let snippet: string | undefined;
      let followUps: string[];

      if (entry) {
        aiText = entry.response;
        snippet = entry.code;
        followUps = entry.followUps;
      } else {
        aiText = `Great question! Here are some Python best practices to keep in mind:\n\n• Follow **PEP 8** style guidelines for readable code\n• Use **type hints** to document expected types\n• Write **docstrings** for all functions and classes\n• Prefer **list/dict comprehensions** over manual loops\n• Use **context managers** (with statements) for resource management\n• Run **pytest** for automated testing\n\nTry asking me about a specific Python topic like decorators, async/await, OOP, generators, or type hints!`;
        snippet = undefined;
        followUps = [
          "Explain Python decorators",
          "How do generators work?",
          "What are type hints in Python?",
        ];
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        codeSnippet: snippet,
        timestamp: new Date(),
        followUps,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 350 + Math.random() * 200);
  };

  const handleCopySnippet = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast("Code snippet copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast("Couldn't access clipboard");
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-4xl mx-auto w-full pb-4 px-6 text-[#37352F] flex flex-col h-[calc(100vh-5.5rem)] select-none bg-white">
      {/* Page Header */}
      <div className="pt-6 pb-3 border-b border-[rgba(55,53,47,0.09)] mb-4 shrink-0">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="size-10 rounded-xl bg-[#F0EBF9] border border-[#E0C7FA] flex items-center justify-center shrink-0">
            <Sparkles className="size-5 text-[#8846C7] stroke-[1.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#37352F]">Pip AI Mentor</h1>
            <p className="text-xs text-[rgba(55,53,47,0.65)]">
              Ask questions, get debugging hints, or request code reviews in real-time.
            </p>
          </div>
          <span className="notion-tag notion-tag-purple ml-auto">{knowledgeBase.length} topics</span>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 shrink-0">
        {quickPrompts.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.label}
              onClick={() => handleSend(p.query)}
              className={`notion-tag ${p.color} hover:opacity-80 cursor-pointer py-1.5 px-3 text-xs transition-opacity flex items-center gap-1.5 font-medium whitespace-nowrap`}
            >
              <Icon className="size-3.5 stroke-[1.5]" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0 text-xs">
        {messages.map((m) => (
          <div key={m.id} className="space-y-2">
            <div className={`p-3.5 rounded-xl border ${
              m.sender === "ai" ? "notion-callout-gray border-[rgba(55,53,47,0.09)]" : "bg-[#F7F7F5] border-[rgba(55,53,47,0.12)]"
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 font-semibold text-xs">
                  {m.sender === "ai" ? (
                    <>
                      <Sparkles className="size-3.5 text-[#8846C7] stroke-[1.5]" />
                      <span className="text-[#4D2875]">Pip AI Mentor</span>
                    </>
                  ) : (
                    <>
                      <span className="size-4 rounded-full bg-[#37352F] text-white flex items-center justify-center text-[10px] font-bold">U</span>
                      <span>You</span>
                    </>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{formatTime(m.timestamp)}</span>
              </div>

              <div className="text-xs leading-relaxed text-[#37352F] whitespace-pre-line">
                {m.text.replace(/\*\*(.*?)\*\*/g, "$1")}
              </div>

              {m.codeSnippet && (
                <div className="mt-3 bg-[#1E1E2E] border border-white/10 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-[#262640]">
                    <div className="flex items-center gap-2 text-[10px] text-[rgba(255,255,255,0.5)]">
                      <Code2 className="size-3 stroke-[1.5]" />
                      <span className="font-mono">Python 3.12</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/sandbox?code=${encodeURIComponent(m.codeSnippet)}`}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Play className="size-3 fill-current" />
                        Run in Sandbox
                      </Link>
                      <button
                        onClick={() => handleCopySnippet(m.codeSnippet!, m.id)}
                        className="inline-flex items-center gap-1 text-[10px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
                      >
                        {copiedId === m.id ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                        {copiedId === m.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 overflow-x-auto font-mono text-[11px] leading-6 text-[#ABB2BF] whitespace-pre">
                    <code>{m.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {m.followUps && m.followUps.length > 0 && m.sender === "ai" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.followUps.map((fu) => (
                    <button
                      key={fu}
                      onClick={() => handleSend(fu)}
                      className="flex items-center gap-1 text-[10px] font-medium text-[#2383E2] hover:text-[#1D6FBE] bg-[#E8F3F7] hover:bg-[#D5E8F0] px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                      <ChevronRight className="size-3" />
                      {fu}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="notion-callout notion-callout-gray text-xs flex items-center gap-2">
            <Sparkles className="size-3.5 text-[#8846C7] stroke-[1.5] animate-pulse" />
            <span className="text-[#37352F]">Pip AI is thinking</span>
            <span className="flex gap-0.5">
              <span className="w-1 h-1 bg-[#8846C7] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1 h-1 bg-[#8846C7] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1 h-1 bg-[#8846C7] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="mt-3 shrink-0">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2 bg-[#F7F7F5] border border-[rgba(55,53,47,0.16)] rounded-lg p-1.5 focus-within:bg-white focus-within:border-[#2383E2] transition-colors"
        >
          <Sparkles className="size-4 text-[#8846C7] ml-2 shrink-0 stroke-[1.5]" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Pip AI anything about Python... (decorators, async, OOP, type hints...)"
            className="flex-1 bg-transparent text-xs text-[#37352F] outline-none px-2 font-medium placeholder:text-[rgba(55,53,47,0.4)]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="notion-btn-primary h-7 px-3 text-xs shrink-0 disabled:opacity-40 flex items-center gap-1"
          >
            <Send className="size-3 stroke-[1.5]" />
            <span>Ask</span>
          </button>
        </form>
        <p className="text-[10px] text-gray-400 mt-1.5 text-center">
          Pip AI covers {knowledgeBase.length} Python topics • Press Enter to send
        </p>
      </div>
    </div>
  );
}
