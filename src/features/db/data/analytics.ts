import { Analytics, IAnalytics } from "@/features/db/models";

export const getAnalyticsByUser = async (userId: string) => {
  return await Analytics.find({ user: userId }).sort({ date: -1 });
};

export const getAnalyticsByDate = async (userId: string, date: Date) => {
  return await Analytics.findOne({
    user: userId,
    date: {
      $gte: new Date(date.setHours(0, 0, 0, 0)),
      $lt: new Date(date.setHours(23, 59, 59, 999))
    }
  });
};

export const createAnalytics = async (analyticsData: Partial<IAnalytics>) => {
  return await Analytics.create(analyticsData);
};

export const updateAnalytics = async (userId: string, date: Date, updateData: Partial<IAnalytics>) => {
  return await Analytics.findOneAndUpdate(
    { user: userId, date },
    updateData,
    { new: true, upsert: true }
  );
};

export const getAnalyticsByDateRange = async (userId: string, startDate: Date, endDate: Date) => {
  return await Analytics.find({
    user: userId,
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: 1 });
};

export const getWeeklyAnalytics = async (userId: string, weekStart: Date) => {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  
  return await Analytics.find({
    user: userId,
    date: { $gte: weekStart, $lt: weekEnd }
  }).sort({ date: 1 });
};

export const getMonthlyAnalytics = async (userId: string, month: number, year: number) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  return await Analytics.find({
    user: userId,
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: 1 });
};

export const getAnalyticsSummary = async (userId: string) => {
  const summary = await Analytics.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: '$sessionsCompleted' },
        totalTime: { $sum: '$totalTime' },
        averageScore: { $avg: '$averageScore' },
        totalDays: { $sum: 1 }
      }
    }
  ]);
  
  return summary[0] || { totalSessions: 0, totalTime: 0, averageScore: 0, totalDays: 0 };
}; 