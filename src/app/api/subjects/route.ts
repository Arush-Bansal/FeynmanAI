import { NextRequest, NextResponse } from 'next/server';
import { getSubjectsForExam } from '@/features/db/services/serverContentService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const examCode = searchParams.get('exam');

    if (!examCode) {
      return NextResponse.json(
        { error: 'Exam code is required' }, 
        { status: 400 }
      );
    }

    const subjects = await getSubjectsForExam(examCode);
    
    return NextResponse.json({
      success: true,
      subjects
    });

  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subjects' }, 
      { status: 500 }
    );
  }
} 