"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Repeat } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { toast } from "sonner";
import { AnalysisSkeleton } from '@/components/skeletons/AnalysisSkeleton';
import { useFetchFeynmanAnalysis } from '@/features/gemini';

const AnalysisResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const exam = searchParams.get('exam');
  const subject = searchParams.get('subject');
  const transcript = searchParams.get('transcript');

  const { analysisContent, isGeminiLoading } = useFetchFeynmanAnalysis({ topic: topic || '', exam: exam || '', subject: subject || '', transcript: transcript || '' });

  useEffect(() => {
    if (!topic || !exam || !subject || !transcript) {
      toast.error("Missing topic, exam, subject, or transcript data. Redirecting to select-topic page.");
      router.replace('/select-topic');
    }
  }, [topic, exam, subject, transcript, router]);

  const handleTryAgain = () => {
    router.push(`/practice?exam=${exam}&subject=${subject}&topic=${topic}`);
  };

  if (!topic || !exam || !subject || !transcript) {
    return null; // Or a loading spinner
  }

  return (
    <div className="relative z-10">
      <div className="container mx-auto px-4 py-8 max-w-4xl pt-8">
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="h-8 w-8 text-green-400" />
                <h2 className="text-3xl font-bold text-white">Analysis Complete!</h2>
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </div>
              <p className="text-gray-300">Here&apos;s how you did explaining <strong>{topic}</strong></p>
            </div>

            {isGeminiLoading ? (
              <AnalysisSkeleton />
            ) : analysisContent ? (
              <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
                <div className="prose prose-invert max-w-none text-green-400">
                  <ReactMarkdown>
                    {analysisContent}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="text-red-400 text-center">Error loading analysis. Please try again.</div>
            )}

            <Button
              onClick={handleTryAgain}
              className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Repeat className="h-5 w-5 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisResultPage;