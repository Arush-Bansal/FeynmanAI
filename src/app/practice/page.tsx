"use client"
import { Navigation } from "@/components/Navigation";
import {
  TopicSelection,
  RecordingInterface,
  AnalysisResult,
  PracticeHeader,
  SpacebarHint
} from "@/features/practice/components";
import {
  usePracticeFlow
} from "@/features/practice/hooks";
import { useSpeechToText } from "@/features/speech-recognition/useSpeechToText";

const PracticePage = () => {
  const {
    currentStep,
    topic,
    setTopic,
    isProcessing,
    analysis,
    handleTopicSubmit,
    handleSubmitExplanation,
    resetPractice,
    goBackToTopic
  } = usePracticeFlow();

  const {
    listening: isRecording,
    transcript,
    startListening: startRecording,
    stopListening: stopRecording,
    resetTranscript
  } = useSpeechToText();


  const handleReset = () => {
    resetPractice();
    resetTranscript();
  };

  const handleChangeTopic = () => {
    goBackToTopic();
    resetTranscript();
  };

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black opacity-90"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <Navigation currentPage="/practice" />

        <PracticeHeader />

        {/* Main Content */}
        {currentStep === 'topic' && (
          <TopicSelection
            topic={topic}
            onTopicChange={setTopic}
            onTopicSubmit={handleTopicSubmit}
          />
        )}

        {currentStep === 'recording' && (
          <RecordingInterface
            topic={topic}
            transcript={transcript}
            isRecording={isRecording}
            isProcessing={isProcessing}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onSubmitExplanation={handleSubmitExplanation}
            onChangeTopic={handleChangeTopic}
          />
        )}

        {currentStep === 'result' && (
          <AnalysisResult
            topic={topic}
            analysis={analysis}
            onReset={handleReset}
          />
        )}
      </div>

      <SpacebarHint isVisible={currentStep === 'recording'} />
    </div>
  );
};

export default PracticePage;
