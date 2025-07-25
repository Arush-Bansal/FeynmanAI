import { GoogleGenerativeAI } from '@google/generative-ai';  
import { NextResponse } from 'next/server';  
import { config } from 'dotenv';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { analyzeFeynmanExplanationTool, generateFeynmanPrompt } from '@/features/feynman-utils';

// Load environment variables
config();

export async function POST(request: Request) {  
  const startTime = Date.now();
  console.log('=== FEYNMAN ANALYSIS REQUEST START ===');
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let session: any = null;
  
  try {
    // Check authentication
    console.log('Checking authentication...');
    session = await getServerSession(authOptions);
    
    if (!session?.user) {
      console.log('❌ Authentication failed - no session or user');
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    
    console.log(`✅ Authentication successful for user: ${session.user.email}`);

    // Parse request body
    console.log('Parsing request body...');
    const requestBody = await request.json();
    const { topic, exam, subject, keyPoints, transcript } = requestBody;
    
    console.log('Request details:', {
      topic,
      exam,
      subject,
      hasKeyPoints: !!keyPoints,
      transcriptLength: transcript?.length || 0,
      userEmail: session.user.email
    });
    
    // Validate required fields
    console.log('Validating required fields...');
    const missingFields = [];
    if (!topic) missingFields.push('topic');
    if (!exam) missingFields.push('exam');
    if (!subject) missingFields.push('subject');
    if (!transcript) missingFields.push('transcript');
    
    if (missingFields.length > 0) {
      console.log(`❌ Missing required fields: ${missingFields.join(', ')}`);
      return NextResponse.json({ error: "Missing required fields", missingFields }, { status: 400 });
    }
    
    console.log('✅ All required fields present');

    // Check API key
    console.log('Checking GEMINI_API_KEY...');
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      console.log('❌ GEMINI_API_KEY not set in environment variables');
      return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
    }
    
    console.log('✅ GEMINI_API_KEY found');

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
    console.log('✅ Gemini AI initialized with model:', modelConfig.model);
    console.log('🔧 Tool configuration:', JSON.stringify(analyzeFeynmanExplanationTool, null, 2));

    // Generate prompt
    console.log('Generating Feynman prompt...');
    const prompt = generateFeynmanPrompt(topic, exam, subject, keyPoints, transcript);
    console.log('✅ Prompt generated, length:', prompt.length);
    console.log('📤 PROMPT SENT TO GEMINI:', prompt);

    // Make API call
    console.log('Making Gemini API call...');
    const apiCallStart = Date.now();
    
    const result = await model.generateContent([prompt]);  
    const response = result.response;
    
    const apiCallDuration = Date.now() - apiCallStart;
    console.log(`✅ API call completed in ${apiCallDuration}ms`);

    // Process response
    console.log('Processing API response...');
    const responseText = response.text();
    console.log('Response text length:', responseText.length);
    console.log('📥 GEMINI RESPONSE:', responseText);
    
    // Debug response structure
    console.log('🔍 RESPONSE STRUCTURE DEBUG:', {
      hasCandidates: !!response.candidates,
      candidatesLength: response.candidates?.length || 0,
      hasContent: !!response.candidates?.[0]?.content,
      hasParts: !!response.candidates?.[0]?.content?.parts,
      partsLength: response.candidates?.[0]?.content?.parts?.length || 0,
      hasFunctionCall: !!response.candidates?.[0]?.content?.parts?.[0]?.functionCall
    });
    
    if (response.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
      console.log('✅ Function call detected in response');
      const functionCall = response.candidates[0].content.parts[0].functionCall;
      console.log('Function call details:', {
        name: functionCall.name,
        argsLength: functionCall.args ? Object.keys(functionCall.args).length : 0
      });
      console.log('📤 FUNCTION CALL SENT TO FRONTEND:', JSON.stringify(functionCall, null, 2));
      
      const totalDuration = Date.now() - startTime;
      console.log(`=== FEYNMAN ANALYSIS REQUEST SUCCESS (${totalDuration}ms) ===`);
      
      const responseToFrontend = {
        functionCall: functionCall,
        error: undefined
      };
      console.log('📤 FINAL RESPONSE SENT TO FRONTEND:', JSON.stringify(responseToFrontend, null, 2));
      
      return NextResponse.json(responseToFrontend);
    } else {
      console.log('⚠️ No function call detected, falling back to text response');
      console.log('✅ Regular text response received');
      const totalDuration = Date.now() - startTime;
      console.log(`=== FEYNMAN ANALYSIS REQUEST SUCCESS (${totalDuration}ms) ===`);
      
      const responseToFrontend = {  
        response: responseText,  
        error: undefined  
      };
      console.log('📤 FINAL RESPONSE SENT TO FRONTEND:', JSON.stringify(responseToFrontend, null, 2));
      
      return NextResponse.json(responseToFrontend);  
    }
    
  } catch (error) {  
    const totalDuration = Date.now() - startTime;
    console.error(`=== FEYNMAN ANALYSIS REQUEST FAILED (${totalDuration}ms) ===`);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      userEmail: session?.user?.email || 'unknown'
    });
    
    return NextResponse.json({  
      error: "Failed to process analysis request",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });  
  }  
} 