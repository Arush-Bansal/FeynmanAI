'use client';

import { useState } from "react";
import { backendApi } from '@/lib/axios';

export interface GenerateResponse {
  response: string | null;
  loading: boolean;
  error: string | null;
}

export const useGeminiGenerator = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await backendApi.post('/generate', { prompt });

      setResponse(res.data.response || "");
      return res.data.response; // Return the response directly
    } catch (e: unknown) {
      setError(`Failed to generate content. Please try again later. ${(e as Error).message}`);
      setResponse(null);
      return null; // Return null on error
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, generateContent };
};
