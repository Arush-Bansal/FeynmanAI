import 'dotenv/config';
import dbConnect from './dbConnect';
import { createSubtopic } from './data/subtopics';
import { createConcept } from './data/concepts';
import { getTopicByCode } from './data/topics';
import { ISubtopic } from './models/Subtopic';
import { ITopic } from './models';

// Multi-level subtopic structure with concepts
const multiLevelContent = {
  // Level 1: First-level subtopics (children of topics)
  MECHANICS: {
    subtopics: [
      { name: 'Kinematics', code: 'KINEMATICS', description: 'Study of motion without considering forces' },
      { name: 'Dynamics', code: 'DYNAMICS', description: 'Study of motion with forces' },
      { name: 'Work and Energy', code: 'WORK_ENERGY', description: 'Study of work, energy, and power' },
      { name: 'Momentum', code: 'MOMENTUM', description: 'Study of linear and angular momentum' },
      { name: 'Gravitation', code: 'GRAVITATION', description: 'Study of gravitational forces' },
    ],
    // Level 2: Second-level subtopics
    nested: {
      KINEMATICS: {
        subtopics: [
          { name: 'Linear Motion', code: 'LINEAR_MOTION', description: 'Motion in a straight line' },
          { name: 'Circular Motion', code: 'CIRCULAR_MOTION', description: 'Motion along a circular path' },
          { name: 'Projectile Motion', code: 'PROJECTILE_MOTION', description: 'Motion under gravity' },
          { name: 'Relative Motion', code: 'RELATIVE_MOTION', description: 'Motion from different reference frames' },
        ],
        // Level 3: Third-level subtopics
        nested: {
          LINEAR_MOTION: {
            subtopics: [
              { name: 'Uniform Motion', code: 'UNIFORM_MOTION', description: 'Constant velocity motion' },
              { name: 'Accelerated Motion', code: 'ACCELERATED_MOTION', description: 'Motion with changing velocity' },
              { name: 'Free Fall', code: 'FREE_FALL', description: 'Motion under gravity only' },
            ],
            // Level 4: Fourth-level subtopics
            nested: {
              UNIFORM_MOTION: {
                concepts: [
                  {
                    name: 'Uniform Motion Basics',
                    code: 'UNIFORM_MOTION_BASICS',
                    description: 'Understanding constant velocity motion',
                    keyPoints: ['Constant velocity', 'No acceleration', 'Linear displacement-time graph'],
                    concepts: 'Uniform motion occurs when an object moves with constant velocity, meaning no acceleration is present. The displacement-time graph is a straight line.',
                    difficulty: 'BEGINNER',
                    estimatedTime: 15
                  },
                  {
                    name: 'Uniform Motion Equations',
                    code: 'UNIFORM_MOTION_EQUATIONS',
                    description: 'Mathematical equations for uniform motion',
                    keyPoints: ['v = constant', 's = vt', 's = s₀ + vt'],
                    concepts: 'The fundamental equation for uniform motion is s = s₀ + vt, where s is displacement, s₀ is initial position, v is constant velocity, and t is time.',
                    difficulty: 'INTERMEDIATE',
                    estimatedTime: 20
                  }
                ]
              },
              ACCELERATED_MOTION: {
                concepts: [
                  {
                    name: 'Accelerated Motion Basics',
                    code: 'ACCELERATED_MOTION_BASICS',
                    description: 'Understanding motion with changing velocity',
                    keyPoints: ['Changing velocity', 'Non-zero acceleration', 'Curved displacement-time graph'],
                    concepts: 'Accelerated motion occurs when an object\'s velocity changes over time, resulting in non-zero acceleration.',
                    difficulty: 'BEGINNER',
                    estimatedTime: 15
                  },
                  {
                    name: 'Kinematic Equations',
                    code: 'KINEMATIC_EQUATIONS',
                    description: 'Equations of motion for accelerated motion',
                    keyPoints: ['v = v₀ + at', 's = v₀t + ½at²', 'v² = v₀² + 2as'],
                    concepts: 'The three kinematic equations for uniformly accelerated motion are: v = v₀ + at, s = v₀t + ½at², and v² = v₀² + 2as.',
                    difficulty: 'INTERMEDIATE',
                    estimatedTime: 25
                  }
                ]
              }
            }
          },
          CIRCULAR_MOTION: {
            subtopics: [
              { name: 'Uniform Circular Motion', code: 'UNIFORM_CIRCULAR_MOTION', description: 'Constant speed circular motion' },
              { name: 'Non-Uniform Circular Motion', code: 'NON_UNIFORM_CIRCULAR_MOTION', description: 'Variable speed circular motion' },
            ],
            nested: {
              UNIFORM_CIRCULAR_MOTION: {
                concepts: [
                  {
                    name: 'Uniform Circular Motion Basics',
                    code: 'UNIFORM_CIRCULAR_BASICS',
                    description: 'Understanding constant speed circular motion',
                    keyPoints: ['Constant speed', 'Changing direction', 'Centripetal acceleration'],
                    concepts: 'In uniform circular motion, the speed remains constant but the direction continuously changes, requiring centripetal acceleration.',
                    difficulty: 'INTERMEDIATE',
                    estimatedTime: 20
                  },
                  {
                    name: 'Centripetal Force',
                    code: 'CENTRIPETAL_FORCE',
                    description: 'Force required for circular motion',
                    keyPoints: ['F = mv²/r', 'Always towards center', 'Not a real force'],
                    concepts: 'Centripetal force is the force required to keep an object moving in a circular path, given by F = mv²/r.',
                    difficulty: 'INTERMEDIATE',
                    estimatedTime: 25
                  }
                ]
              }
            }
          }
        }
      },
      DYNAMICS: {
        subtopics: [
          { name: 'Newton\'s Laws', code: 'NEWTONS_LAWS', description: 'Fundamental laws of motion' },
          { name: 'Friction', code: 'FRICTION', description: 'Resistance to motion' },
          { name: 'Centripetal Force', code: 'CENTRIPETAL_FORCE', description: 'Force for circular motion' },
        ],
        nested: {
          NEWTONS_LAWS: {
            subtopics: [
              { name: 'First Law (Inertia)', code: 'NEWTONS_FIRST_LAW', description: 'Law of inertia' },
              { name: 'Second Law (F = ma)', code: 'NEWTONS_SECOND_LAW', description: 'Force equals mass times acceleration' },
              { name: 'Third Law (Action-Reaction)', code: 'NEWTONS_THIRD_LAW', description: 'Equal and opposite forces' },
            ],
            nested: {
              NEWTONS_FIRST_LAW: {
                concepts: [
                  {
                    name: 'Law of Inertia',
                    code: 'LAW_OF_INERTIA',
                    description: 'Understanding Newton\'s First Law',
                    keyPoints: ['Objects at rest stay at rest', 'Objects in motion stay in motion', 'Unless acted upon by force'],
                    concepts: 'Newton\'s First Law states that an object will remain at rest or in uniform motion unless acted upon by an external force.',
                    difficulty: 'BEGINNER',
                    estimatedTime: 15
                  }
                ]
              },
              NEWTONS_SECOND_LAW: {
                concepts: [
                  {
                    name: 'Force and Acceleration',
                    code: 'FORCE_ACCELERATION',
                    description: 'Understanding F = ma',
                    keyPoints: ['F = ma', 'Force causes acceleration', 'Mass resists acceleration'],
                    concepts: 'Newton\'s Second Law states that the acceleration of an object is directly proportional to the net force and inversely proportional to its mass.',
                    difficulty: 'INTERMEDIATE',
                    estimatedTime: 20
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  
  // Chemistry multi-level structure
  PHYSICAL_CHEMISTRY: {
    subtopics: [
      { name: 'Atomic Structure', code: 'ATOMIC_STRUCTURE', description: 'Study of atom composition and properties' },
      { name: 'Chemical Bonding', code: 'CHEMICAL_BONDING', description: 'Study of how atoms combine' },
      { name: 'Chemical Kinetics', code: 'CHEMICAL_KINETICS', description: 'Study of reaction rates' },
    ],
    nested: {
      ATOMIC_STRUCTURE: {
        subtopics: [
          { name: 'Electron Configuration', code: 'ELECTRON_CONFIGURATION', description: 'Arrangement of electrons in atoms' },
          { name: 'Quantum Numbers', code: 'QUANTUM_NUMBERS', description: 'Numbers describing electron properties' },
        ],
        nested: {
          ELECTRON_CONFIGURATION: {
            concepts: [
              {
                name: 'Aufbau Principle',
                code: 'AUFBAU_PRINCIPLE',
                description: 'Electron filling order in atoms',
                keyPoints: ['Lowest energy first', '1s, 2s, 2p, 3s...', 'Energy level diagram'],
                concepts: 'The Aufbau principle states that electrons fill atomic orbitals in order of increasing energy levels.',
                difficulty: 'INTERMEDIATE',
                estimatedTime: 20
              }
            ]
          }
        }
      }
    }
  },
  
  // Mathematics multi-level structure
  ALGEBRA: {
    subtopics: [
      { name: 'Linear Equations', code: 'LINEAR_EQUATIONS', description: 'Study of first-degree equations' },
      { name: 'Quadratic Equations', code: 'QUADRATIC_EQUATIONS', description: 'Study of second-degree equations' },
      { name: 'Matrices', code: 'MATRICES', description: 'Study of rectangular arrays of numbers' },
    ],
    nested: {
      QUADRATIC_EQUATIONS: {
        subtopics: [
          { name: 'Factoring Method', code: 'FACTORING_METHOD', description: 'Solving quadratics by factoring' },
          { name: 'Quadratic Formula', code: 'QUADRATIC_FORMULA', description: 'Using x = (-b ± √(b²-4ac))/2a' },
        ],
        nested: {
          QUADRATIC_FORMULA: {
            concepts: [
              {
                name: 'Quadratic Formula Derivation',
                code: 'QUADRATIC_FORMULA_DERIVATION',
                description: 'How the quadratic formula is derived',
                keyPoints: ['Completing the square', 'ax² + bx + c = 0', 'x = (-b ± √(b²-4ac))/2a'],
                concepts: 'The quadratic formula is derived by completing the square of the general quadratic equation ax² + bx + c = 0.',
                difficulty: 'ADVANCED',
                estimatedTime: 30
              }
            ]
          }
        }
      }
    }
  }
};

export async function seedMultiLevelContent() {
  try {
    await dbConnect();
    console.log('🌱 Seeding multi-level content with concepts...');

    // Get the Mechanics topic
    const mechanicsTopic = await getTopicByCode('MECHANICS');
    const physicalChemistryTopic = await getTopicByCode('PHYSICAL_CHEMISTRY');
    const algebraTopic = await getTopicByCode('ALGEBRA');

    if (!mechanicsTopic || !physicalChemistryTopic || !algebraTopic) {
      throw new Error('Required topics not found. Please run basic seeding first.');
    }

    let totalSubtopics = 0;
    let totalConcepts = 0;

    // Function to recursively create subtopics and concepts
    const createSubtopicsRecursively = async (
      parentTopic: ITopic,
      parentSubtopic: ISubtopic | null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      levelData: any,
      level: number = 1
    ) => {
      if (!levelData.subtopics) return;

      for (const subtopicData of levelData.subtopics) {
        try {
          const createdSubtopic = await createSubtopic({
            ...subtopicData,
            topic: parentTopic._id,
            parentSubtopic: parentSubtopic?._id || null,
          });
          
          console.log(`✅ Created level ${level} subtopic: ${subtopicData.name}`);
          totalSubtopics++;

          // Create concepts for this subtopic if they exist
          if (levelData.nested && levelData.nested[subtopicData.code] && levelData.nested[subtopicData.code].concepts) {
            for (const conceptData of levelData.nested[subtopicData.code].concepts) {
              try {
                await createConcept({
                  ...conceptData,
                  subtopic: createdSubtopic._id,
                });
                console.log(`✅ Created concept: ${conceptData.name}`);
                totalConcepts++;
              } catch (error: unknown) {
                const err = error as { code?: number };
                if (err.code === 11000) {
                  console.log(`⏭️  Concept ${conceptData.name} already exists, skipping...`);
                } else {
                  console.error(`❌ Error creating concept ${conceptData.name}:`, error);
                }
              }
            }
          }

          // Recursively create nested subtopics
          if (levelData.nested && levelData.nested[subtopicData.code] && levelData.nested[subtopicData.code].subtopics) {
            await createSubtopicsRecursively(
              parentTopic,
              createdSubtopic,
              levelData.nested[subtopicData.code],
              level + 1
            );
          }

        } catch (error: unknown) {
          const err = error as { code?: number };
          if (err.code === 11000) {
            console.log(`⏭️  Level ${level} subtopic ${subtopicData.name} already exists, skipping...`);
          } else {
            console.error(`❌ Error creating level ${level} subtopic ${subtopicData.name}:`, error);
          }
        }
      }
    };

    // Create multi-level content for each topic
    const topicsToProcess = [
      { topic: mechanicsTopic, data: multiLevelContent.MECHANICS },
      { topic: physicalChemistryTopic, data: multiLevelContent.PHYSICAL_CHEMISTRY },
      { topic: algebraTopic, data: multiLevelContent.ALGEBRA },
    ];

    for (const { topic, data } of topicsToProcess) {
      console.log(`\n📚 Processing ${topic.name}...`);
      await createSubtopicsRecursively(topic, null, data);
    }

    console.log(`\n✅ Multi-level content seeding completed!`);
    console.log(`📊 Summary:`);
    console.log(`   • Total subtopics created: ${totalSubtopics}`);
    console.log(`   • Total concepts created: ${totalConcepts}`);
    console.log(`   • Multi-level structure: 4 levels deep`);
    console.log(`   • Topics covered: Mechanics, Physical Chemistry, Algebra`);

  } catch (error) {
    console.error('❌ Error seeding multi-level content:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedMultiLevelContent()
    .then(() => {
      console.log('🎉 Multi-level content seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Multi-level content seeding failed:', error);
      process.exit(1);
    });
} 