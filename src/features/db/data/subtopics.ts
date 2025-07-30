import { Subtopic } from "@/features/db/models/Subtopic";
// import { ISubtopic } from "@/features/db/models/Subtopic";
// import { ITopic } from "@/features/db/models/Topic";
import { ISubtopic } from "@/features/db/models/Subtopic";

export const getSubtopicsByTopic = async (topicId: string) => {
  return await Subtopic.find({ topic: topicId }).sort({ name: 1 });
};

export const getSubtopicsByParent = async (parentSubtopicId: string) => {
  return await Subtopic.find({ parentSubtopic: parentSubtopicId }).sort({ name: 1 });
};

export const getSubtopicById = async (subtopicId: string) => {
  return await Subtopic.findById(subtopicId);
};

export const getSubtopicByCode = async (code: string) => {
  return await Subtopic.findOne({ code });
};

export const createSubtopic = async (subtopicData: Partial<ISubtopic>) => {
  return await Subtopic.create(subtopicData);
};

export const updateSubtopic = async (subtopicId: string, updateData: Partial<ISubtopic>) => {
  return await Subtopic.findByIdAndUpdate(subtopicId, updateData, { new: true });
};

export const deleteSubtopic = async (subtopicId: string) => {
  return await Subtopic.findByIdAndDelete(subtopicId);
};

export const getSubtopicWithTopic = async (subtopicId: string) => {
  return await Subtopic.findById(subtopicId).populate('topic');
};

export const getSubtopicWithFullHierarchy = async (subtopicId: string) => {
  return await Subtopic.findById(subtopicId)
    .populate({
      path: 'topic',
      populate: {
        path: 'subject',
        populate: {
          path: 'exam'
        }
      }
    });
};

export const getSubtopicTree = async (topicId: string) => {
  const subtopics = await Subtopic.find({ topic: topicId }).sort({ name: 1 });
  
  // Build tree structure
  const buildTree = (items: ISubtopic[], parentId: string | null = null): ISubtopic[] => {
    return items
      .filter(item => {
        if (parentId === null) {
          return !item.parentSubtopic || item.parentSubtopic === null;
        }
        return item.parentSubtopic?.toString() === parentId;
      })
      .map((item: ISubtopic) => ({
        ...item.toObject(),
        children: buildTree(items, item._id.toString())
      }));
  };
  
  return buildTree(subtopics);
}; 