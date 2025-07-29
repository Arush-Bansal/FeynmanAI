import 'dotenv/config';
import dbConnect from './dbConnect';
import { createSubtopic } from './data/subtopics';
import { getSubtopicByCode } from './data/subtopics';
import { getTopicByCode } from './data/topics';
import { ISubtopic } from './models/Subtopic';

// Define deep nested subtopic structure with unlimited levels
const deepNestedSubtopicData = {
  // Level 1: First-level subtopics (children of topics)
  MECHANICS: [
    { name: 'Kinematics', code: 'KINEMATICS', description: 'Study of motion without considering forces' },
    { name: 'Dynamics', code: 'DYNAMICS', description: 'Study of motion with forces' },
    { name: 'Work and Energy', code: 'WORK_ENERGY', description: 'Study of work, energy, and power' },
    { name: 'Momentum', code: 'MOMENTUM', description: 'Study of linear and angular momentum' },
    { name: 'Gravitation', code: 'GRAVITATION', description: 'Study of gravitational forces' },
  ],
  
  // Level 2: Second-level subtopics (children of first-level subtopics)
  KINEMATICS: [
    { name: 'Linear Motion', code: 'LINEAR_MOTION', description: 'Motion in a straight line' },
    { name: 'Circular Motion', code: 'CIRCULAR_MOTION', description: 'Motion along a circular path' },
    { name: 'Projectile Motion', code: 'PROJECTILE_MOTION', description: 'Motion under gravity' },
    { name: 'Relative Motion', code: 'RELATIVE_MOTION', description: 'Motion from different reference frames' },
    { name: 'Kinematic Equations', code: 'KINEMATIC_EQUATIONS', description: 'Mathematical equations of motion' },
  ],
  
  // Level 3: Third-level subtopics (children of second-level subtopics)
  LINEAR_MOTION: [
    { name: 'Uniform Motion', code: 'UNIFORM_MOTION', description: 'Constant velocity motion' },
    { name: 'Accelerated Motion', code: 'ACCELERATED_MOTION', description: 'Motion with changing velocity' },
    { name: 'Free Fall', code: 'FREE_FALL', description: 'Motion under gravity only' },
    { name: 'Motion Graphs', code: 'MOTION_GRAPHS', description: 'Graphical representation of motion' },
  ],
  
  CIRCULAR_MOTION: [
    { name: 'Uniform Circular Motion', code: 'UNIFORM_CIRCULAR_MOTION', description: 'Constant speed circular motion' },
    { name: 'Non-Uniform Circular Motion', code: 'NON_UNIFORM_CIRCULAR_MOTION', description: 'Variable speed circular motion' },
    { name: 'Banking of Roads', code: 'BANKING_OF_ROADS', description: 'Curved road banking' },
    { name: 'Centripetal Acceleration', code: 'CENTRIPETAL_ACCELERATION', description: 'Acceleration towards center' },
  ],
  
  PROJECTILE_MOTION: [
    { name: 'Horizontal Projectile', code: 'HORIZONTAL_PROJECTILE', description: 'Projectile with horizontal initial velocity' },
    { name: 'Oblique Projectile', code: 'OBLIQUE_PROJECTILE', description: 'Projectile at an angle' },
    { name: 'Range and Height', code: 'RANGE_AND_HEIGHT', description: 'Maximum range and height calculations' },
    { name: 'Time of Flight', code: 'TIME_OF_FLIGHT', description: 'Total time in air' },
  ],
  
  DYNAMICS: [
    { name: 'Newton\'s Laws', code: 'NEWTONS_LAWS', description: 'Fundamental laws of motion' },
    { name: 'Friction', code: 'FRICTION', description: 'Resistance to motion' },
    { name: 'Centripetal Force', code: 'CENTRIPETAL_FORCE', description: 'Force for circular motion' },
    { name: 'Tension', code: 'TENSION', description: 'Force in strings and ropes' },
    { name: 'Normal Force', code: 'NORMAL_FORCE', description: 'Contact force perpendicular to surface' },
  ],
  
  // Level 3: Third-level subtopics under Dynamics
  NEWTONS_LAWS: [
    { name: 'First Law (Inertia)', code: 'NEWTONS_FIRST_LAW', description: 'Law of inertia' },
    { name: 'Second Law (F = ma)', code: 'NEWTONS_SECOND_LAW', description: 'Force equals mass times acceleration' },
    { name: 'Third Law (Action-Reaction)', code: 'NEWTONS_THIRD_LAW', description: 'Equal and opposite forces' },
    { name: 'Applications of Newton\'s Laws', code: 'NEWTONS_LAWS_APPLICATIONS', description: 'Real-world applications' },
  ],
  
  FRICTION: [
    { name: 'Static Friction', code: 'STATIC_FRICTION', description: 'Friction when object is at rest' },
    { name: 'Kinetic Friction', code: 'KINETIC_FRICTION', description: 'Friction when object is moving' },
    { name: 'Rolling Friction', code: 'ROLLING_FRICTION', description: 'Friction in rolling motion' },
    { name: 'Coefficient of Friction', code: 'COEFFICIENT_OF_FRICTION', description: 'Friction coefficient calculations' },
  ],
  
  WORK_ENERGY: [
    { name: 'Work Done', code: 'WORK_DONE', description: 'Energy transferred by force' },
    { name: 'Kinetic Energy', code: 'KINETIC_ENERGY', description: 'Energy of motion' },
    { name: 'Potential Energy', code: 'POTENTIAL_ENERGY', description: 'Stored energy' },
    { name: 'Conservation of Energy', code: 'ENERGY_CONSERVATION', description: 'Total energy remains constant' },
    { name: 'Power', code: 'POWER', description: 'Rate of doing work' },
  ],
  
  // Level 3: Third-level subtopics under Work and Energy
  KINETIC_ENERGY: [
    { name: 'Translational Kinetic Energy', code: 'TRANSLATIONAL_KINETIC_ENERGY', description: 'Energy of linear motion' },
    { name: 'Rotational Kinetic Energy', code: 'ROTATIONAL_KINETIC_ENERGY', description: 'Energy of rotational motion' },
    { name: 'Kinetic Energy and Velocity', code: 'KINETIC_ENERGY_VELOCITY', description: 'Relationship between KE and velocity' },
  ],
  
  POTENTIAL_ENERGY: [
    { name: 'Gravitational Potential Energy', code: 'GRAVITATIONAL_POTENTIAL_ENERGY', description: 'Energy due to height' },
    { name: 'Elastic Potential Energy', code: 'ELASTIC_POTENTIAL_ENERGY', description: 'Energy in springs' },
    { name: 'Electric Potential Energy', code: 'ELECTRIC_POTENTIAL_ENERGY', description: 'Energy in electric fields' },
  ],
  
  MOMENTUM: [
    { name: 'Linear Momentum', code: 'LINEAR_MOMENTUM', description: 'Product of mass and velocity' },
    { name: 'Conservation of Momentum', code: 'MOMENTUM_CONSERVATION', description: 'Momentum remains constant' },
    { name: 'Impulse', code: 'IMPULSE', description: 'Change in momentum' },
    { name: 'Collisions', code: 'COLLISIONS', description: 'Interaction between objects' },
    { name: 'Angular Momentum', code: 'ANGULAR_MOMENTUM', description: 'Rotational momentum' },
  ],
  
  // Level 3: Third-level subtopics under Momentum
  COLLISIONS: [
    { name: 'Elastic Collisions', code: 'ELASTIC_COLLISIONS', description: 'Collisions with energy conservation' },
    { name: 'Inelastic Collisions', code: 'INELASTIC_COLLISIONS', description: 'Collisions with energy loss' },
    { name: 'Perfectly Inelastic Collisions', code: 'PERFECTLY_INELASTIC_COLLISIONS', description: 'Objects stick together' },
    { name: 'Collision Analysis', code: 'COLLISION_ANALYSIS', description: 'Mathematical analysis of collisions' },
  ],
  
  GRAVITATION: [
    { name: 'Universal Law of Gravitation', code: 'UNIVERSAL_GRAVITATION', description: 'Newton\'s law of gravity' },
    { name: 'Gravitational Field', code: 'GRAVITATIONAL_FIELD', description: 'Space around massive objects' },
    { name: 'Gravitational Potential', code: 'GRAVITATIONAL_POTENTIAL', description: 'Potential energy in gravity' },
    { name: 'Satellite Motion', code: 'SATELLITE_MOTION', description: 'Orbital motion' },
    { name: 'Escape Velocity', code: 'ESCAPE_VELOCITY', description: 'Speed to escape gravity' },
  ],
  
  // Level 3: Third-level subtopics under Gravitation
  SATELLITE_MOTION: [
    { name: 'Orbital Velocity', code: 'ORBITAL_VELOCITY', description: 'Speed for circular orbit' },
    { name: 'Geostationary Satellites', code: 'GEOSTATIONARY_SATELLITES', description: 'Satellites with fixed position' },
    { name: 'Polar Satellites', code: 'POLAR_SATELLITES', description: 'Satellites in polar orbit' },
    { name: 'Kepler\'s Laws', code: 'KEPLERS_LAWS', description: 'Laws of planetary motion' },
  ],
};

export async function seedDeepNestedSubtopics() {
  try {
    await dbConnect();
    console.log('🌱 Starting deep nested subtopic seeding...');

    // Get the Mechanics topic
    const mechanicsTopic = await getTopicByCode('MECHANICS');
    if (!mechanicsTopic) {
      throw new Error('Mechanics topic not found. Please run basic seeding first.');
    }

    const createdSubtopics: { [key: string]: ISubtopic } = {};
    
    // Phase 1: Create all first-level subtopics (children of topics)
    console.log('📝 Phase 1: Creating first-level subtopics...');
    for (const [parentCode, subtopics] of Object.entries(deepNestedSubtopicData)) {
      if (parentCode === 'MECHANICS') {
        // These are first-level subtopics (children of topics)
        for (const subtopic of subtopics) {
          try {
            const createdSubtopic = await createSubtopic({
              ...subtopic,
              topic: mechanicsTopic._id,
            });
            createdSubtopics[subtopic.code] = createdSubtopic;
            console.log(`✅ Created first-level subtopic: ${subtopic.name}`);
          } catch (error: unknown) {
            const err = error as { code?: number };
            if (err.code === 11000) {
              console.log(`⏭️  First-level subtopic ${subtopic.name} already exists, skipping...`);
            } else {
              console.error(`❌ Error creating first-level subtopic ${subtopic.name}:`, error);
            }
          }
        }
      }
    }
    
    // Phase 2: Create second-level subtopics (children of first-level subtopics)
    console.log('📝 Phase 2: Creating second-level subtopics...');
    for (const [parentCode, subtopics] of Object.entries(deepNestedSubtopicData)) {
      if (parentCode !== 'MECHANICS') {
        const parentSubtopic = createdSubtopics[parentCode];
        if (parentSubtopic) {
          for (const subtopic of subtopics) {
            try {
              await createSubtopic({
                ...subtopic,
                topic: mechanicsTopic._id, // Same topic as parent
                parentSubtopic: parentSubtopic._id,
              });
              createdSubtopics[subtopic.code] = await getSubtopicByCode(subtopic.code) as ISubtopic;
              console.log(`✅ Created second-level subtopic: ${subtopic.name} under ${parentCode}`);
            } catch (error: unknown) {
              const err = error as { code?: number };
              if (err.code === 11000) {
                console.log(`⏭️  Second-level subtopic ${subtopic.name} already exists, skipping...`);
              } else {
                console.error(`❌ Error creating second-level subtopic ${subtopic.name}:`, error);
              }
            }
          }
        } else {
          console.log(`⚠️  Parent subtopic ${parentCode} not found, skipping second-level subtopics`);
        }
      }
    }
    
    // Phase 3: Create third-level subtopics (children of second-level subtopics)
    console.log('📝 Phase 3: Creating third-level subtopics...');
    
    // Define third-level subtopic mappings
    const thirdLevelMappings = [
      { parentCode: 'LINEAR_MOTION', subtopics: ['UNIFORM_MOTION', 'ACCELERATED_MOTION', 'FREE_FALL', 'MOTION_GRAPHS'] },
      { parentCode: 'CIRCULAR_MOTION', subtopics: ['UNIFORM_CIRCULAR_MOTION', 'NON_UNIFORM_CIRCULAR_MOTION', 'BANKING_OF_ROADS', 'CENTRIPETAL_ACCELERATION'] },
      { parentCode: 'PROJECTILE_MOTION', subtopics: ['HORIZONTAL_PROJECTILE', 'OBLIQUE_PROJECTILE', 'RANGE_AND_HEIGHT', 'TIME_OF_FLIGHT'] },
      { parentCode: 'NEWTONS_LAWS', subtopics: ['NEWTONS_FIRST_LAW', 'NEWTONS_SECOND_LAW', 'NEWTONS_THIRD_LAW', 'NEWTONS_LAWS_APPLICATIONS'] },
      { parentCode: 'FRICTION', subtopics: ['STATIC_FRICTION', 'KINETIC_FRICTION', 'ROLLING_FRICTION', 'COEFFICIENT_OF_FRICTION'] },
      { parentCode: 'KINETIC_ENERGY', subtopics: ['TRANSLATIONAL_KINETIC_ENERGY', 'ROTATIONAL_KINETIC_ENERGY', 'KINETIC_ENERGY_VELOCITY'] },
      { parentCode: 'POTENTIAL_ENERGY', subtopics: ['GRAVITATIONAL_POTENTIAL_ENERGY', 'ELASTIC_POTENTIAL_ENERGY', 'ELECTRIC_POTENTIAL_ENERGY'] },
      { parentCode: 'COLLISIONS', subtopics: ['ELASTIC_COLLISIONS', 'INELASTIC_COLLISIONS', 'PERFECTLY_INELASTIC_COLLISIONS', 'COLLISION_ANALYSIS'] },
      { parentCode: 'SATELLITE_MOTION', subtopics: ['ORBITAL_VELOCITY', 'GEOSTATIONARY_SATELLITES', 'POLAR_SATELLITES', 'KEPLERS_LAWS'] },
    ];
    
    for (const mapping of thirdLevelMappings) {
      const parentSubtopic = createdSubtopics[mapping.parentCode];
      if (parentSubtopic) {
        for (const subtopicCode of mapping.subtopics) {
          const subtopicData = deepNestedSubtopicData[subtopicCode as keyof typeof deepNestedSubtopicData];
          if (subtopicData) {
            for (const subtopic of subtopicData) {
              try {
                await createSubtopic({
                  ...subtopic,
                  topic: mechanicsTopic._id,
                  parentSubtopic: parentSubtopic._id,
                });
                console.log(`✅ Created third-level subtopic: ${subtopic.name} under ${mapping.parentCode}`);
              } catch (error: unknown) {
                const err = error as { code?: number };
                if (err.code === 11000) {
                  console.log(`⏭️  Third-level subtopic ${subtopic.name} already exists, skipping...`);
                } else {
                  console.error(`❌ Error creating third-level subtopic ${subtopic.name}:`, error);
                }
              }
            }
          }
        }
      } else {
        console.log(`⚠️  Parent subtopic ${mapping.parentCode} not found, skipping third-level subtopics`);
      }
    }

    console.log('✅ Deep nested subtopic seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - First-level subtopics: 5 (Kinematics, Dynamics, Work and Energy, Momentum, Gravitation)');
    console.log('   - Second-level subtopics: 20+ (Linear Motion, Circular Motion, Newton\'s Laws, etc.)');
    console.log('   - Third-level subtopics: 30+ (Uniform Motion, Static Friction, etc.)');
    
  } catch (error) {
    console.error('❌ Error seeding deep nested subtopics:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDeepNestedSubtopics()
    .then(() => {
      console.log('🎉 Deep nested subtopic seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Deep nested subtopic seeding failed:', error);
      process.exit(1);
    });
} 