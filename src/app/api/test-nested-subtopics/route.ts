import { NextRequest, NextResponse } from 'next/server';
import { getSubtopicsByTopic } from '@/features/db/data/subtopics';
import { getSubtopicByCode } from '@/features/db/data/subtopics';
import { getSubtopicTree } from '@/features/db/data/subtopics';
import dbConnect from '@/features/db/dbConnect';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Test 1: Find Kinematics subtopic
    const kinematicsSubtopic = await getSubtopicByCode('KINEMATICS');
    console.log('Kinematics subtopic:', kinematicsSubtopic);
    
    if (!kinematicsSubtopic) {
      return NextResponse.json({
        success: false,
        message: 'Kinematics subtopic not found'
      });
    }
    
    // Test 2: Check if Kinematics has child subtopics
    const childSubtopics = await getSubtopicsByTopic(kinematicsSubtopic._id.toString());
    console.log('Child subtopics of Kinematics:', childSubtopics);
    
    // Test 3: Get the full tree structure for Mechanics
    const mechanicsTree = await getSubtopicTree(kinematicsSubtopic.topic.toString());
    console.log('Full tree structure:', mechanicsTree);
    
    // Test 4: Check nested levels
    const linearMotionSubtopic = await getSubtopicByCode('LINEAR_MOTION');
    const linearMotionChildren = linearMotionSubtopic ? 
      await getSubtopicsByTopic(linearMotionSubtopic._id.toString()) : [];
    
    return NextResponse.json({
      success: true,
      kinematics: {
        _id: kinematicsSubtopic._id.toString(),
        name: kinematicsSubtopic.name,
        code: kinematicsSubtopic.code,
        description: kinematicsSubtopic.description
      },
      childSubtopics: childSubtopics.map(st => ({
        _id: st._id.toString(),
        name: st.name,
        code: st.code,
        description: st.description,
        parentSubtopic: st.parentSubtopic?.toString()
      })),
      linearMotion: linearMotionSubtopic ? {
        _id: linearMotionSubtopic._id.toString(),
        name: linearMotionSubtopic.name,
        code: linearMotionSubtopic.code,
        description: linearMotionSubtopic.description,
        parentSubtopic: linearMotionSubtopic.parentSubtopic?.toString()
      } : null,
      linearMotionChildren: linearMotionChildren.map(st => ({
        _id: st._id.toString(),
        name: st.name,
        code: st.code,
        description: st.description,
        parentSubtopic: st.parentSubtopic?.toString()
      })),
      treeStructure: mechanicsTree,
      message: `Found ${childSubtopics.length} child subtopics under Kinematics, ${linearMotionChildren.length} under Linear Motion`
    });

  } catch (error) {
    console.error('Error in test-nested-subtopics:', error);
    return NextResponse.json(
      { error: 'Failed to test nested subtopics', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
} 