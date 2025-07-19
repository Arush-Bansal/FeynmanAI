"use client"
import { Brain, Sparkles } from "lucide-react";

export const PracticeHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Brain className="h-10 w-10 text-violet-400" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
          Feynman
        </h1>
        <Sparkles className="h-8 w-8 text-blue-400" />
      </div>
      <p className="text-xl text-violet-300 mb-2">by Grifi</p>
      <p className="text-lg text-gray-400">Master any concept by explaining it simply ✨</p>
    </div>
  );
}; 