import { NextRequest, NextResponse } from 'next/server';
import { getTopicContent } from '@/features/db/services/serverContentService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const examCode = searchParams.get('exam');
    const subjectName = searchParams.get('subject');
    const topicName = searchParams.get('topic');

    if (!examCode || !subjectName || !topicName) {
      return NextResponse.json(
        { error: 'Missing required parameters: exam, subject, topic' }, 
        { status: 400 }
      );
    }

    const topicContent = await getTopicContent(examCode, subjectName, topicName);

    if (!topicContent) {
      return NextResponse.json(
        { error: 'Topic content not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      content: topicContent
    });

  } catch (error) {
    console.error('Error fetching topic content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topic content' }, 
      { status: 500 }
    );
  }
} 