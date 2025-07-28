import { NextRequest, NextResponse } from 'next/server';
import { getTopicsForSubject } from '@/features/db/services/serverContentService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subject');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' }, 
        { status: 400 }
      );
    }

    const topics = await getTopicsForSubject(subjectId);
    
    return NextResponse.json({
      success: true,
      topics
    });

  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' }, 
      { status: 500 }
    );
  }
} 