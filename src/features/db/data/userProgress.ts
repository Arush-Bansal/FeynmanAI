import { UserProgress } from "@/features/db/models/UserProgress";
import { IUserProgress } from "@/features/db/models/UserProgress";

export const getUserProgress = async (userId: string, conceptId: string) => {
  return await UserProgress.findOne({
    user: userId,
    concept: conceptId
  });
};

export const createUserProgress = async (progressData: Partial<IUserProgress>) => {
  return await UserProgress.create(progressData);
};

export const updateUserProgress = async (userId: string, conceptId: string, updateData: Partial<IUserProgress>) => {
  return await UserProgress.findOneAndUpdate(
    { user: userId, concept: conceptId },
    updateData,
    { new: true, upsert: true }
  );
};

export const getUserProgressByUser = async (userId: string) => {
  return await UserProgress.find({ user: userId })
    .populate('concept')
    .populate('subtopic')
    .populate('topic')
    .populate('subject')
    .populate('exam')
    .sort({ lastPracticed: -1 });
};

export const getUserProgressByConcept = async (userId: string, conceptId: string) => {
  return await UserProgress.findOne({
    user: userId,
    concept: conceptId
  }).populate('concept');
};

export const getUserProgressByTopic = async (userId: string, topicId: string) => {
  return await UserProgress.find({
    user: userId,
    topic: topicId
  }).populate('concept');
};

export const getUserProgressBySubject = async (userId: string, subjectId: string) => {
  return await UserProgress.find({
    user: userId,
    subject: subjectId
  }).populate('concept');
};

export const getUserProgressByExam = async (userId: string, examId: string) => {
  return await UserProgress.find({
    user: userId,
    exam: examId
  }).populate('concept');
};

export const getWeakAreas = async (userId: string, threshold: number = 50) => {
  return await UserProgress.find({
    user: userId,
    averageScore: { $lt: threshold }
  }).populate('concept');
};

export const getStrongAreas = async (userId: string, threshold: number = 80) => {
  return await UserProgress.find({
    user: userId,
    averageScore: { $gte: threshold }
  }).populate('concept');
}; 