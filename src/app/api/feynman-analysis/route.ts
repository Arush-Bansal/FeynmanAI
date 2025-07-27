import { GoogleGenerativeAI } from '@google/generative-ai';  
import { NextResponse } from 'next/server';  
import { config } from 'dotenv';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { analyzeFeynmanExplanationTool, generateFeynmanPrompt } from '@/features/gemini';
import { dbConnect, createFeynmanAnalysis } from '@/features/db';

// Load environment variables
config();

export async function POST(request: Request) {  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let session: any = null;
  
  try {
    // Check authentication
    session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const requestBody = await request.json();
    const { topic, exam, subject, keyPoints, transcript } = requestBody;
    
    // Validate required fields
    console.log('Validating required fields...');
    const missingFields = [];
    if (!topic) missingFields.push('topic');
    if (!exam) missingFields.push('exam');
    if (!subject) missingFields.push('subject');
    if (!transcript) missingFields.push('transcript');
    
    if (missingFields.length > 0) {
      return NextResponse.json({ error: "Missing required fields", missingFields }, { status: 400 });
    }
    
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
    }
    
    // Initialize Gemini AI
    console.log('Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(API_KEY);  
    const modelConfig = { 
      model: "gemini-2.5-flash", 
      tools: [analyzeFeynmanExplanationTool],
      generationConfig: {
        temperature: 0.1,
        topP: 0.8,
        topK: 40
      }
    };
    const model = genAI.getGenerativeModel(modelConfig);  
    const prompt = generateFeynmanPrompt(topic, exam, subject, keyPoints, transcript);
    
    const result = await model.generateContent([prompt]);  
    const response = result.response;
    
    // const apiCallDuration = Date.now() - apiCallStart;
    const responseText = response.text();
    if (response.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
      const functionCall = response.candidates[0].content.parts[0].functionCall;
      const analysis = functionCall.args;

      await dbConnect();
      await createFeynmanAnalysis({
        user: session.user.id,
        topic,
        exam,
        subject,
        keyPoints,
        transcript,
        analysis,
      });

      const responseToFrontend = {
        functionCall: functionCall,
        error: undefined
      };
      
      return NextResponse.json(responseToFrontend);
    } else {
      
      const responseToFrontend = {  
        response: responseText,  
        error: undefined  
      };
      
      return NextResponse.json(responseToFrontend);  
    }
    
  } catch (error) {    
    return NextResponse.json({  
      error: "Failed to process analysis request",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });  
  }  
} 