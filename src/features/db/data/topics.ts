import { Topic } from "@/features/db";
import { ITopic } from "@/features/db/models/Topic";

export const getTopicsBySubject = async (subjectId: string) => {
  return await Topic.find({ subject: subjectId }).sort({ name: 1 });
};

export const getTopicById = async (topicId: string) => {
  return await Topic.findById(topicId);
};

export const getTopicByCode = async (code: string) => {
  return await Topic.findOne({ code });
};

export const createTopic = async (topicData: Partial<ITopic>) => {
  return await Topic.create(topicData);
};

export const updateTopic = async (topicId: string, updateData: Partial<ITopic>) => {
  return await Topic.findByIdAndUpdate(topicId, updateData, { new: true });
};

export const deleteTopic = async (topicId: string) => {
  return await Topic.findByIdAndDelete(topicId);
};

export const getTopicWithSubject = async (topicId: string) => {
  return await Topic.findById(topicId).populate('subject');
};

export const getTopicWithFullHierarchy = async (topicId: string) => {
  return await Topic.findById(topicId)
    .populate({
      path: 'subject',
      populate: {
        path: 'exam'
      }
    });
}; 