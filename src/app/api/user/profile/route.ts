import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserByEmail } from '@/features/db/data/users';
import { getPracticeSessionStats } from '@/features/db/data/practiceSessions';
import { getAnalyticsSummary } from '@/features/db/data/analytics';
import dbConnect from '@/features/db/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get practice session stats
    const practiceStats = await getPracticeSessionStats(user._id.toString());
    
    // Get analytics summary
    const analyticsSummary = await getAnalyticsSummary(user._id.toString());

    // Calculate additional stats
    const totalHours = Math.floor((user.stats.totalPracticeTime + practiceStats.totalTime) / 60);
    const averageScore = user.stats.averageScore || practiceStats.averageScore || 0;
    const bestScore = practiceStats.bestScore || 0;
    
    // Calculate streak (simplified - you might want to implement a more sophisticated streak calculation)
    const lastActive = new Date(user.stats.lastActiveDate);
    const today = new Date();
    const daysSinceLastActive = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    const currentStreak = daysSinceLastActive <= 1 ? user.stats.streakDays : 0;

    const profileData = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      preferences: user.preferences,
      stats: {
        totalPracticeSessions: user.stats.totalPracticeSessions + practiceStats.totalSessions,
        totalPracticeTime: user.stats.totalPracticeTime + practiceStats.totalTime,
        totalHours,
        averageScore,
        bestScore,
        streakDays: currentStreak,
        lastActiveDate: user.stats.lastActiveDate,
      },
      analytics: analyticsSummary,
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { preferences } = body;

    if (!preferences) {
      return NextResponse.json({ error: 'Preferences are required' }, { status: 400 });
    }

    // Update user preferences
    const { updateUserPreferences } = await import('@/features/db/data/users');
    const updatedUser = await updateUserPreferences(user._id.toString(), preferences);

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
} 