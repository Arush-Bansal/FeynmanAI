import { GoogleGenerativeAI, Tool } from '@google/generative-ai';  
import { NextResponse } from 'next/server';  
import { config } from 'dotenv';

// Load environment variables
config();

const analyzeFeynmanExplanationTool: Tool = {
  functionDeclarations: [{
    name: "analyzeFeynmanExplanation",
    description: "Analyzes a student's explanation of a topic using the Feynman Technique and provides structured feedback.",
    parameters: {
      type: "object" as any,
      properties: {
        exam: {
          type: "string" as any,
          description: "The exam context for the topic (e.g., 'JEE', 'NEET', 'UPSC')."
        },
        subject: {
          type: "string" as any,
          description: "The subject of the topic (e.g., 'Physics', 'Chemistry', 'Biology')."
        },
        topic: {
          type: "string" as any,
          description: "The main topic the student is explaining."
        },
        keyPoints: {
          type: "array" as any,
          items: {
            type: "string" as any
          },
          description: "A list of key points the user was required to cover."
        },
        userTranscript: {
          type: "string" as any,
          description: "The full transcript of the user's explanation."
        },
        coveredTopics: {
          type: "array" as any,
          items: {
            type: "object" as any,
            properties: {
              topicName: {
                type: "string" as any,
                description: "Name of the sub-topic or key concept."
              },
              covered: {
                type: "boolean" as any,
                description: "True if the topic was covered, false otherwise."
              }
            },
            required: ["topicName", "covered"]
          },
          description: "A list of sub-topics or key concepts and whether they were covered by the user."
        },
        detailedAnalysis: {
          type: "string" as any,
          description: "A detailed analysis of the user's explanation, including strengths, areas for improvement, and specific feedback."
        },
        sideQuestions: {
          type: "array" as any,
          items: {
            type: "object" as any,
            properties: {
              question: {
                type: "string" as any,
                description: "A side question asked by the user."
              },
              answer: {
                type: "string" as any,
                description: "The answer to the side question."
              }
            },
            required: ["question", "answer"]
          },
          description: "A list of any side questions asked by the user in the transcript and their answers."
        },
        similarTopics: {
          type: "array" as any,
          items: {
            type: "string" as any
          },
          description: "A list of topics similar to this one that the user can practice."
        },
        overallScore: {
          type: "number" as any,
          description: "An overall score (0-100) for the user's performance based on their explanation."
        }
      },
      required: ["exam", "subject", "topic", "keyPoints", "userTranscript", "coveredTopics", "detailedAnalysis", "sideQuestions", "similarTopics", "overallScore"]
    }
  }]
};

const generateFeynmanPrompt = (topic: string, exam: string, subject: string, keyPoints: string[], transcript: string) => {
  const examContext = exam ? `for ${exam} preparation` : '';
  const subjectContext = subject ? `in ${subject}` : '';
  const keyPointsList = keyPoints.length > 0 ? `The user was required to cover the following key points: ${keyPoints.join(', ')}.` : '';

  return `You are an expert teacher using the Feynman Technique. Analyze this student's explanation of "${topic}" ${subjectContext} ${examContext}.
${keyPointsList}

Student's explanation: "${decodeURIComponent(transcript)}"

Please call the 'analyzeFeynmanExplanation' function with a comprehensive analysis based on the student's explanation. Ensure all parameters are filled accurately.`;
};

export async function POST(request: Request) {  
  const { topic, exam, subject, keyPoints, transcript } = await request.json();
  
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);  
  const modelConfig = { model: "gemini-2.5-flash", tools: [analyzeFeynmanExplanationTool] };
  const model = genAI.getGenerativeModel(modelConfig);  

  const prompt = generateFeynmanPrompt(topic, exam, subject, keyPoints, transcript);

  try {  
    const result = await model.generateContent([prompt]);  
    
    const response = result.response;

    if (response.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
      return NextResponse.json({
        functionCall: response.candidates[0].content.parts[0].functionCall,
        error: undefined
      });
    } else {
      return NextResponse.json({  
        response: response.text(),  
        error: undefined  
      });  
    }
  } catch (error) {  
    console.error(error);
    return NextResponse.json({  
      error: error,
    }, { status: 500 });  
  }  
} 