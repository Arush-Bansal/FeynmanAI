"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, BookOpen, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { PREDEFINED_TOPICS } from "../constants";

interface TopicSelectionProps {
  topic: string;
  onTopicChange: (topic: string) => void;
  onTopicSubmit: () => void;
}

export const TopicSelection = ({ 
  topic, 
  onTopicChange, 
  onTopicSubmit 
}: TopicSelectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSubmit = () => {
    if (!topic.trim()) {
      toast.error('Please select a topic to practice!');
      return;
    }
    onTopicSubmit();
  };

  const handleTopicSelect = (selectedTopic: string) => {
    onTopicChange(selectedTopic);
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-white mb-4">What do you want to master today?</h2>
          <p className="text-gray-300 text-lg">Choose from our curated topics to practice!</p>
        </div>
        
        {/* Topic Selection Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-violet-400" />
            <h3 className="text-xl font-semibold text-white">Choose Your Topic</h3>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">Select Category:</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(PREDEFINED_TOPICS).map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          {selectedCategory && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Select Topic:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {PREDEFINED_TOPICS[selectedCategory as keyof typeof PREDEFINED_TOPICS].map((topicName) => (
                  <Badge
                    key={topicName}
                    variant={topic === topicName ? "default" : "secondary"}
                    className={`cursor-pointer transition-colors ${
                      topic === topicName 
                        ? 'bg-violet-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600'
                    }`}
                    onClick={() => handleTopicSelect(topicName)}
                  >
                    {topicName}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Topic Display */}
        {topic && (
          <div className="mb-6 p-4 bg-violet-600/20 border border-violet-600/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-5 w-5 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Selected Topic:</span>
            </div>
            <p className="text-white font-semibold text-lg">{topic}</p>
          </div>
        )}
        
        <Button 
          onClick={handleSubmit}
          disabled={!topic.trim()}
          className="w-full h-14 text-lg font-semibold bg-violet-600 hover:bg-violet-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Let&apos;s Practice! 🚀
        </Button>

        {/* Custom Topic Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-2">Can&apos;t find your topic?</p>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/custom-topic'}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Request Custom Topic
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 