import {
  LearningPath,
  Module,
  Project,
  Milestone,
  Concept,
  Resource,
  ProjectType,
} from "./types";

export interface CurriculumDataStore {
  paths: LearningPath[];
  modules: Module[];
  projects: Project[];
  milestones: Milestone[];
  concepts: Concept[];
  resources: Resource[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const VALID_PROJECT_TYPES: Set<ProjectType> = new Set([
  "module_project",
  "practice_project",
  "challenge_project",
  "portfolio_project",
  "capstone_project",
]);

/**
 * Validates the referential and structural integrity of the curriculum registry.
 * This runs at development and test time to detect malformed relationships early.
 */
export function validateCurriculum(data: CurriculumDataStore): ValidationResult {
  const errors: string[] = [];

  // 1. Check for duplicate IDs across entity tables
  function checkUniqueIds(items: { id: string }[], entityName: string) {
    const seen = new Set<string>();
    for (const item of items) {
      if (!item.id || typeof item.id !== "string") {
        errors.push(`${entityName} item contains missing or invalid id.`);
        continue;
      }
      if (seen.has(item.id)) {
        errors.push(`Duplicate ${entityName} ID detected: "${item.id}"`);
      }
      seen.add(item.id);
    }
  }

  checkUniqueIds(data.paths, "LearningPath");
  checkUniqueIds(data.modules, "Module");
  checkUniqueIds(data.projects, "Project");
  checkUniqueIds(data.milestones, "Milestone");
  checkUniqueIds(data.concepts, "Concept");
  checkUniqueIds(data.resources, "Resource");

  // Create lookup maps
  const moduleMap = new Map(data.modules.map((m) => [m.id, m]));
  const projectMap = new Map(data.projects.map((p) => [p.id, p]));
  const milestoneMap = new Map(data.milestones.map((m) => [m.id, m]));
  const conceptMap = new Map(data.concepts.map((c) => [c.id, c]));
  const resourceMap = new Map(data.resources.map((r) => [r.id, r]));

  // 2. Validate Learning Paths
  for (const path of data.paths) {
    if (!path.version) {
      errors.push(`LearningPath "${path.id}" is missing a version string.`);
    }
    if (!path.moduleIds || path.moduleIds.length === 0) {
      errors.push(`LearningPath "${path.id}" has no module references.`);
    } else {
      for (const modId of path.moduleIds) {
        if (!moduleMap.has(modId)) {
          errors.push(
            `LearningPath "${path.id}" references non-existent Module ID: "${modId}"`
          );
        }
      }
    }
    if (path.capstoneProjectId && !projectMap.has(path.capstoneProjectId)) {
      errors.push(
        `LearningPath "${path.id}" references non-existent Capstone Project ID: "${path.capstoneProjectId}"`
      );
    }
  }

  // 3. Validate Modules
  for (const mod of data.modules) {
    if (!mod.version) {
      errors.push(`Module "${mod.id}" is missing a version string.`);
    }
    if (!mod.primaryProjectId) {
      errors.push(`Module "${mod.id}" is missing primaryProjectId.`);
    } else if (!projectMap.has(mod.primaryProjectId)) {
      errors.push(
        `Module "${mod.id}" references non-existent primary Project ID: "${mod.primaryProjectId}"`
      );
    }

    if (mod.supplementaryProjectIds) {
      for (const suppId of mod.supplementaryProjectIds) {
        if (!projectMap.has(suppId)) {
          errors.push(
            `Module "${mod.id}" references non-existent supplementary Project ID: "${suppId}"`
          );
        }
      }
    }

    for (const conceptId of mod.conceptIds) {
      if (!conceptMap.has(conceptId)) {
        errors.push(
          `Module "${mod.id}" references non-existent Concept ID: "${conceptId}"`
        );
      }
    }
  }

  // 4. Validate Projects
  for (const project of data.projects) {
    if (!project.version) {
      errors.push(`Project "${project.id}" is missing a version string.`);
    }
    if (!VALID_PROJECT_TYPES.has(project.type)) {
      errors.push(
        `Project "${project.id}" has invalid project type: "${project.type}"`
      );
    }
    if (!project.milestoneIds || project.milestoneIds.length === 0) {
      errors.push(`Project "${project.id}" has no milestone references.`);
    } else {
      let expectedOrder = 1;
      for (const mId of project.milestoneIds) {
        const milestone = milestoneMap.get(mId);
        if (!milestone) {
          errors.push(
            `Project "${project.id}" references non-existent Milestone ID: "${mId}"`
          );
        } else {
          if (milestone.projectId !== project.id) {
            errors.push(
              `Milestone "${mId}" projectId "${milestone.projectId}" does not match parent Project ID "${project.id}"`
            );
          }
          if (milestone.order !== expectedOrder) {
            errors.push(
              `Milestone "${mId}" in Project "${project.id}" has order ${milestone.order}, expected consecutive order ${expectedOrder}.`
            );
          }
          expectedOrder++;
        }
      }
    }

    for (const conceptId of project.conceptIds) {
      if (!conceptMap.has(conceptId)) {
        errors.push(
          `Project "${project.id}" references non-existent Concept ID: "${conceptId}"`
        );
      }
    }
  }

  // 5. Validate Milestones
  for (const milestone of data.milestones) {
    if (!projectMap.has(milestone.projectId)) {
      errors.push(
        `Milestone "${milestone.id}" belongs to non-existent Project ID: "${milestone.projectId}"`
      );
    }
    if (milestone.resourceIds) {
      for (const rId of milestone.resourceIds) {
        if (!resourceMap.has(rId)) {
          errors.push(
            `Milestone "${milestone.id}" references non-existent Resource ID: "${rId}"`
          );
        }
      }
    }
  }

  // 6. Validate Resources
  for (const resource of data.resources) {
    if (resource.conceptId && !conceptMap.has(resource.conceptId)) {
      errors.push(
        `Resource "${resource.id}" references non-existent Concept ID: "${resource.conceptId}"`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
