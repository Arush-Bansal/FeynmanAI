"use client"
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import {
  TopicSelection,
  RecordingInterface,
  AnalysisResult
} from "@/features/practice/components";
import { useSpeechToText } from "@/features/speech-recognition/useSpeechToText";
import { useGeminiGenerator } from '@/features/gemini/useGeminiGenerator';
import { TOPIC_CONTENT } from '@/features/practice/constants';

export type PracticeStep = 'topic' | 'recording' | 'result';

const PracticePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<PracticeStep>('topic');
  const [topic, setTopic] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [selectedExamCategory, setSelectedExamCategory] = useState<string | null>(null);
  
  const { generateContent, isLoading: isGeminiLoading, error: geminiError, response: geminiResponse } = useGeminiGenerator();

  const {
    listening: isRecording,
    transcript,
    startListening: startRecording,
    stopListening: stopRecording,
    resetTranscript
  } = useSpeechToText();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCategory = localStorage.getItem('selectedExamCategory');
      if (storedCategory) {
        setSelectedExamCategory(storedCategory);
      }
    }
  }, []);

  const handleTopicSubmit = () => {
    if (!topic.trim()) {
      toast.error('Please select a topic to practice!');
      return;
    }
    setCurrentStep('recording');
  };

  const handleSubmitExplanation = async (explanation: string) => {
    setIsProcessing(true);
    
    try {
      const topicContent = TOPIC_CONTENT[topic as keyof typeof TOPIC_CONTENT];
      
      let topicContext = '';
      if (topicContent) {
        topicContext = `

**Expected Topic Content for "${topic}":**

**Key Concepts to Cover:**
${Object.keys(topicContent).map(key => `- ${key}`).join('\n')}

**Key Points that should be mentioned:**
${Object.values(topicContent).map(value => `- ${value}`).join('\n')}

**Analysis Guidelines:**
Please evaluate whether the user's explanation covers these key points and concepts.`;
      }

      const prompt = `Analyze this explanation of "${topic}" using the Feynman Technique principles. The user's explanation is:

"${explanation}"${topicContext}

Please provide a comprehensive analysis in markdown format with the following sections:

1. **Strengths** - What they did well overall

2. **Key Points Analysis** - Go through each key point and provide specific feedback:
   - For each key point, state whether they covered it or not
   - If covered: Rate their explanation (Excellent/Good/Needs Improvement) and provide brief feedback
   - If missed: Explain what this concept is and how they could include it simply

3. **Areas to improve** - Specific suggestions for better explanation

4. **Tips** - How to apply the Feynman Technique better

5. **Overall feedback** - Encouraging summary with a score (e.g., "You covered 6 out of 8 key points")

Focus on clarity, simplicity, and whether they could explain this to someone with no background in the topic. For each key point they missed, provide a simple explanation of what that concept is so they can include it next time.`;

      await generateContent(prompt);
      
      if (geminiError) {
        throw new Error(geminiError);
      }
      
      if (geminiResponse) {
        setAnalysis(geminiResponse);
        setCurrentStep('result');
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze your explanation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPractice = () => {
    setCurrentStep('topic');
    setTopic('');
    setAnalysis('');
    resetTranscript();
  };

  // const goBackToTopic = () => {
  //   setCurrentStep('topic');
  //   resetTranscript();
  // };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {currentStep === 'topic' && (
          <TopicSelection
            topic={topic}
            onTopicChange={setTopic}
            onTopicSubmit={handleTopicSubmit}
            selectedExamCategory={selectedExamCategory}
          />
        )}

        {currentStep === 'recording' && (
          <RecordingInterface
            topic={topic}
            transcript={transcript}
            isRecording={isRecording}
            isProcessing={isProcessing || isGeminiLoading}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onSubmitExplanation={handleSubmitExplanation}
            // onChangeTopic={goBackToTopic}
          />
        )}

        {currentStep === 'result' && (
          <AnalysisResult
            topic={topic}
            analysis={analysis}
            onReset={resetPractice}
          />
        )}
      </div>
    </>
  );
};

export default PracticePage;