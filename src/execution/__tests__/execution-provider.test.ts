/**
 * ExecutionProvider Unit Test Suite
 * 
 * Tests provider contracts, lifecycle states, interactive stdin protocols,
 * error encapsulation, timeout handlers, and recovery invariants.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  MockExecutionProvider,
  createExecutionProvider,
  ExecutionEvent,
} from "../index";

describe("Python Execution Provider Contract & Lifecycle", () => {
  it("should initialize from idle to ready state and emit lifecycle events", async () => {
    const provider = new MockExecutionProvider();
    assert.equal(provider.getStatus(), "idle");

    await provider.initialize();

    assert.equal(provider.getStatus(), "ready");
  });

  it("should execute code, stream stdout chunks, and emit completed event", async () => {
    const provider = new MockExecutionProvider({
      stdoutChunks: ["=== SMART CALCULATOR ===\n", "Welcome, Alex!\n"],
    });
    await provider.initialize();

    const events: ExecutionEvent[] = [];
    const result = await provider.run(
      { code: "print('=== SMART CALCULATOR ===')\nprint('Welcome, Alex!')" },
      (ev) => events.push(ev)
    );

    assert.equal(result.status, "completed");
    assert.equal(result.exitCode, 0);
    assert.equal(result.stdout, "=== SMART CALCULATOR ===\nWelcome, Alex!\n");
    assert.equal(result.stderr, "");

    // Verify event sequence: running -> stdout -> stdout -> completed
    assert.equal(events[0]?.type, "running");
    assert.equal(events[1]?.type, "stdout");
    assert.equal(events[2]?.type, "stdout");
    assert.equal(events[3]?.type, "completed");
  });

  it("should handle interactive stdin protocol with single input()", async () => {
    const provider = new MockExecutionProvider({
      inputPrompts: [{ prompt: "What is your name? " }],
      stdoutChunks: ["Hello, Alex!\n"],
    });
    await provider.initialize();

    const events: ExecutionEvent[] = [];
    let receivedPrompt = "";

    const runPromise = provider.run(
      { code: "name = input('What is your name? ')\nprint(f'Hello, {name}!')" },
      (ev) => {
        events.push(ev);
        if (ev.type === "waiting_for_input") {
          receivedPrompt = ev.prompt;
        }
      }
    );

    // Yield to allow event loop to reach waiting_for_input
    await new Promise((r) => setTimeout(r, 10));

    assert.equal(provider.getStatus(), "waiting_for_input");
    assert.equal(receivedPrompt, "What is your name? ");

    // Provide learner input
    await provider.provideStdin("Alex");

    const result = await runPromise;
    assert.equal(result.status, "completed");
    assert.equal(result.stdout, "What is your name? Alex\nHello, Alex!\n");
  });

  it("should handle multiple sequential interactive input() calls in correct order", async () => {
    const provider = new MockExecutionProvider({
      inputPrompts: [
        { prompt: "Enter first number: " },
        { prompt: "Enter second number: " },
      ],
      stdoutChunks: ["Sum: 30.0\n"],
    });
    await provider.initialize();

    const capturedPrompts: string[] = [];
    const runPromise = provider.run(
      { code: "a = float(input('Enter first number: '))\nb = float(input('Enter second number: '))\nprint('Sum:', a + b)" },
      (ev) => {
        if (ev.type === "waiting_for_input") {
          capturedPrompts.push(ev.prompt);
        }
      }
    );

    // 1st input
    await new Promise((r) => setTimeout(r, 10));
    assert.equal(provider.getStatus(), "waiting_for_input");
    assert.equal(capturedPrompts[0], "Enter first number: ");
    await provider.provideStdin("10");

    // 2nd input
    await new Promise((r) => setTimeout(r, 10));
    assert.equal(provider.getStatus(), "waiting_for_input");
    assert.equal(capturedPrompts[1], "Enter second number: ");
    await provider.provideStdin("20");

    const result = await runPromise;
    assert.equal(result.status, "completed");
    assert.equal(
      result.stdout,
      "Enter first number: 10\nEnter second number: 20\nSum: 30.0\n"
    );
  });

  it("should reject provideStdin() when runtime is not waiting for input", async () => {
    const provider = new MockExecutionProvider();
    await provider.initialize();

    await assert.rejects(
      async () => {
        await provider.provideStdin("unexpected input");
      },
      {
        message: "Cannot provide stdin: runtime is not currently waiting for input.",
      }
    );
  });

  it("should capture runtime errors without crashing the provider", async () => {
    const provider = new MockExecutionProvider({
      stdoutChunks: ["Starting calculation...\n"],
      error: {
        name: "NameError",
        message: "name 'undefined_var' is not defined",
        traceback: "Traceback (most recent call last):\n  File 'main.py', line 2, in <module>\nNameError: name 'undefined_var' is not defined\n",
        line: 2,
      },
    });
    await provider.initialize();

    const events: ExecutionEvent[] = [];
    const result = await provider.run(
      { code: "print('Starting calculation...')\nprint(undefined_var)" },
      (ev) => events.push(ev)
    );

    assert.equal(result.status, "runtime_error");
    assert.equal(result.exitCode, 1);
    assert.equal(result.error?.name, "NameError");
    assert.equal(result.error?.line, 2);
    assert.ok(result.error?.traceback.includes("NameError"));

    const errorEvent = events.find((e) => e.type === "runtime_error");
    assert.ok(errorEvent);
  });

  it("should stop execution and recover cleanly for another run", async () => {
    const provider = new MockExecutionProvider({
      hangForever: true,
    });
    await provider.initialize();

    const events: ExecutionEvent[] = [];
    // Start runaway loop
    provider.run({ code: "while True:\n    pass" }, (ev) => events.push(ev));

    assert.equal(provider.getStatus(), "running");

    // Stop runaway code
    await provider.stop();
    assert.equal(provider.getStatus(), "stopped");

    // Re-run with normal code after stopping
    provider.setScenario({ stdoutChunks: ["Recovered successfully!\n"] });
    const nextResult = await provider.run({ code: "print('Recovered successfully!')" });

    assert.equal(nextResult.status, "completed");
    assert.equal(nextResult.stdout, "Recovered successfully!\n");
  });

  it("should allow re-running code after a runtime error", async () => {
    const provider = new MockExecutionProvider({
      error: {
        name: "TypeError",
        message: "unsupported operand type(s) for -: 'str' and 'str'",
        traceback: "TypeError: unsupported operand type(s) for -: 'str' and 'str'",
      },
    });
    await provider.initialize();

    const res1 = await provider.run({ code: "'10' - '5'" });
    assert.equal(res1.status, "runtime_error");

    // Learner fixes their code
    provider.setScenario({ stdoutChunks: ["5.0\n"] });
    const res2 = await provider.run({ code: "float('10') - float('5')" });

    assert.equal(res2.status, "completed");
    assert.equal(res2.stdout, "5.0\n");
  });

  it("should support factory creation and dispose", async () => {
    const provider = createExecutionProvider("mock");
    assert.equal(provider.id, "mock-runner");

    await provider.initialize();
    assert.equal(provider.getStatus(), "ready");

    await provider.dispose();
    assert.equal(provider.getStatus(), "disposed");

    await assert.rejects(
      async () => {
        await provider.run({ code: "print('test')" });
      },
      {
        message: "Cannot execute code: provider is disposed",
      }
    );
  });
});
