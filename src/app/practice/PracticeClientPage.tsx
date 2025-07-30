"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSpeechToText } from "@/features/speech-recognition/useSpeechToText";

import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCreatePracticeSession } from '@/features/db/hooks/useCreatePracticeSession';
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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  const { mutate: createPracticeSession } = useCreatePracticeSession();

  useEffect(() => {
    if (!topic || !exam || !subject) {
      toast.error("Missing topic, exam, or subject. Redirecting to select-topic page.");
      router.replace('/select-topic');
    } else {
      // Create a practice session when the component mounts
      createPracticeSession({
        topic,
        exam,
        subject,
        subtopic,
        concept: subtopic
      }, {
        onSuccess: (data) => {
          setSessionId(data.sessionId);
          setSessionStartTime(Date.now());
        }
      });
    }
  }, [topic, exam, subject, subtopic, router, createPracticeSession]);

  const handleSubmitExplanation = async () => {
    if (!transcript.trim()) {
      toast.error("Please record your explanation before submitting.");
      return;
    }

    // Calculate session duration
    const duration = sessionStartTime ? Math.round((Date.now() - sessionStartTime) / 1000) : 0;

    // Update the practice session with transcript and duration
    if (sessionId) {
      try {
        await fetch('/api/practice-sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'update',
            sessionId,
            updateData: {
              transcript,
              duration
            }
          })
        });
      } catch (error) {
        console.error('Error updating practice session:', error);
      }
    }

    // Pass keyPoints, subtopic, sessionId, and duration to the analysis page
    const analysisParams = `exam=${exam}&subject=${subject}&topic=${topic}&transcript=${encodeURIComponent(transcript)}&sessionId=${sessionId}&duration=${duration}`;
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

                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Your Explanation:</h3>
                    <p className="text-gray-300 leading-relaxed">{transcript}</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={handleSubmitExplanation}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Submit for Analysis
                    </Button>
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticeClientPage;