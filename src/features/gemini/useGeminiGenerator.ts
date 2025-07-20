'use client';

import { useState } from "react";

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
      const res = await fetch('/api/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) throw new Error("Bad response from server");
      
      const data = await res.json();
      setResponse(data.response || "");
      return data.response; // Return the response directly
    } catch (e) {
      setError(`Failed to generate content. Please try again later. ${e}`);
      setResponse(null);
      return null; // Return null on error
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, generateContent };
};
