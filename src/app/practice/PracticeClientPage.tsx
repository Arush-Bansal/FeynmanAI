"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSpeechToText } from "@/features/speech-recognition/useSpeechToText";

import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Square, Send } from 'lucide-react';

const PracticeClientPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const exam = searchParams.get('exam');
  const subject = searchParams.get('subject');
  const subtopic = searchParams.get('subtopic'); // Get subtopic from search params
  const keyPoints = searchParams.get('keyPoints'); // Get keyPoints from search params

  const { transcript, listening, startListening, stopListening } = useSpeechToText();

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
    // Pass keyPoints and subtopic to the analysis page
    const analysisParams = `exam=${exam}&subject=${subject}&topic=${topic}&transcript=${encodeURIComponent(transcript)}`;
    const keyPointsParam = keyPoints ? `&keyPoints=${keyPoints}` : '';
    const subtopicParam = subtopic ? `&subtopic=${encodeURIComponent(subtopic)}` : '';
    router.push(`/analysis?${analysisParams}${keyPointsParam}${subtopicParam}`);
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
              <h2 className="text-3xl font-bold text-white mb-2">
                Explain: {subtopic ? `${topic} - ${subtopic}` : topic}
              </h2>
              {subtopic && (
                <p className="text-gray-400 text-sm mb-2">
                  Studying specific subtopic within {topic}
                </p>
              )}
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
                      : 'bg-green-600 hover:bg-green-700 hover:scale-105'
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
                  disabled={!transcript.trim()}
                  className={`w-full h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50`}
                >
                  {listening ? (
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

export default PracticeClientPage;