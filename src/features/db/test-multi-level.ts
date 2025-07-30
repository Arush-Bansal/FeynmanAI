import 'dotenv/config';
import dbConnect from './dbConnect';
import { getSubtopicTree } from './data/subtopics';
import { getConceptsBySubtopic } from './data/concepts';
import { getTopicByCode } from './data/topics';

export async function testMultiLevelStructure() {
  try {
    await dbConnect();
    console.log('🧪 Testing multi-level content structure...\n');

    // Test Mechanics topic
    const mechanicsTopic = await getTopicByCode('MECHANICS');
    if (!mechanicsTopic) {
      console.log('❌ Mechanics topic not found');
      return;
    }

    console.log('📚 Testing Mechanics topic structure:');
    const mechanicsTree = await getSubtopicTree(mechanicsTopic._id.toString());
    
    console.log(`✅ Found ${mechanicsTree.length} first-level subtopics in Mechanics`);
    
    for (const subtopic of mechanicsTree) {
      console.log(`  📖 ${subtopic.name} (${subtopic.code})`);
      
      // Get children of this subtopic
      const children = await getSubtopicTree(subtopic._id.toString());
      console.log(`    📝 ${children.length} second-level subtopics`);
      
      for (const child of children) {
        console.log(`      📄 ${child.name} (${child.code})`);
        
        // Get grandchildren
        const grandchildren = await getSubtopicTree(child._id.toString());
        console.log(`        📋 ${grandchildren.length} third-level subtopics`);
        
        for (const grandchild of grandchildren) {
          console.log(`          📌 ${grandchild.name} (${grandchild.code})`);
          
          // Get great-grandchildren
          const greatGrandchildren = await getSubtopicTree(grandchild._id.toString());
          console.log(`            📎 ${greatGrandchildren.length} fourth-level subtopics`);
          
          for (const greatGrandchild of greatGrandchildren) {
            console.log(`              🏷️  ${greatGrandchild.name} (${greatGrandchild.code})`);
            
            // Get concepts for this level
            const concepts = await getConceptsBySubtopic(greatGrandchild._id.toString());
            console.log(`                💡 ${concepts.length} concepts`);
            
            for (const concept of concepts) {
              console.log(`                  🎯 ${concept.name} (${concept.difficulty}) - ${concept.estimatedTime}min`);
            }
          }
        }
      }
    }

    // Test Physical Chemistry topic
    const physicalChemistryTopic = await getTopicByCode('PHYSICAL_CHEMISTRY');
    if (physicalChemistryTopic) {
      console.log('\n🧪 Testing Physical Chemistry topic structure:');
      const chemistryTree = await getSubtopicTree(physicalChemistryTopic._id.toString());
      console.log(`✅ Found ${chemistryTree.length} first-level subtopics in Physical Chemistry`);
    }

    // Test Algebra topic
    const algebraTopic = await getTopicByCode('ALGEBRA');
    if (algebraTopic) {
      console.log('\n📐 Testing Algebra topic structure:');
      const algebraTree = await getSubtopicTree(algebraTopic._id.toString());
      console.log(`✅ Found ${algebraTree.length} first-level subtopics in Algebra`);
    }

    console.log('\n✅ Multi-level structure test completed successfully!');

  } catch (error) {
    console.error('❌ Error testing multi-level structure:', error);
    throw error;
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testMultiLevelStructure()
    .then(() => {
      console.log('\n🎉 Multi-level structure test completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Multi-level structure test failed:', error);
      process.exit(1);
    });
} 