export const generateFeynmanPrompt = (topic: string, exam: string, subject: string, keyPoints: string[], transcript: string) => {
    const examContext = exam ? `for ${exam} preparation` : '';
    const subjectContext = subject ? `in ${subject}` : '';
    const keyPointsList = keyPoints.length > 0 ? `The user was required to cover the following key points: ${keyPoints.join(', ')}.` : '';
  
    return `You are an expert teacher using the Feynman Technique. Analyze this student's explanation of "${topic}" ${subjectContext} ${examContext}.
  ${keyPointsList}
  
  Student's explanation: "${decodeURIComponent(transcript)}"
  
  IMPORTANT: You MUST call the 'analyzeFeynmanExplanation' function with ALL required parameters:
  - exam: "${exam}"
  - subject: "${subject}"
  - topic: "${topic}"
  - keyPoints: [${keyPoints.map(kp => `"${kp}"`).join(', ')}]
  - userTranscript: "${decodeURIComponent(transcript)}"
  - coveredTopics: Analyze which key points were covered in the student's explanation
  - detailedAnalysis: Provide comprehensive feedback on strengths and areas for improvement
  - sideQuestions: Extract any questions from the transcript and provide answers
  - similarTopics: Suggest related topics for practice
  - overallScore: Give a score from 0-100 based on explanation quality
  
  Do not provide any text response. Only call the function with the analysis.`;
  }; 