import { Subject } from "@/features/db";
import { ISubject } from "@/features/db/models/Subject";

export const getSubjectsByExam = async (examId: string) => {
  return await Subject.find({ exam: examId }).sort({ name: 1 });
};

export const getSubjectById = async (subjectId: string) => {
  return await Subject.findById(subjectId);
};

export const getSubjectByCode = async (code: string) => {
  return await Subject.findOne({ code });
};

export const createSubject = async (subjectData: Partial<ISubject>) => {
  return await Subject.create(subjectData);
};

export const updateSubject = async (subjectId: string, updateData: Partial<ISubject>) => {
  return await Subject.findByIdAndUpdate(subjectId, updateData, { new: true });
};

export const deleteSubject = async (subjectId: string) => {
  return await Subject.findByIdAndDelete(subjectId);
};

export const getSubjectWithExam = async (subjectId: string) => {
  return await Subject.findById(subjectId).populate('exam');
}; 