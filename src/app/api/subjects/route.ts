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

    // Add timeout for serverless environment
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 25000); // 25s timeout
    });

    const subjectsPromise = getSubjectsForExam(examCode);
    
    const subjects = await Promise.race([subjectsPromise, timeoutPromise]);
    
    return NextResponse.json({
      success: true,
      subjects
    });

  } catch (error) {
    console.error('Error fetching subjects:', error);
    
    // Provide more specific error messages
    if (error instanceof Error && error.message === 'Request timeout') {
      return NextResponse.json(
        { error: 'Request timeout - please try again' }, 
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch subjects' }, 
      { status: 500 }
    );
  }
} 