import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateUserPreferences } from '@/features/db/data/users';
import { getExamByCode } from '@/features/db/data/exams';
import dbConnect from '@/features/db/dbConnect';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { examCode } = await request.json();
    
    if (!examCode) {
      return NextResponse.json({ error: 'Exam code is required' }, { status: 400 });
    }

    // Validate that the exam exists
    const exam = await getExamByCode(examCode);
    if (!exam) {
      return NextResponse.json({ error: 'Invalid exam code' }, { status: 400 });
    }

    // Get user by email first
    const { getUserByEmail } = await import('@/features/db/data/users');
    const user = await getUserByEmail(session.user.email);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user preferences with the selected exam
    await updateUserPreferences(user._id.toString(), {
      defaultExam: examCode
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Exam preference updated successfully',
      exam: {
        code: exam.code,
        name: exam.name,
        description: exam.description,
        icon: exam.icon
      }
    });

  } catch (error) {
    console.error('Error updating exam preference:', error);
    return NextResponse.json(
      { error: 'Failed to update exam preference' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's current exam preference
    const { getUserByEmail } = await import('@/features/db/data/users');
    const user = await getUserByEmail(session.user.email);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      currentExam: user.preferences?.defaultExam || null
    });

  } catch (error) {
    console.error('Error getting user exam preference:', error);
    return NextResponse.json(
      { error: 'Failed to get user exam preference' }, 
      { status: 500 }
    );
  }
} 