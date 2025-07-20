"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Repeat } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { toast } from "sonner";

const AnalysisResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const exam = searchParams.get('exam');
  const subject = searchParams.get('subject');
  const analysis = searchParams.get('analysis');

  useEffect(() => {
    if (!topic || !analysis || !exam || !subject) {
      toast.error("Missing topic, analysis, exam, or subject data. Redirecting to select-topic page.");
      router.replace('/select-topic');
    }
  }, [topic, analysis, exam, subject, router]);

  const handleTryAgain = () => {
    router.push(`/practice?exam=${exam}&subject=${subject}&topic=${topic}`);
  };

  if (!topic || !analysis || !exam || !subject) {
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

            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
              <div className="prose prose-invert max-w-none text-green-400">
                <ReactMarkdown>
                  {decodeURIComponent(analysis)}
                </ReactMarkdown>
              </div>
            </div>

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