"use client"
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import {
  TopicSelection,
  RecordingInterface,
  AnalysisResult
} from "@/features/practice/components";
import { useSpeechToText } from "@/features/speech-recognition/useSpeechToText";
import { useGeminiGenerator } from '@/features/gemini';

import { getSelectedExam } from "@/lib/utils";


export type PracticeStep = 'topic' | 'recording' | 'result';

const PracticePage = () => {
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

  const handleSubmitExplanation = async () => {
    if (!transcript.trim()) {
      toast.error('Please record your explanation first!');
      return;
    }

    setIsProcessing(true);
    setCurrentStep('result');

    try {
      const selectedExam = getSelectedExam();
      const examContext = selectedExam ? `for ${selectedExam} preparation` : '';
      
      const prompt = `You are an expert teacher using the Feynman Technique. Analyze this student's explanation of "${topic}" ${examContext}:

Student's explanation: "${transcript}"

Please provide:
1. **Strengths** (what they explained well)
2. **Areas for Improvement** (what was unclear or missing)
3. **Specific Feedback** (concrete suggestions to improve their understanding)
4. **Key Concepts** they should focus on
5. **A simple explanation** of the topic to help them understand better

Keep your response encouraging and constructive. Focus on helping them understand the concept better.`;

      await generateContent(prompt);
      
      if (geminiResponse) {
        setAnalysis(geminiResponse);
      } else if (geminiError) {
        throw new Error(geminiError);
      } else {
        throw new Error('Failed to generate analysis');
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

  return (
    
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
    
  );
};

export default PracticePage;