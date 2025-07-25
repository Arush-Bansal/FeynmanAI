'use client';

import { useQuery } from '@tanstack/react-query';
import { backendApi } from '@/lib/axios';

interface UseGeminiGeneratorProps {
  prompt: string;
  enabled?: boolean;
}

const generateContent = async (prompt: string) => {
  if (!prompt) return null;
  const res = await backendApi.post('/generate', { prompt });
  return res.data.response;
};

export const useGeminiGenerator = ({ prompt, enabled = true }: UseGeminiGeneratorProps) => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['gemini-generator', prompt],
    queryFn: () => generateContent(prompt),
    enabled: enabled && !!prompt,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });

  return { response, isLoading, error };
};