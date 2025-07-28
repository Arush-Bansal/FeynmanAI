import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getPracticeSessionsByUser } from '@/features/db/data/practiceSessions';
import { getUserByEmail } from '@/features/db/data/users';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const practiceSessions = await getPracticeSessionsByUser(user._id.toString());
    
    return NextResponse.json(practiceSessions);
  } catch (error) {
    console.error('Error fetching practice sessions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 