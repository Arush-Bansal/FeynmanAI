import { useQuery } from '@tanstack/react-query';
import { backendApi } from '@/lib/api';

interface FeynmanAnalysisProps {
  topic: string;
  exam: string;
  subject: string;
  subtopic?: string;
  keyPoints: string[];
  transcript: string;
  sessionId?: string;
  duration?: number;
  enabled?: boolean;
}

interface CoveredTopic {
  topicName: string;
  covered: boolean;
}

interface SideQuestion {
  question: string;
  answer: string;
}

interface FeynmanAnalysisResult {
  coveredTopics: CoveredTopic[];
  detailedAnalysis: string;
  sideQuestions: SideQuestion[];
  similarTopics: string[];
  overallScore: number;
}

interface FeynmanApiResponse {
  functionCall?: {
    name: string;
    args: FeynmanAnalysisResult;
  };
  error?: unknown;
}

const fetchFeynmanAnalysis = async (params: FeynmanAnalysisProps): Promise<FeynmanApiResponse> => {
  const res = await backendApi.post<FeynmanApiResponse>('/feynman-analysis', params);
  return res.data;
};

export const useFetchFeynmanAnalysis = ({ topic, exam, subject, subtopic, keyPoints, transcript, sessionId, duration, enabled = true }: FeynmanAnalysisProps) => {
  const {
    data: geminiResponse,
    isLoading: isGeminiLoading,
    error: geminiError,
  } = useQuery<FeynmanApiResponse>({
    queryKey: ['feynman-analysis', topic, exam, subject, subtopic, keyPoints, transcript, sessionId, duration],
    queryFn: () => fetchFeynmanAnalysis({ topic, exam, subject, subtopic, keyPoints, transcript, sessionId, duration }),
    enabled: enabled && !!topic && !!exam && !!subject && !!transcript,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });

  let analysisContent: FeynmanAnalysisResult | null = null;

  console.log("Gemini Response:", geminiResponse);

  if (geminiResponse?.functionCall && geminiResponse.functionCall.name === 'analyzeFeynmanExplanation') {
    analysisContent = geminiResponse.functionCall.args as FeynmanAnalysisResult;
    console.log("Parsed Analysis Content:", analysisContent);
  }

  return { analysisContent, isGeminiLoading, geminiError };
};
