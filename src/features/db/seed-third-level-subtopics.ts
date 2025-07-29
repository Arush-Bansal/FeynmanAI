import 'dotenv/config';
import dbConnect from './dbConnect';
import { createSubtopic } from './data/subtopics';
import { getSubtopicByCode } from './data/subtopics';
import { getTopicByCode } from './data/topics';

// Third-level subtopic data
const thirdLevelSubtopicData = [
  // Under Linear Motion
  { parentCode: 'LINEAR_MOTION', name: 'Uniform Motion', code: 'UNIFORM_MOTION', description: 'Constant velocity motion' },
  { parentCode: 'LINEAR_MOTION', name: 'Accelerated Motion', code: 'ACCELERATED_MOTION', description: 'Motion with changing velocity' },
  { parentCode: 'LINEAR_MOTION', name: 'Free Fall', code: 'FREE_FALL', description: 'Motion under gravity only' },
  { parentCode: 'LINEAR_MOTION', name: 'Motion Graphs', code: 'MOTION_GRAPHS', description: 'Graphical representation of motion' },
  
  // Under Circular Motion
  { parentCode: 'CIRCULAR_MOTION', name: 'Uniform Circular Motion', code: 'UNIFORM_CIRCULAR_MOTION', description: 'Constant speed circular motion' },
  { parentCode: 'CIRCULAR_MOTION', name: 'Non-Uniform Circular Motion', code: 'NON_UNIFORM_CIRCULAR_MOTION', description: 'Variable speed circular motion' },
  { parentCode: 'CIRCULAR_MOTION', name: 'Banking of Roads', code: 'BANKING_OF_ROADS', description: 'Curved road banking' },
  { parentCode: 'CIRCULAR_MOTION', name: 'Centripetal Acceleration', code: 'CENTRIPETAL_ACCELERATION', description: 'Acceleration towards center' },
  
  // Under Projectile Motion
  { parentCode: 'PROJECTILE_MOTION', name: 'Horizontal Projectile', code: 'HORIZONTAL_PROJECTILE', description: 'Projectile with horizontal initial velocity' },
  { parentCode: 'PROJECTILE_MOTION', name: 'Oblique Projectile', code: 'OBLIQUE_PROJECTILE', description: 'Projectile at an angle' },
  { parentCode: 'PROJECTILE_MOTION', name: 'Range and Height', code: 'RANGE_AND_HEIGHT', description: 'Maximum range and height calculations' },
  { parentCode: 'PROJECTILE_MOTION', name: 'Time of Flight', code: 'TIME_OF_FLIGHT', description: 'Total time in air' },
  
  // Under Newton's Laws
  { parentCode: 'NEWTONS_LAWS', name: 'First Law (Inertia)', code: 'NEWTONS_FIRST_LAW', description: 'Law of inertia' },
  { parentCode: 'NEWTONS_LAWS', name: 'Second Law (F = ma)', code: 'NEWTONS_SECOND_LAW', description: 'Force equals mass times acceleration' },
  { parentCode: 'NEWTONS_LAWS', name: 'Third Law (Action-Reaction)', code: 'NEWTONS_THIRD_LAW', description: 'Equal and opposite forces' },
  { parentCode: 'NEWTONS_LAWS', name: 'Applications of Newton\'s Laws', code: 'NEWTONS_LAWS_APPLICATIONS', description: 'Real-world applications' },
  
  // Under Friction
  { parentCode: 'FRICTION', name: 'Static Friction', code: 'STATIC_FRICTION', description: 'Friction when object is at rest' },
  { parentCode: 'FRICTION', name: 'Kinetic Friction', code: 'KINETIC_FRICTION', description: 'Friction when object is moving' },
  { parentCode: 'FRICTION', name: 'Rolling Friction', code: 'ROLLING_FRICTION', description: 'Friction in rolling motion' },
  { parentCode: 'FRICTION', name: 'Coefficient of Friction', code: 'COEFFICIENT_OF_FRICTION', description: 'Friction coefficient calculations' },
  
  // Under Kinetic Energy
  { parentCode: 'KINETIC_ENERGY', name: 'Translational Kinetic Energy', code: 'TRANSLATIONAL_KINETIC_ENERGY', description: 'Energy of linear motion' },
  { parentCode: 'KINETIC_ENERGY', name: 'Rotational Kinetic Energy', code: 'ROTATIONAL_KINETIC_ENERGY', description: 'Energy of rotational motion' },
  { parentCode: 'KINETIC_ENERGY', name: 'Kinetic Energy and Velocity', code: 'KINETIC_ENERGY_VELOCITY', description: 'Relationship between KE and velocity' },
  
  // Under Potential Energy
  { parentCode: 'POTENTIAL_ENERGY', name: 'Gravitational Potential Energy', code: 'GRAVITATIONAL_POTENTIAL_ENERGY', description: 'Energy due to height' },
  { parentCode: 'POTENTIAL_ENERGY', name: 'Elastic Potential Energy', code: 'ELASTIC_POTENTIAL_ENERGY', description: 'Energy in springs' },
  { parentCode: 'POTENTIAL_ENERGY', name: 'Electric Potential Energy', code: 'ELECTRIC_POTENTIAL_ENERGY', description: 'Energy in electric fields' },
  
  // Under Collisions
  { parentCode: 'COLLISIONS', name: 'Elastic Collisions', code: 'ELASTIC_COLLISIONS', description: 'Collisions with energy conservation' },
  { parentCode: 'COLLISIONS', name: 'Inelastic Collisions', code: 'INELASTIC_COLLISIONS', description: 'Collisions with energy loss' },
  { parentCode: 'COLLISIONS', name: 'Perfectly Inelastic Collisions', code: 'PERFECTLY_INELASTIC_COLLISIONS', description: 'Objects stick together' },
  { parentCode: 'COLLISIONS', name: 'Collision Analysis', code: 'COLLISION_ANALYSIS', description: 'Mathematical analysis of collisions' },
  
  // Under Satellite Motion
  { parentCode: 'SATELLITE_MOTION', name: 'Orbital Velocity', code: 'ORBITAL_VELOCITY', description: 'Speed for circular orbit' },
  { parentCode: 'SATELLITE_MOTION', name: 'Geostationary Satellites', code: 'GEOSTATIONARY_SATELLITES', description: 'Satellites with fixed position' },
  { parentCode: 'SATELLITE_MOTION', name: 'Polar Satellites', code: 'POLAR_SATELLITES', description: 'Satellites in polar orbit' },
  { parentCode: 'SATELLITE_MOTION', name: 'Kepler\'s Laws', code: 'KEPLERS_LAWS', description: 'Laws of planetary motion' },
];

export async function seedThirdLevelSubtopics() {
  try {
    await dbConnect();
    console.log('🌱 Starting third-level subtopic seeding...');

    // Get the Mechanics topic
    const mechanicsTopic = await getTopicByCode('MECHANICS');
    if (!mechanicsTopic) {
      throw new Error('Mechanics topic not found. Please run basic seeding first.');
    }

    let createdCount = 0;
    let skippedCount = 0;
    
    for (const subtopicData of thirdLevelSubtopicData) {
      try {
        // Get the parent subtopic
        const parentSubtopic = await getSubtopicByCode(subtopicData.parentCode);
        if (!parentSubtopic) {
          console.log(`⚠️  Parent subtopic ${subtopicData.parentCode} not found, skipping ${subtopicData.name}`);
          continue;
        }

        // Create the third-level subtopic
        await createSubtopic({
          name: subtopicData.name,
          code: subtopicData.code,
          description: subtopicData.description,
          topic: mechanicsTopic._id,
          parentSubtopic: parentSubtopic._id,
        });
        
        console.log(`✅ Created third-level subtopic: ${subtopicData.name} under ${subtopicData.parentCode}`);
        createdCount++;
        
      } catch (error: unknown) {
        const err = error as { code?: number };
        if (err.code === 11000) {
          console.log(`⏭️  Third-level subtopic ${subtopicData.name} already exists, skipping...`);
          skippedCount++;
        } else {
          console.error(`❌ Error creating third-level subtopic ${subtopicData.name}:`, error);
        }
      }
    }

    console.log('✅ Third-level subtopic seeding completed successfully!');
    console.log(`📊 Summary: Created ${createdCount} new subtopics, ${skippedCount} already existed`);
    
  } catch (error) {
    console.error('❌ Error seeding third-level subtopics:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedThirdLevelSubtopics()
    .then(() => {
      console.log('🎉 Third-level subtopic seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Third-level subtopic seeding failed:', error);
      process.exit(1);
    });
} 