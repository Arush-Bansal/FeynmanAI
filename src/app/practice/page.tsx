"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSpeechToText } from "@/features/speech-recognition/useSpeechToText";
import { useGeminiGenerator } from '@/features/gemini';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Square, Send } from 'lucide-react';

const PracticePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const exam = searchParams.get('exam');
  const subject = searchParams.get('subject');

  const { transcript, listening, startListening, stopListening } = useSpeechToText();
  const { generateContent, isLoading: isGeminiLoading, error: geminiError } = useGeminiGenerator();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!topic || !exam || !subject) {
      toast.error("Missing topic, exam, or subject. Redirecting to select-topic page.");
      router.replace('/select-topic');
    }
  }, [topic, exam, subject, router]);

  const handleSubmitExplanation = async () => {
    if (!transcript.trim()) {
      toast.error("Please record your explanation before submitting.");
      return;
    }

    setIsProcessing(true);
    try {
      const examContext = exam ? `for ${exam} preparation` : '';
      const prompt = `You are an expert teacher using the Feynman Technique. Analyze this student's explanation of "${topic}" ${examContext}:

Student's explanation: "${transcript}"

Please provide:
1. **Strengths** (what they explained well)
2. **Areas for Improvement** (what was unclear or missing)
3. **Specific Feedback** (concrete suggestions to improve their understanding)
4. **Key Concepts** they should focus on
5. **A simple explanation** of the topic to help them understand better

Keep your response encouraging and constructive. Focus on helping them understand the concept better.`;

      const generatedAnalysis = await generateContent(prompt);
      
      if (generatedAnalysis) {
        router.push(`/analysis?exam=${exam}&subject=${subject}&topic=${topic}&transcript=${encodeURIComponent(transcript)}&analysis=${encodeURIComponent(generatedAnalysis)}`);
      } else if (geminiError) {
        throw new Error(geminiError);
      } else {
        throw new Error('Failed to generate analysis');
      }
    } catch (error) {
      console.error("Error during analysis:", error);
      toast.error("Failed to get analysis. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!topic || !exam || !subject) {
    return null; // Or a loading spinner
  }

  return (
    <div className="relative z-10">
      <div className="container mx-auto px-4 py-8 max-w-4xl pt-8">
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Explain: {topic}</h2>
              <p className="text-gray-300 text-lg">Hold the mic button or spacebar to record your explanation</p>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center">
                <button
                  onMouseDown={startListening}
                  onMouseUp={stopListening}
                  onTouchStart={startListening}
                  onTouchEnd={stopListening}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 ${
                    listening 
                      ? 'bg-red-600 shadow-lg shadow-red-600/50 scale-110 animate-pulse' 
                      : 'bg-violet-600 hover:bg-violet-700 hover:scale-105'
                  } shadow-2xl`}
                >
                  {listening ? (
                    <Square className="h-8 w-8 text-white" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </button>
                <p className="text-gray-300 mt-4">
                  {listening ? 'Recording... Release to stop' : 'Hold to record'}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 min-h-48 border border-gray-700">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Your Explanation:
                </h3>
                <div className="text-gray-200 text-lg leading-relaxed">
                  {transcript || (
                    <span className="text-gray-500 italic">
                      Your words will appear here as you speak...
                    </span>
                  )}
                  {listening && <span className="animate-pulse">|</span>}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleSubmitExplanation}
                  disabled={!transcript.trim() || isProcessing || isGeminiLoading}
                  className={`w-full h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50`}
                >
                  {isProcessing || isGeminiLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Get My Analysis
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticePage;