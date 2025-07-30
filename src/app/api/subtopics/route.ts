import { NextRequest, NextResponse } from 'next/server';
import { getSubtopicsForTopic } from '@/features/db/services/serverContentService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topic');

    console.log('Subtopics API called with topicId:', topicId);

    if (!topicId) {
      return NextResponse.json(
        { error: 'Topic ID is required' }, 
        { status: 400 }
      );
    }

    const subtopics = await getSubtopicsForTopic(topicId);
    console.log('Found subtopics:', subtopics);
    
    return NextResponse.json({
      success: true,
      subtopics
    });

  } catch (error) {
    console.error('Error fetching subtopics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subtopics' }, 
      { status: 500 }
    );
  }
} 