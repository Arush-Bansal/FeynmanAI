import { NextRequest, NextResponse } from 'next/server';
import { getSubtopicsByTopic } from '@/features/db/data/subtopics';
import { getSubtopicTree } from '@/features/db/data/subtopics';
import { getSubtopicByCode } from '@/features/db/data/subtopics';
import dbConnect from '@/features/db/dbConnect';
import { Subtopic } from '@/features/db/models/Subtopic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get the actual topic ID for Mechanics
    const { getTopicByCode } = await import('@/features/db/data/topics');
    const { getTopicsBySubject } = await import('@/features/db/data/topics');
    const { getSubjectsByExam } = await import('@/features/db/data/subjects');
    const { getExamByCode } = await import('@/features/db/data/exams');
    
    // Get JEE exam
    const jeeExam = await getExamByCode('JEE');
    if (!jeeExam) {
      return NextResponse.json({ success: false, message: 'JEE exam not found' });
    }
    
    // Get Physics subject
    const subjects = await getSubjectsByExam(jeeExam._id.toString());
    const physicsSubject = subjects.find(s => s.name === 'Physics');
    if (!physicsSubject) {
      return NextResponse.json({ success: false, message: 'Physics subject not found' });
    }
    
    // Get Mechanics topic
    const topics = await getTopicsBySubject(physicsSubject._id.toString());
    const mechanicsTopic = topics.find(t => t.name === 'Mechanics');
    if (!mechanicsTopic) {
      return NextResponse.json({ success: false, message: 'Mechanics topic not found' });
    }
    
    // Get all subtopics for Mechanics
    const allSubtopics = await getSubtopicsByTopic(mechanicsTopic._id.toString());
    console.log('All subtopics for Mechanics:', allSubtopics.length);
    
    // Get tree structure
    const treeStructure = await getSubtopicTree(mechanicsTopic._id.toString());
    console.log('Tree structure:', treeStructure);
    
    // Check specific third-level subtopics
    const satelliteMotion = await getSubtopicByCode('SATELLITE_MOTION');
    const satelliteChildren = satelliteMotion ? 
      await getSubtopicsByTopic(satelliteMotion._id.toString()) : [];
    
    const linearMotion = await getSubtopicByCode('LINEAR_MOTION');
    const linearMotionChildren = linearMotion ? 
      await getSubtopicsByTopic(linearMotion._id.toString()) : [];
    
    // Check if third-level subtopics exist in the database
    const thirdLevelSubtopics = await Subtopic.find({
      code: { $in: ['ORBITAL_VELOCITY', 'GEOSTATIONARY_SATELLITES', 'POLAR_SATELLITES', 'KEPLERS_LAWS', 'UNIFORM_MOTION', 'ACCELERATED_MOTION', 'FREE_FALL', 'MOTION_GRAPHS'] }
    });
    
    // Check all subtopics in the database for this topic
    const allSubtopicsInDB = await Subtopic.find({ topic: mechanicsTopic._id });
    
    return NextResponse.json({
      success: true,
      totalSubtopics: allSubtopics.length,
      totalInDB: allSubtopicsInDB.length,
      allSubtopics: allSubtopics.map(st => ({
        _id: st._id.toString(),
        name: st.name,
        code: st.code,
        parentSubtopic: st.parentSubtopic?.toString() || null
      })),
      treeStructure: treeStructure.map(st => ({
        _id: st._id.toString(),
        name: st.name,
        code: st.code,
        children: 0 // Simplified for now
      })),
      satelliteMotion: satelliteMotion ? {
        _id: satelliteMotion._id.toString(),
        name: satelliteMotion.name,
        code: satelliteMotion.code,
        children: satelliteChildren.length
      } : null,
      satelliteChildren: satelliteChildren.map(st => ({
        _id: st._id.toString(),
        name: st.name,
        code: st.code,
        parentSubtopic: st.parentSubtopic?.toString()
      })),
      linearMotion: linearMotion ? {
        _id: linearMotion._id.toString(),
        name: linearMotion.name,
        code: linearMotion.code,
        children: linearMotionChildren.length
      } : null,
      linearMotionChildren: linearMotionChildren.map(st => ({
        _id: st._id.toString(),
        name: st.name,
        code: st.code,
        parentSubtopic: st.parentSubtopic?.toString()
      })),
      thirdLevelSubtopicsFound: thirdLevelSubtopics.map(st => ({
        _id: st._id.toString(),
        name: st.name,
        code: st.code,
        topic: st.topic.toString(),
        parentSubtopic: st.parentSubtopic?.toString() || null
      })),
      allSubtopicsInDB: allSubtopicsInDB.map(st => ({
        _id: st._id.toString(),
        name: st.name,
        code: st.code,
        topic: st.topic.toString(),
        parentSubtopic: st.parentSubtopic?.toString() || null
      })),
      message: `Found ${allSubtopics.length} subtopics via API, ${allSubtopicsInDB.length} total in DB, ${thirdLevelSubtopics.length} third-level subtopics found`
    });

  } catch (error) {
    console.error('Error in test-subtopics-deep:', error);
    return NextResponse.json(
      { error: 'Failed to test deep subtopics', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
} 