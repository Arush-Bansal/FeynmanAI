import { NextRequest, NextResponse } from 'next/server';
import { getConceptsForSubtopic } from '@/features/db/services/serverContentService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subtopicId = searchParams.get('subtopic');

    if (!subtopicId) {
      return NextResponse.json(
        { error: 'Subtopic ID is required' }, 
        { status: 400 }
      );
    }

    const concepts = await getConceptsForSubtopic(subtopicId);
    
    return NextResponse.json({
      success: true,
      concepts
    });

  } catch (error) {
    console.error('Error fetching concepts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch concepts' }, 
      { status: 500 }
    );
  }
} 