import { NextResponse } from 'next/server';
import { getSubtopicsByTopic } from '@/features/db/data/subtopics';
import { getTopicsBySubject } from '@/features/db/data/topics';
import { getSubjectsByExam } from '@/features/db/data/subjects';
import { getExamByCode } from '@/features/db/data/exams';
import dbConnect from '@/features/db/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    
    // Get all exams
    const exams = await getExamByCode('JEE');
    console.log('JEE exam:', exams);
    
    // Get subjects for JEE
    const subjects = await getSubjectsByExam(exams?._id.toString() || '');
    console.log('JEE subjects:', subjects);
    
    // Get topics for first subject
    if (subjects.length > 0) {
      const topics = await getTopicsBySubject(subjects[0]._id.toString());
      console.log('Topics for first subject:', topics);
      
      // Get subtopics for first topic
      if (topics.length > 0) {
        const subtopics = await getSubtopicsByTopic(topics[0]._id.toString());
        console.log('Subtopics for first topic:', subtopics);
        
        return NextResponse.json({
          success: true,
          exam: exams,
          subjects: subjects,
          topics: topics,
          subtopics: subtopics,
          message: `Found ${subtopics.length} subtopics for topic: ${topics[0].name}`
        });
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'No data found'
    });

  } catch (error) {
    console.error('Error in test-subtopics:', error);
    return NextResponse.json(
      { error: 'Failed to test subtopics', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
} 