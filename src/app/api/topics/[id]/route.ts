import { NextRequest, NextResponse } from 'next/server';
import { getTopicById } from '@/features/db/data/topics';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topicId = params.id;

    console.log('Topics API called with topicId:', topicId);

    if (!topicId) {
      return NextResponse.json(
        { error: 'Topic ID is required' }, 
        { status: 400 }
      );
    }

    const topic = await getTopicById(topicId);
    console.log('Found topic:', topic);
    
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      topic: {
        _id: topic._id.toString(),
        name: topic.name,
        code: topic.code,
        description: topic.description,
        subject: topic.subject.toString()
      }
    });

  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topic' }, 
      { status: 500 }
    );
  }
} 