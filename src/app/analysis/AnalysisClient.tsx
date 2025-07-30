"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Repeat } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { toast } from "sonner";
import { AnalysisSkeleton } from '@/components/skeletons/AnalysisSkeleton';
import { useFetchFeynmanAnalysis } from '@/features/gemini';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalysisClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');
  const exam = searchParams.get('exam');
  const subject = searchParams.get('subject');
  const subtopic = searchParams.get('subtopic');
  const transcript = searchParams.get('transcript');
  const keyPointsParam = searchParams.get('keyPoints');
  const keyPoints = keyPointsParam ? keyPointsParam.split(',') : [];
  const sessionId = searchParams.get('sessionId');
  const duration = searchParams.get('duration');

  const { analysisContent, isGeminiLoading } = useFetchFeynmanAnalysis({
    topic: topic || '',
    exam: exam || '',
    subject: subject || '',
    subtopic: subtopic || '',
    keyPoints: keyPoints,
    transcript: transcript || '',
    sessionId: sessionId || '',
    duration: duration ? parseInt(duration) : 0
  });

  useEffect(() => {
    if (!topic || !exam || !subject || !transcript) {
      toast.error("Missing topic, exam, subject, or transcript data. Redirecting to select-topic page.");
      router.replace('/select-topic');
    }
  }, [topic, exam, subject, transcript, router]);

  const handleTryAgain = () => {
    const practiceParams = `exam=${exam}&subject=${subject}&topic=${topic}`;
    const subtopicParam = subtopic ? `&subtopic=${encodeURIComponent(subtopic)}` : '';
    router.push(`/practice?${practiceParams}${subtopicParam}`);
  };

  if (!topic || !exam || !subject || !transcript) {
    return null; // Or a loading spinner
  }

  return (
    <div className="relative z-10">
      <div className="container mx-auto px-4 py-8 max-w-6xl pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Feynman Analysis
          </h1>
          <p className="text-gray-300 text-lg">
            Here&apos;s how well you explained {subtopic ? `${topic} - ${subtopic}` : topic}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            <section id="gemini-feedback" className="mb-8 scroll-mt-20">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Gemini&apos;s Feedback</h2>
              <div className="prose prose-invert max-w-none text-gray-300">
                {isGeminiLoading ? (
                  <AnalysisSkeleton />
                ) : analysisContent ? (
                  <>
                    <Card className="mb-6 bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-xl text-white">Overall Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-green-400">{analysisContent.overallScore}/100</p>
                      </CardContent>
                    </Card>

                    <h3 className="text-xl font-semibold text-white mb-3">Covered Topics</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {analysisContent.coveredTopics.map((item, index) => (
                        <Badge key={index} variant={item.covered ? "default" : "secondary"}>
                          {item.topicName} {item.covered ? '✅' : '❌'}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3">Detailed Analysis</h3>
                    <div className="mb-6 text-gray-300 leading-relaxed">
                      <ReactMarkdown>
                        {analysisContent.detailedAnalysis}
                      </ReactMarkdown>
                    </div>

                    {analysisContent.sideQuestions && analysisContent.sideQuestions.length > 0 && (
                      <>
                        <h3 className="text-xl font-semibold text-white mb-3">Side Questions</h3>
                        <div className="mb-6 space-y-3">
                          {analysisContent.sideQuestions.map((item, index) => (
                            <Card key={index} className="bg-gray-700 border-gray-600">
                              <CardContent className="p-4">
                                <p className="text-white font-medium mb-2">Q: {item.question}</p>
                                <p className="text-gray-300">{item.answer}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </>
                    )}

                    {analysisContent.similarTopics && analysisContent.similarTopics.length > 0 && (
                      <>
                        <h3 className="text-xl font-semibold text-white mb-3">Similar Topics to Practice</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {analysisContent.similarTopics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-green-400 border-green-400">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No analysis available</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column - Actions & Stats */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Session Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Topic:</span>
                  <span className="text-white">{topic}</span>
                </div>
                {subtopic && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtopic:</span>
                    <span className="text-white">{subtopic}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Exam:</span>
                  <span className="text-white">{exam}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Subject:</span>
                  <span className="text-white">{subject}</span>
                </div>
                {duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{Math.round(parseInt(duration) / 60)}m {parseInt(duration) % 60}s</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button
                onClick={handleTryAgain}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Repeat className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={() => router.push('/select-topic')}
                variant="outline"
                className="w-full border-green-500 text-green-400 hover:bg-green-500/10"
              >
                Practice New Topic
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisClient; 