import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/features/db/dbConnect';
import { getPracticeSessionsByUser } from '@/features/db/data/practiceSessions';
import { getUserByEmail } from '@/features/db/data/users';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    await dbConnect();
    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const practiceSessions = await getPracticeSessionsByUser(user._id);
    return NextResponse.json(practiceSessions);
  } catch (error) {
    console.error('Error fetching practice sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch practice sessions' }, { status: 500 });
  }
}