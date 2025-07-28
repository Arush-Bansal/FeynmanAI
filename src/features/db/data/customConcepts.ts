import { CustomConcept } from "@/features/db";
import { ICustomConcept } from "@/features/db/models/CustomConcept";

export const getCustomConceptsByUser = async (userId: string) => {
  return await CustomConcept.find({ createdBy: userId }).sort({ createdAt: -1 });
};

export const getCustomConceptsByParentSubtopic = async (parentSubtopicId: string) => {
  return await CustomConcept.find({ parentSubtopic: parentSubtopicId }).sort({ name: 1 });
};

export const getCustomConceptById = async (customConceptId: string) => {
  return await CustomConcept.findById(customConceptId);
};

export const createCustomConcept = async (customConceptData: Partial<ICustomConcept>) => {
  return await CustomConcept.create(customConceptData);
};

export const updateCustomConcept = async (customConceptId: string, updateData: Partial<ICustomConcept>) => {
  return await CustomConcept.findByIdAndUpdate(customConceptId, updateData, { new: true });
};

export const deleteCustomConcept = async (customConceptId: string) => {
  return await CustomConcept.findByIdAndDelete(customConceptId);
};

export const getCustomConceptWithCreator = async (customConceptId: string) => {
  return await CustomConcept.findById(customConceptId).populate('createdBy');
};

export const getCustomConceptsByDifficulty = async (difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED') => {
  return await CustomConcept.find({ difficulty }).sort({ name: 1 });
}; 