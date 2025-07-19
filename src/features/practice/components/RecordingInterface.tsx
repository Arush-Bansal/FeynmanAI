"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Square, RotateCcw, Send } from "lucide-react";
import { toast } from "sonner";

interface RecordingInterfaceProps {
  topic: string;
  transcript: string;
  isRecording: boolean;
  isProcessing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSubmitExplanation: (explanation: string) => void;
  onChangeTopic: () => void;
}

export const RecordingInterface = ({
  topic,
  transcript,
  isRecording,
  isProcessing,
  onStartRecording,
  onStopRecording,
  onSubmitExplanation,
  onChangeTopic
}: RecordingInterfaceProps) => {
  const handleSubmit = () => {
    onSubmitExplanation(transcript);
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Explain: {topic}</h2>
          <p className="text-gray-300 text-lg">Hold the mic button or spacebar to record your explanation</p>
        </div>

        {/* Recording Interface */}
        <div className="space-y-8">
          {/* Mic Button */}
          <div className="text-center">
            <button
              onMouseDown={onStartRecording}
              onMouseUp={onStopRecording}
              onTouchStart={onStartRecording}
              onTouchEnd={onStopRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 ${
                isRecording 
                  ? 'bg-red-600 shadow-lg shadow-red-600/50 scale-110 animate-pulse' 
                  : 'bg-violet-600 hover:bg-violet-700 hover:scale-105'
              } shadow-2xl`}
            >
              {isRecording ? (
                <Square className="h-8 w-8 text-white" />
              ) : (
                <Mic className="h-8 w-8 text-white" />
              )}
            </button>
            <p className="text-gray-300 mt-4">
              {isRecording ? 'Recording... Release to stop' : 'Hold to record'}
            </p>
          </div>

          {/* Live Transcript */}
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
              {isRecording && <span className="animate-pulse">|</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={onChangeTopic}
              variant="outline"
              className="flex-1 h-12 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Change Topic
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!transcript.trim() || isProcessing}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {isProcessing ? (
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
  );
}; 