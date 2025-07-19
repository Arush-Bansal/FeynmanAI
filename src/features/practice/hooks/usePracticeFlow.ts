"use client"
import { useState } from 'react';
import { toast } from "sonner";
import { useGeminiGenerator } from '@/features/gemini/useGeminiGenerator';
import { TOPIC_CONTENT } from '../constants';

export type PracticeStep = 'topic' | 'recording' | 'result';

export const usePracticeFlow = () => {
  const [currentStep, setCurrentStep] = useState<PracticeStep>('topic');
  const [topic, setTopic] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState('');
  
  const { generateContent, isLoading: isGeminiLoading, error: geminiError, response: geminiResponse } = useGeminiGenerator();

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
      // Get topic content if available
      const topicContent = TOPIC_CONTENT[topic as keyof typeof TOPIC_CONTENT];
      
      let topicContext = '';
      if (topicContent) {
        topicContext = `

**Expected Topic Content for "${topic}":**

**Key Concepts to Cover:**
${topicContent.concepts}

**Key Points that should be mentioned:**
${topicContent.keyPoints.map(point => `- ${point}`).join('\n')}

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
      
      // The analysis will be set from the Gemini response
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
  };

  const goBackToTopic = () => {
    setCurrentStep('topic');
  };

  return {
    currentStep,
    topic,
    setTopic,
    isProcessing: isProcessing || isGeminiLoading,
    analysis,
    handleTopicSubmit,
    handleSubmitExplanation,
    resetPractice,
    goBackToTopic
  };
}; 