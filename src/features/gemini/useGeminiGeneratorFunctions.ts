'use client';

import { backendApi } from '@/lib/axios';
import { GeminiTool } from '@/types/gemini';
import { useQuery } from '@tanstack/react-query';

export interface GeminiFunctionCall {
  name: string;
  args: Record<string, any>;
}

export interface GeminiApiResponse {
  response?: string;
  functionCall?: GeminiFunctionCall;
  error?: any;
}

interface UseGeminiGeneratorFunctionsProps {
  prompt: string;
  tools?: GeminiTool[];
  enabled?: boolean;
}

const generateContentWithFunctions = async (prompt: string, tools?: GeminiTool[]): Promise<GeminiApiResponse> => {
  if (!prompt) return {};
  const res = await backendApi.post<GeminiApiResponse>('/generate', { prompt, tools });
  return res.data;
};

export const useGeminiGeneratorFunctions = ({
  prompt,
  tools,
  enabled = true,
}: UseGeminiGeneratorFunctionsProps) => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<GeminiApiResponse>({
    queryKey: ['gemini-generator-functions', prompt, JSON.stringify(tools)],
    queryFn: () => generateContentWithFunctions(prompt, tools),
    enabled: enabled && !!prompt,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });

  return { response, isLoading, error };
};
