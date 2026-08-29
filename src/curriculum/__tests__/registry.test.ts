import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  defaultRegistry,
  validateCurriculum,
  CurriculumDataStore,
} from "../index";

describe("Curriculum Registry & Integrity", () => {
  it("should validate default registry without any integrity errors", () => {
    const result = defaultRegistry.validate();
    assert.equal(result.valid, true, `Validation failed with errors: ${result.errors.join(", ")}`);
    assert.equal(result.errors.length, 0);
  });

  it("should resolve the Core Python Learning Path and its modules", () => {
    const path = defaultRegistry.getLearningPath("path-python-core");
    assert.ok(path, "Learning path should exist");
    assert.equal(path?.slug, "python-masterclass");
    assert.equal(path?.moduleIds.length, 1);
    assert.equal(path?.moduleIds[0], "module-1-fundamentals");

    // Lookup by slug
    const pathBySlug = defaultRegistry.getLearningPath("python-masterclass");
    assert.equal(pathBySlug?.id, "path-python-core");
  });

  it("should resolve Module 1 and its primary project", () => {
    const mod = defaultRegistry.getModule("module-1-fundamentals");
    assert.ok(mod, "Module 1 should exist");
    assert.equal(mod?.unitNumber, 1);
    assert.equal(mod?.primaryProjectId, "project-smart-calculator");

    // Primary project resolution
    const project = defaultRegistry.getPrimaryProjectForModule("module-1-fundamentals");
    assert.ok(project, "Primary project should resolve");
    assert.equal(project?.id, "project-smart-calculator");
    assert.equal(project?.slug, "smart-calculator");
    assert.equal(project?.type, "module_project");
  });

  it("should resolve milestones in consecutive order for Smart Calculator", () => {
    const milestones = defaultRegistry.getMilestonesForProject("project-smart-calculator");
    assert.equal(milestones.length, 4);

    assert.equal(milestones[0].id, "milestone-calc-1");
    assert.equal(milestones[0].order, 1);

    assert.equal(milestones[1].id, "milestone-calc-2");
    assert.equal(milestones[1].order, 2);

    assert.equal(milestones[2].id, "milestone-calc-3");
    assert.equal(milestones[2].order, 3);

    assert.equal(milestones[3].id, "milestone-calc-4");
    assert.equal(milestones[3].order, 4);

    // Single milestone lookup
    const m1 = defaultRegistry.getMilestone("milestone-calc-1");
    assert.ok(m1);
    assert.equal(m1?.title, "Welcome Banner & User Input");
    assert.ok(m1?.starterFiles?.["calculator.py"]);
  });

  it("should resolve concepts and resources referenced by milestones", () => {
    const concepts = defaultRegistry.getConceptsForModule("module-1-fundamentals");
    assert.equal(concepts.length, 5);
    const conceptIds = concepts.map((c) => c.id);
    assert.ok(conceptIds.includes("concept-variables"));
    assert.ok(conceptIds.includes("concept-io"));
    assert.ok(conceptIds.includes("concept-data-types"));

    const resources = defaultRegistry.getResourcesForMilestone("milestone-calc-2");
    assert.equal(resources.length, 2);
    assert.equal(resources[0].id, "res-input-str-trap");
    assert.equal(resources[1].id, "res-float-conversion");
  });

  it("should detect duplicate IDs in curriculum data", () => {
    const invalidData: CurriculumDataStore = {
      paths: [
        {
          id: "duplicate-id",
          slug: "path-1",
          title: "Path 1",
          description: "Desc",
          version: "1.0.0",
          difficulty: "beginner",
          moduleIds: ["mod-1"],
        },
        {
          id: "duplicate-id",
          slug: "path-2",
          title: "Path 2",
          description: "Desc",
          version: "1.0.0",
          difficulty: "beginner",
          moduleIds: ["mod-1"],
        },
      ],
      modules: [],
      projects: [],
      milestones: [],
      concepts: [],
      resources: [],
    };

    const result = validateCurriculum(invalidData);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes('Duplicate LearningPath ID detected: "duplicate-id"')));
  });

  it("should detect missing referenced modules and projects", () => {
    const invalidData: CurriculumDataStore = {
      paths: [
        {
          id: "valid-path",
          slug: "valid-path",
          title: "Valid Path",
          description: "Desc",
          version: "1.0.0",
          difficulty: "beginner",
          moduleIds: ["non-existent-module"],
        },
      ],
      modules: [
        {
          id: "mod-with-missing-project",
          slug: "mod-missing-project",
          unitNumber: 1,
          title: "Module",
          description: "Desc",
          version: "1.0.0",
          primaryProjectId: "non-existent-project",
          conceptIds: ["non-existent-concept"],
        },
      ],
      projects: [
        {
          id: "proj-missing-milestones",
          slug: "proj-missing",
          title: "Project",
          version: "1.0.0",
          type: "module_project",
          difficulty: "beginner",
          missionStatement: "Mission",
          outcomePreview: { description: "Preview" },
          milestoneIds: ["non-existent-milestone"],
          conceptIds: [],
          tags: [],
        },
      ],
      milestones: [],
      concepts: [],
      resources: [],
    };

    const result = validateCurriculum(invalidData);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes('references non-existent Module ID: "non-existent-module"')));
    assert.ok(result.errors.some((e) => e.includes('references non-existent primary Project ID: "non-existent-project"')));
    assert.ok(result.errors.some((e) => e.includes('references non-existent Concept ID: "non-existent-concept"')));
    assert.ok(result.errors.some((e) => e.includes('references non-existent Milestone ID: "non-existent-milestone"')));
  });

  it("should detect invalid project types", () => {
    const invalidData: CurriculumDataStore = {
      paths: [],
      modules: [],
      projects: [
        {
          id: "proj-invalid-type",
          slug: "proj-invalid-type",
          title: "Invalid Type",
          version: "1.0.0",
          // @ts-expect-error Testing runtime invalid project type
          type: "invalid_type_here",
          difficulty: "beginner",
          missionStatement: "Mission",
          outcomePreview: { description: "Preview" },
          milestoneIds: [],
          conceptIds: [],
          tags: [],
        },
      ],
      milestones: [],
      concepts: [],
      resources: [],
    };

    const result = validateCurriculum(invalidData);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes("invalid project type")));
  });

  it("should detect milestone order mismatch", () => {
    const invalidData: CurriculumDataStore = {
      paths: [],
      modules: [],
      projects: [
        {
          id: "proj-1",
          slug: "proj-1",
          title: "Project 1",
          version: "1.0.0",
          type: "module_project",
          difficulty: "beginner",
          missionStatement: "Mission",
          outcomePreview: { description: "Preview" },
          milestoneIds: ["m-1", "m-2"],
          conceptIds: [],
          tags: [],
        },
      ],
      milestones: [
        {
          id: "m-1",
          projectId: "proj-1",
          order: 2, // Out of order: starts at 2 instead of 1
          title: "M1",
          objective: "Obj",
          criteria: [],
        },
        {
          id: "m-2",
          projectId: "proj-1",
          order: 1, // Out of order
          title: "M2",
          objective: "Obj",
          criteria: [],
        },
      ],
      concepts: [],
      resources: [],
    };

    const result = validateCurriculum(invalidData);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes("expected consecutive order")));
  });
});
