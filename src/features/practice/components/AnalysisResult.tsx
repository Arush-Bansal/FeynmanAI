"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, RotateCcw } from "lucide-react";

interface AnalysisResultProps {
  topic: string;
  analysis: string;
  onReset: () => void;
}

export const AnalysisResult = ({ topic, analysis, onReset }: AnalysisResultProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-green-400" />
            <h2 className="text-3xl font-bold text-white">Analysis Complete!</h2>
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
          <p className="text-gray-300">Here&apos;s how you did explaining <strong>{topic}</strong></p>
        </div>

        {/* Analysis Results */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="prose prose-invert max-w-none">
            {analysis}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onReset}
          className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Practice Another Topic 🎯
        </Button>
      </CardContent>
    </Card>
  );
}; 