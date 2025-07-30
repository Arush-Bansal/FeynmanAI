import { GoogleGenerativeAI } from '@google/generative-ai';  
import { NextResponse } from 'next/server';  
import { config } from 'dotenv';
import { authOptions } from "@/lib/auth"
import { analyzeFeynmanExplanationTool, generateFeynmanPrompt } from '@/features/gemini';
import { getServerSession } from 'next-auth';
import dbConnect from '@/features/db/dbConnect';
import { getUserByEmail } from '@/features/db/data/users';
import { completePracticeSession } from '@/features/db/data/practiceSessions';

config();

// Function to transform Gemini analysis to database format
const transformAnalysisToDbFormat = (analysis: Record<string, unknown>) => {
  return {
    coveredTopics: Array.isArray(analysis.coveredTopics) 
      ? analysis.coveredTopics.map((item: Record<string, unknown>) => String(item.topicName || '')).filter(Boolean) 
      : [],
    missedTopics: Array.isArray(analysis.coveredTopics) 
      ? analysis.coveredTopics.filter((item: Record<string, unknown>) => !item.covered).map((item: Record<string, unknown>) => String(item.topicName || '')).filter(Boolean) 
      : [],
    detailedAnalysis: typeof analysis.detailedAnalysis === 'string' ? analysis.detailedAnalysis : '',
    sideQuestions: Array.isArray(analysis.sideQuestions) 
      ? analysis.sideQuestions.map((item: Record<string, unknown>) => `${String(item.question || '')}: ${String(item.answer || '')}`).filter(Boolean) 
      : [],
    similarTopics: Array.isArray(analysis.similarTopics) ? analysis.similarTopics.map(item => String(item)) : [],
    overallScore: typeof analysis.overallScore === 'number' ? analysis.overallScore : 0,
    strengths: [], // Will be extracted from detailedAnalysis if needed
    weaknesses: [], // Will be extracted from detailedAnalysis if needed
    recommendations: [] // Will be extracted from detailedAnalysis if needed
  };
};

export async function POST(request: Request) {  
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
;
  
  try {
    await dbConnect();
    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const requestBody = await request.json();
    const { topic, exam, subject, subtopic, keyPoints, transcript, sessionId } = requestBody;
    
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
    const prompt = generateFeynmanPrompt(topic, exam, subject, subtopic, keyPoints, transcript);
    
    const result = await model.generateContent([prompt]);  
    const response = result.response;
    
    const responseText = response.text();
    if (response.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
      const functionCall = response.candidates[0].content.parts[0].functionCall;
      const analysis = functionCall.args as Record<string, unknown>;

      // Save the analysis to the database if sessionId is provided
      if (sessionId) {
        console.log(`Attempting to save analysis for sessionId: ${sessionId}`);
        try {
          // Transform the analysis to match database schema
          const dbAnalysis = transformAnalysisToDbFormat(analysis);
          console.log("Transformed analysis for DB:", JSON.stringify(dbAnalysis, null, 2));
          
          // Update the practice session with the analysis
          const updatedSession = await completePracticeSession(sessionId, dbAnalysis);
          if (updatedSession) {
            console.log('Analysis saved to database successfully for session:', updatedSession._id);
          } else {
            console.log('Could not find practice session to update for sessionId:', sessionId);
          }
        } catch (dbError) {
          console.error('Error saving analysis to database:', dbError);
          // Continue with the response even if database save fails
        }
      } else {
        console.log("No sessionId provided, skipping database save.");
      }

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