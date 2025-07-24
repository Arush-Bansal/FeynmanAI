"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Repeat } from "lucide-react";
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Main Content */}
        <main className="lg:col-span-3 bg-gray-800/50 rounded-lg p-8 shadow-lg border border-gray-700">
          <header className="border-b border-gray-600 pb-4 mb-6">
            <p className="text-sm text-gray-400">{exam} &gt; {subject}</p>
            <h1 className="text-4xl font-bold text-white mt-2">Analysis Report: {topic}</h1>
          </header>

          <section id="your-explanation" className="mb-8 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Your Explanation</h2>
            <div className="bg-gray-900/70 rounded-md p-6 border border-gray-700">
              <p className="text-gray-300 italic leading-relaxed">
                {decodeURIComponent(transcript)}
              </p>
            </div>
          </section>

          <section id="gemini-feedback" className="mb-8 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Gemini's Feedback</h2>
            <div className="prose prose-invert max-w-none text-gray-300">
              {isGeminiLoading ? (
                <AnalysisSkeleton />
              ) : analysisContent ? (
                <ReactMarkdown>{analysisContent}</ReactMarkdown>
              ) : (
                <div className="text-red-400">Error loading analysis.</div>
              )}
            </div>
          </section>

          <section id="next-steps" className="scroll-mt-20">
             <h2 className="text-2xl font-semibold text-green-400 mb-4">Next Steps</h2>
             <Button
                onClick={handleTryAgain}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
              >
                <Repeat className="h-5 w-5 mr-2 inline-block" />
                Try Explaining Again
              </Button>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1 h-fit sticky top-24">
          <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">Contents</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#your-explanation" className="hover:text-green-400 transition-colors">1. Your Explanation</a></li>
              <li><a href="#gemini-feedback" className="hover:text-green-400 transition-colors">2. Gemini's Feedback</a></li>
              <li><a href="#next-steps" className="hover:text-green-400 transition-colors">3. Next Steps</a></li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default AnalysisResultPage;