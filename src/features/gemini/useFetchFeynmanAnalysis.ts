import { useQuery } from '@tanstack/react-query';
import { backendApi } from '@/lib/axios';

interface FeynmanAnalysisProps {
  topic: string;
  exam: string;
  subject: string;
  keyPoints: string[];
  transcript: string;
  enabled?: boolean;
}

interface FeynmanApiResponse {
  response?: string;
  error?: unknown;
}

const fetchFeynmanAnalysis = async (params: FeynmanAnalysisProps): Promise<FeynmanApiResponse> => {
  const res = await backendApi.post<FeynmanApiResponse>('/feynman-analysis', params);
  return res.data;
};

export const useFetchFeynmanAnalysis = ({ topic, exam, subject, keyPoints, transcript, enabled = true }: FeynmanAnalysisProps) => {
  const {
    data: geminiResponse,
    isLoading: isGeminiLoading,
    error: geminiError,
  } = useQuery<FeynmanApiResponse>({
    queryKey: ['feynman-analysis', topic, exam, subject, keyPoints, transcript],
    queryFn: () => fetchFeynmanAnalysis({ topic, exam, subject, keyPoints, transcript }),
    enabled: enabled && !!topic && !!exam && !!subject && !!transcript,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });

  const analysisContent = geminiResponse?.response || null;

  console.log("Gemini Response:", geminiResponse);

  return { analysisContent, isGeminiLoading, geminiError };
};
