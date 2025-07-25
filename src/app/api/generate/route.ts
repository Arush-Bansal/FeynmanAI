import { GoogleGenerativeAI, Tool } from '@google/generative-ai';  
import { NextResponse } from 'next/server';  
import { config } from 'dotenv';

// Load environment variables
config();

export async function POST(request: Request) {  
  const { prompt, tools } = await request.json();  
  
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);  
  
  const modelConfig: { model: string; tools?: Tool[] } = { model: "gemini-2.5-flash" };
  if (tools && tools.length > 0) {
    modelConfig.tools = tools as Tool[];
  }

  const model = genAI.getGenerativeModel(modelConfig);  

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