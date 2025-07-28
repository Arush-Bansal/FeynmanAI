import { PracticeSession, IPracticeSession } from "@/features/db";

export const createPracticeSession = async (sessionData: Partial<IPracticeSession>) => {
  return await PracticeSession.create(sessionData);
};

export const getPracticeSessionsByUser = async (userId: string) => {
  return await PracticeSession.find({ user: userId })
    .populate('concept')
    .populate('subtopic')
    .populate('topic')
    .populate('subject')
    .populate('exam')
    .sort({ createdAt: -1 });
};

export const getPracticeSessionById = async (sessionId: string) => {
  return await PracticeSession.findById(sessionId)
    .populate('concept')
    .populate('subtopic')
    .populate('topic')
    .populate('subject')
    .populate('exam');
};

export const updatePracticeSession = async (sessionId: string, updateData: Partial<IPracticeSession>) => {
  return await PracticeSession.findByIdAndUpdate(sessionId, updateData, { new: true });
};

export const completePracticeSession = async (sessionId: string, analysis: IPracticeSession['analysis']) => {
  return await PracticeSession.findByIdAndUpdate(
    sessionId,
    {
      status: 'COMPLETED',
      completedAt: new Date(),
      analysis
    },
    { new: true }
  );
};

export const getPracticeSessionsByConcept = async (userId: string, conceptId: string) => {
  return await PracticeSession.find({
    user: userId,
    concept: conceptId
  }).sort({ createdAt: -1 });
};

export const getPracticeSessionsByDateRange = async (userId: string, startDate: Date, endDate: Date) => {
  return await PracticeSession.find({
    user: userId,
    createdAt: { $gte: startDate, $lte: endDate }
  }).sort({ createdAt: -1 });
};

export const getPracticeSessionStats = async (userId: string) => {
  const stats = await PracticeSession.aggregate([
    { $match: { user: userId, status: 'COMPLETED' } },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        totalTime: { $sum: '$duration' },
        averageScore: { $avg: '$analysis.overallScore' },
        bestScore: { $max: '$analysis.overallScore' }
      }
    }
  ]);
  
  return stats[0] || { totalSessions: 0, totalTime: 0, averageScore: 0, bestScore: 0 };
}; 