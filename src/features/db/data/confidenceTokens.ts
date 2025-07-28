import { ConfidenceToken, IConfidenceToken } from "@/features/db/models/ConfidenceToken";

export const getConfidenceToken = async (userId: string, entityType: string, entityId: string) => {
  return await ConfidenceToken.findOne({
    user: userId,
    entityType,
    entityId
  });
};

export const getConfidenceTokensByUser = async (userId: string) => {
  return await ConfidenceToken.find({ user: userId }).sort({ lastUpdated: -1 });
};

export const getConfidenceTokensByEntity = async (entityType: string, entityId: string) => {
  return await ConfidenceToken.find({
    entityType,
    entityId
  }).populate('user');
};

export const createConfidenceToken = async (confidenceTokenData: Partial<IConfidenceToken>) => {
  return await ConfidenceToken.create(confidenceTokenData);
};

export const updateConfidenceToken = async (userId: string, entityType: string, entityId: string, updateData: Partial<IConfidenceToken>) => {
  return await ConfidenceToken.findOneAndUpdate(
    { user: userId, entityType, entityId },
    { ...updateData, lastUpdated: new Date() },
    { new: true, upsert: true }
  );
};

export const updateConfidenceLevel = async (userId: string, entityType: string, entityId: string, confidenceLevel: number) => {
  return await ConfidenceToken.findOneAndUpdate(
    { user: userId, entityType, entityId },
    { 
      confidenceLevel,
      lastUpdated: new Date(),
      $inc: { practiceCount: 1 }
    },
    { new: true, upsert: true }
  );
};

export const deleteConfidenceToken = async (userId: string, entityType: string, entityId: string) => {
  return await ConfidenceToken.findOneAndDelete({
    user: userId,
    entityType,
    entityId
  });
};

export const getLowConfidenceAreas = async (userId: string, threshold: number = 50) => {
  return await ConfidenceToken.find({
    user: userId,
    confidenceLevel: { $lt: threshold }
  }).sort({ confidenceLevel: 1 });
};

export const getHighConfidenceAreas = async (userId: string, threshold: number = 80) => {
  return await ConfidenceToken.find({
    user: userId,
    confidenceLevel: { $gte: threshold }
  }).sort({ confidenceLevel: -1 });
}; 