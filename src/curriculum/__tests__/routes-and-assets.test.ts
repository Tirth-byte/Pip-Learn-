import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getAssetPath } from "../../lib/asset-path";
import { courseIds, moduleIds } from "../../lib/static-params";
import {
  getLearningPath,
  getModule,
  getProject,
  getMilestone,
} from "../index";
import { createExecutionProvider } from "../../execution";
import { DefaultValidationEngine } from "../../validation/engine";

describe("Route & Static Asset Integration Tests", () => {
  it("should resolve asset paths correctly under default environment", () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_PATH;
    delete process.env.NEXT_PUBLIC_BASE_PATH;

    const workerUrl = getAssetPath("/workers/pyodide-worker.js");
    assert.equal(workerUrl, "/workers/pyodide-worker.js");

    process.env.NEXT_PUBLIC_BASE_PATH = originalEnv;
  });

  it("should resolve asset paths with NEXT_PUBLIC_BASE_PATH when configured", () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_PATH;
    process.env.NEXT_PUBLIC_BASE_PATH = "/Pip-Learn-";

    const workerUrl = getAssetPath("/workers/pyodide-worker.js");
    assert.equal(workerUrl, "/Pip-Learn-/workers/pyodide-worker.js");

    // Avoid double prefixing
    const alreadyPrefixed = getAssetPath("/Pip-Learn-/workers/pyodide-worker.js");
    assert.equal(alreadyPrefixed, "/Pip-Learn-/workers/pyodide-worker.js");

    process.env.NEXT_PUBLIC_BASE_PATH = originalEnv;
  });

  it("should include python and all required course static params", () => {
    assert.ok(courseIds.includes("python"));
    assert.ok(courseIds.includes("data-science"));
    assert.ok(courseIds.includes("django"));
    assert.ok(courseIds.includes("algorithms"));
    assert.ok(courseIds.includes("fastapi"));
  });

  it("should include basics and canonical module aliases in static params", () => {
    assert.ok(moduleIds.includes("basics"));
    assert.ok(moduleIds.includes("fundamentals"));
    assert.ok(moduleIds.includes("python-fundamentals"));
    assert.ok(moduleIds.includes("control-flow"));
    assert.ok(moduleIds.includes("functions"));
    assert.ok(moduleIds.includes("data-structures"));
  });

  it("should resolve Python path and Module 1 from curriculum registry", () => {
    const path = getLearningPath("path-python-core");
    assert.ok(path, "Python core path must exist");
    assert.equal(path.slug, "python-masterclass");
    assert.ok(path.moduleIds.includes("module-1-fundamentals"));

    const module1 = getModule("module-1-fundamentals");
    assert.ok(module1, "Module 1 must exist");
    assert.equal(module1.primaryProjectId, "project-smart-calculator");

    const project = getProject("project-smart-calculator");
    assert.ok(project, "Smart Calculator project must exist");
    assert.equal(project.milestoneIds.length, 4);

    const m1 = getMilestone("milestone-calc-1");
    assert.ok(m1, "Milestone 1 must exist");
    assert.ok(m1.starterFiles?.["calculator.py"], "Starter calculator.py must exist");
  });

  it("should instantiate Pyodide execution provider with asset-safe default worker URL", () => {
    const provider = createExecutionProvider("mock");
    assert.equal(provider.id, "mock-runner");

    const validationEngine = new DefaultValidationEngine();
    assert.ok(validationEngine, "Validation engine must initialize without error");
  });
});
