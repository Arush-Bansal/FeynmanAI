import { useQuery } from '@tanstack/react-query';
import { useGeminiGenerator } from './useGeminiGenerator';

interface FeynmanAnalysisProps {
  topic: string;
  exam: string;
  subject: string;
  transcript: string;
}

const generateFeynmanPrompt = (topic: string, exam: string, transcript: string) => {
  const examContext = exam ? `for ${exam} preparation` : '';
  return `You are an expert teacher using the Feynman Technique. Analyze this student's explanation of "${topic}" ${examContext}:

Student's explanation: "${decodeURIComponent(transcript)}"

Please provide:
1. **Strengths** (what they explained well)
2. **Areas for Improvement** (what was unclear or missing)
3. **Specific Feedback** (concrete suggestions to improve their understanding)
4. **Key Concepts** they should focus on
5. **A simple explanation** of the topic to help them understand better

Keep your response encouraging and constructive. Focus on helping them understand the concept better.`;
};

const fetchAnalysisData = async (topic: string, exam: string, transcript: string, generateContent: (prompt: string) => Promise<string | null>) => {
  const prompt = generateFeynmanPrompt(topic, exam, transcript);
  const generated = await generateContent(prompt);
  return generated;
};

export const useFetchFeynmanAnalysis = ({ topic, exam, subject, transcript }: FeynmanAnalysisProps) => {
  const { generateContent } = useGeminiGenerator();

  const { data: analysisContent, isLoading: isGeminiLoading, error: geminiError } = useQuery({
    queryKey: ['feynmanAnalysis', topic, exam, subject, transcript],
    queryFn: () => fetchAnalysisData(topic, exam, transcript, generateContent),
    enabled: !!topic && !!exam && !!subject && !!transcript,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1
  });

  return { analysisContent, isGeminiLoading, geminiError };
};