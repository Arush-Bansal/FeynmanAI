import { NextRequest, NextResponse } from 'next/server';
import { getSubtopicTree } from '@/features/db/data/subtopics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topic');

    console.log('Subtopics Tree API called with topicId:', topicId);

    if (!topicId) {
      return NextResponse.json(
        { error: 'Topic ID is required' }, 
        { status: 400 }
      );
    }

    const subtopics = await getSubtopicTree(topicId);
    console.log('Found subtopics tree:', subtopics);
    
    return NextResponse.json({
      success: true,
      subtopics
    });

  } catch (error) {
    console.error('Error fetching subtopics tree:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subtopics tree' }, 
      { status: 500 }
    );
  }
} 