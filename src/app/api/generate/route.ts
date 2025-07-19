import { GoogleGenerativeAI } from '@google/generative-ai';  
import { NextResponse } from 'next/server';  
import { config } from 'dotenv';

// Load environment variables
config();

export async function POST(request: Request) {  
  const { prompt } = await request.json();  
  const genAI = new GoogleGenerativeAI("AIzaSyC5q8mzCxrlcGUVSzqvV4u_J5ybfH0Mm2w");  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });  

  try {  
    const result = await model.generateContent([prompt]);  
    const response = result.response.text();  

    return NextResponse.json({  
      response: response,  
      error: undefined  
    });  
  } catch (error) {  
    console.error(error);
    console.log(process.env.GEMINI_API_KEY);
    return NextResponse.json({  
      error: error,
      apiKey: process.env.GEMINI_API_KEY
    }, { status: 500 });  
  }  
}  
