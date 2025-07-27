import { FeynmanAnalysis } from "@/features/db";
import { IFeynmanAnalysis } from "@/features/db/models/FeynmanAnalysis";

export const createFeynmanAnalysis = async (analysis: Partial<IFeynmanAnalysis>) => {
  return await FeynmanAnalysis.create(analysis);
};

export const getFeynmanAnalysesByUserId = async (userId: string) => {
  return await FeynmanAnalysis.find({ user: userId }).sort({ createdAt: -1 });
};
