import { GoogleGenerativeAI } from '@google/generative-ai';  
import { NextResponse } from 'next/server';  
import { config } from 'dotenv';

// Load environment variables
config();

const generateFeynmanPrompt = (topic: string, exam: string, subject: string, keyPoints: string[], transcript: string) => {
  const examContext = exam ? `for ${exam} preparation` : '';
  const subjectContext = subject ? `in ${subject}` : '';
  const keyPointsList = keyPoints.length > 0 ? `The user was required to cover the following key points: ${keyPoints.join(', ')}.` : '';

  return `You are an expert teacher using the Feynman Technique. Analyze this student's explanation of "${topic}" ${subjectContext} ${examContext}.
${keyPointsList}

Student's explanation: "${decodeURIComponent(transcript)}"

Please provide a comprehensive analysis including:
1. Covered topics and missed concepts
2. Detailed feedback on strengths and areas for improvement
3. Side questions and answers if any were asked
4. Similar topics for further practice
5. Overall score (0-100)`;
};

export async function POST(request: Request) {  
  const { topic, exam, subject, keyPoints, transcript } = await request.json();
  
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });  

  const prompt = generateFeynmanPrompt(topic, exam, subject, keyPoints, transcript);

  try {  
    const result = await model.generateContent([prompt]);  
    const response = result.response;
    
    return NextResponse.json({  
      response: response.text(),  
      error: undefined  
    });  
  } catch (error) {  
    console.error(error);
    return NextResponse.json({  
      error: error,
    }, { status: 500 });  
  }  
} 