import { Concept, IConcept } from "@/features/db";

export const getConceptsBySubtopic = async (subtopicId: string) => {
  return await Concept.find({ subtopic: subtopicId }).sort({ name: 1 });
};

export const getConceptById = async (conceptId: string) => {
  return await Concept.findById(conceptId);
};

export const getConceptByCode = async (code: string) => {
  return await Concept.findOne({ code });
};

export const createConcept = async (conceptData: Partial<IConcept>) => {
  return await Concept.create(conceptData);
};

export const updateConcept = async (conceptId: string, updateData: Partial<IConcept>) => {
  return await Concept.findByIdAndUpdate(conceptId, updateData, { new: true });
};

export const deleteConcept = async (conceptId: string) => {
  return await Concept.findByIdAndDelete(conceptId);
};

export const getConceptWithSubtopic = async (conceptId: string) => {
  return await Concept.findById(conceptId).populate('subtopic');
};

export const getConceptWithFullHierarchy = async (conceptId: string) => {
  return await Concept.findById(conceptId)
    .populate({
      path: 'subtopic',
      populate: {
        path: 'topic',
        populate: {
          path: 'subject',
          populate: {
            path: 'exam'
          }
        }
      }
    });
};

export const getConceptsByDifficulty = async (difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED') => {
  return await Concept.find({ difficulty }).sort({ name: 1 });
}; 