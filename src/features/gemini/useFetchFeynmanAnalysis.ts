import { useGeminiGenerator } from './useGeminiGenerator';

interface FeynmanAnalysisProps {
  topic: string;
  exam: string;
  subject: string;
  transcript: string;
  enabled?: boolean;
}

const generateFeynmanPrompt = (topic: string, exam: string, subject: string, transcript: string) => {
  const examContext = exam ? `for ${exam} preparation` : '';
  const subjectContext = subject ? `in ${subject}` : '';
  return `You are an expert teacher using the Feynman Technique. Analyze this student's explanation of "${topic}" ${subjectContext} ${examContext}:

Student's explanation: "${decodeURIComponent(transcript)}"

Please provide:
1. **Strengths** (what they explained well)
2. **Areas for Improvement** (what was unclear or missing)
3. **Specific Feedback** (concrete suggestions to improve their understanding)
4. **Key Concepts** they should focus on
5. **A simple explanation** of the topic to help them understand better

Keep your response encouraging and constructive. Focus on helping them understand the concept better.`
};

export const useFetchFeynmanAnalysis = ({ topic, exam, subject, transcript, enabled = true }: FeynmanAnalysisProps) => {
  const prompt = generateFeynmanPrompt(topic, exam, subject, transcript);
  const {
    response: analysisContent,
    isLoading: isGeminiLoading,
    error: geminiError,
  } = useGeminiGenerator({ prompt, enabled });

  return { analysisContent, isGeminiLoading, geminiError };
};
