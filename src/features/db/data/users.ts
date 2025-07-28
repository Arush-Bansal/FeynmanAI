import { User } from "@/features/db/models/User";
import { IUser } from "@/features/db/models/User";

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId);
};

export const createUser = async (userData: Partial<IUser>) => {
  return await User.create(userData);
};

export const updateUser = async (userId: string, updateData: Partial<IUser>) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

export const updateUserStats = async (userId: string, stats: Partial<IUser['stats']>) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { stats } },
    { new: true }
  );
};

export const updateUserPreferences = async (userId: string, preferences: Partial<IUser['preferences']>) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { preferences } },
    { new: true }
  );
};

export const incrementUserStats = async (userId: string, statsUpdate: {
  totalPracticeSessions?: number;
  totalPracticeTime?: number;
  streakDays?: number;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateObj: any = {};
  if (statsUpdate.totalPracticeSessions) {
    updateObj['stats.totalPracticeSessions'] = { $inc: statsUpdate.totalPracticeSessions };
  }
  if (statsUpdate.totalPracticeTime) {
    updateObj['stats.totalPracticeTime'] = { $inc: statsUpdate.totalPracticeTime };
  }
  if (statsUpdate.streakDays) {
    updateObj['stats.streakDays'] = { $inc: statsUpdate.streakDays };
  }
  
  return await User.findByIdAndUpdate(userId, updateObj, { new: true });
};
