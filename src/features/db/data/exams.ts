import { Exam, IExam } from "@/features/db/models/Exam";

export const getAllExams = async () => {
  return await Exam.find().sort({ name: 1 });
};

export const getExamById = async (examId: string) => {
  return await Exam.findById(examId);
};

export const getExamByCode = async (code: string) => {
  return await Exam.findOne({ code });
};

export const createExam = async (examData: Partial<IExam>) => {
  return await Exam.create(examData);
};

export const updateExam = async (examId: string, updateData: Partial<IExam>) => {
  return await Exam.findByIdAndUpdate(examId, updateData, { new: true });
};

export const deleteExam = async (examId: string) => {
  return await Exam.findByIdAndDelete(examId);
}; 