/**
 * PipLearn Curriculum System
 * 
 * Central public entry point for versioned curriculum definitions,
 * registry queries, and referential integrity validation.
 */

export * from "./types";
export * from "./validator";
export * from "./registry";

// Re-export convenient top-level query functions bound to the default registry
import { defaultRegistry } from "./registry";

export const getLearningPath = defaultRegistry.getLearningPath.bind(defaultRegistry);
export const getAllLearningPaths = defaultRegistry.getAllLearningPaths.bind(defaultRegistry);
export const getModule = defaultRegistry.getModule.bind(defaultRegistry);
export const getAllModules = defaultRegistry.getAllModules.bind(defaultRegistry);
export const getProject = defaultRegistry.getProject.bind(defaultRegistry);
export const getAllProjects = defaultRegistry.getAllProjects.bind(defaultRegistry);
export const getPrimaryProjectForModule = defaultRegistry.getPrimaryProjectForModule.bind(defaultRegistry);
export const getMilestone = defaultRegistry.getMilestone.bind(defaultRegistry);
export const getMilestonesForProject = defaultRegistry.getMilestonesForProject.bind(defaultRegistry);
export const getConcept = defaultRegistry.getConcept.bind(defaultRegistry);
export const getConceptsForModule = defaultRegistry.getConceptsForModule.bind(defaultRegistry);
export const getConceptsForProject = defaultRegistry.getConceptsForProject.bind(defaultRegistry);
export const getResource = defaultRegistry.getResource.bind(defaultRegistry);
export const getResourcesForMilestone = defaultRegistry.getResourcesForMilestone.bind(defaultRegistry);
export const validateCurriculumRegistry = defaultRegistry.validate.bind(defaultRegistry);
