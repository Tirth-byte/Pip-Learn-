import {
  LearningPath,
  Module,
  Project,
  Milestone,
  Concept,
  Resource,
  ProjectType,
} from "./types";
import { validateCurriculum, ValidationResult, CurriculumDataStore } from "./validator";

import { pythonLearningPath } from "./paths/python-fundamentals";
import { module01Fundamentals } from "./modules/module-01";
import { smartCalculatorProject } from "./projects/smart-calculator";
import { smartCalculatorMilestones } from "./milestones/smart-calculator";
import { pythonFundamentalsConcepts } from "./concepts/python-fundamentals";
import { smartCalculatorResources } from "./resources/smart-calculator";

export class CurriculumRegistry {
  private paths: Map<string, LearningPath> = new Map();
  private pathsBySlug: Map<string, LearningPath> = new Map();

  private modules: Map<string, Module> = new Map();
  private modulesBySlug: Map<string, Module> = new Map();

  private projects: Map<string, Project> = new Map();
  private projectsBySlug: Map<string, Project> = new Map();

  private milestones: Map<string, Milestone> = new Map();
  private milestonesByProject: Map<string, Milestone[]> = new Map();

  private concepts: Map<string, Concept> = new Map();
  private conceptsBySlug: Map<string, Concept> = new Map();

  private resources: Map<string, Resource> = new Map();

  constructor(data: CurriculumDataStore) {
    this.loadData(data);
  }

  private loadData(data: CurriculumDataStore): void {
    // 1. Index Paths
    for (const path of data.paths) {
      this.paths.set(path.id, path);
      this.pathsBySlug.set(path.slug, path);
    }

    // 2. Index Modules
    for (const mod of data.modules) {
      this.modules.set(mod.id, mod);
      this.modulesBySlug.set(mod.slug, mod);
    }

    // 3. Index Projects
    for (const project of data.projects) {
      this.projects.set(project.id, project);
      this.projectsBySlug.set(project.slug, project);
    }

    // 4. Index Milestones
    for (const milestone of data.milestones) {
      this.milestones.set(milestone.id, milestone);
      const projectMilestones = this.milestonesByProject.get(milestone.projectId) || [];
      projectMilestones.push(milestone);
      this.milestonesByProject.set(milestone.projectId, projectMilestones);
    }
    // Sort milestones by order
    for (const [, list] of this.milestonesByProject) {
      list.sort((a, b) => a.order - b.order);
    }

    // 5. Index Concepts
    for (const concept of data.concepts) {
      this.concepts.set(concept.id, concept);
      this.conceptsBySlug.set(concept.slug, concept);
    }

    // 6. Index Resources
    for (const resource of data.resources) {
      this.resources.set(resource.id, resource);
    }
  }

  // --- Path Lookups ---

  public getLearningPath(idOrSlug: string): LearningPath | undefined {
    return this.paths.get(idOrSlug) || this.pathsBySlug.get(idOrSlug);
  }

  public getAllLearningPaths(): LearningPath[] {
    return Array.from(this.paths.values());
  }

  // --- Module Lookups ---

  public getModule(idOrSlug: string): Module | undefined {
    return this.modules.get(idOrSlug) || this.modulesBySlug.get(idOrSlug);
  }

  public getAllModules(): Module[] {
    return Array.from(this.modules.values()).sort((a, b) => a.unitNumber - b.unitNumber);
  }

  // --- Project Lookups ---

  public getProject(idOrSlug: string): Project | undefined {
    return this.projects.get(idOrSlug) || this.projectsBySlug.get(idOrSlug);
  }

  public getAllProjects(typeFilter?: ProjectType): Project[] {
    const list = Array.from(this.projects.values());
    if (typeFilter) {
      return list.filter((p) => p.type === typeFilter);
    }
    return list;
  }

  public getPrimaryProjectForModule(moduleIdOrSlug: string): Project | undefined {
    const mod = this.getModule(moduleIdOrSlug);
    if (!mod) return undefined;
    return this.getProject(mod.primaryProjectId);
  }

  // --- Milestone Lookups ---

  public getMilestone(id: string): Milestone | undefined {
    return this.milestones.get(id);
  }

  public getMilestonesForProject(projectIdOrSlug: string): Milestone[] {
    const project = this.getProject(projectIdOrSlug);
    if (!project) return [];
    return this.milestonesByProject.get(project.id) || [];
  }

  // --- Concept Lookups ---

  public getConcept(idOrSlug: string): Concept | undefined {
    return this.concepts.get(idOrSlug) || this.conceptsBySlug.get(idOrSlug);
  }

  public getConceptsForModule(moduleIdOrSlug: string): Concept[] {
    const mod = this.getModule(moduleIdOrSlug);
    if (!mod) return [];
    return mod.conceptIds
      .map((cId) => this.getConcept(cId))
      .filter((c): c is Concept => c !== undefined);
  }

  public getConceptsForProject(projectIdOrSlug: string): Concept[] {
    const project = this.getProject(projectIdOrSlug);
    if (!project) return [];
    return project.conceptIds
      .map((cId) => this.getConcept(cId))
      .filter((c): c is Concept => c !== undefined);
  }

  // --- Resource Lookups ---

  public getResource(id: string): Resource | undefined {
    return this.resources.get(id);
  }

  public getResourcesForMilestone(milestoneId: string): Resource[] {
    const milestone = this.getMilestone(milestoneId);
    if (!milestone || !milestone.resourceIds) return [];
    return milestone.resourceIds
      .map((rId) => this.getResource(rId))
      .filter((r): r is Resource => r !== undefined);
  }

  // --- Registry Validation ---

  public validate(): ValidationResult {
    return validateCurriculum({
      paths: Array.from(this.paths.values()),
      modules: Array.from(this.modules.values()),
      projects: Array.from(this.projects.values()),
      milestones: Array.from(this.milestones.values()),
      concepts: Array.from(this.concepts.values()),
      resources: Array.from(this.resources.values()),
    });
  }
}

/**
 * Default Seed Curriculum Dataset
 */
export const defaultCurriculumData: CurriculumDataStore = {
  paths: [pythonLearningPath],
  modules: [module01Fundamentals],
  projects: [smartCalculatorProject],
  milestones: smartCalculatorMilestones,
  concepts: pythonFundamentalsConcepts,
  resources: smartCalculatorResources,
};

/**
 * Singleton instance initialized with the default curriculum
 */
export const defaultRegistry = new CurriculumRegistry(defaultCurriculumData);
