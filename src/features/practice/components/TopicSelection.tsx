"use client"

import { Button } from "@/components/ui/button";
import { Zap, BookOpen, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { PREDEFINED_TOPICS } from "../constants";
import { useState, useEffect } from "react";

interface TopicSelectionProps {
  topic: string;
  onTopicChange: (topic: string) => void;
  onTopicSubmit: () => void;
  selectedExamCategory: string | null;
}

export const TopicSelection = ({
  topic,
  onTopicChange,
  onTopicSubmit,
  selectedExamCategory,
}: TopicSelectionProps) => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    console.log('TopicSelection - selectedExamCategory:', selectedExamCategory);
    if (selectedExamCategory) {
      setSelectedExam(selectedExamCategory);
    }
  }, [selectedExamCategory]);

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

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    onTopicChange(''); // Clear selected topic when subject changes
  };

  const handleExamSelect = (exam: string) => {
    setSelectedExam(exam);
    setSelectedSubject(null); // Clear selected subject when exam changes
    onTopicChange(''); // Clear selected topic when exam changes
  };

  const exams = Object.keys(PREDEFINED_TOPICS);
  const subjects = selectedExam ? Object.keys(PREDEFINED_TOPICS[selectedExam as keyof typeof PREDEFINED_TOPICS]) : [];
  const topics = (selectedExam && selectedSubject) ? PREDEFINED_TOPICS[selectedExam as keyof typeof PREDEFINED_TOPICS][selectedSubject as keyof (typeof PREDEFINED_TOPICS)[keyof typeof PREDEFINED_TOPICS]] : [];

  return (
    <div className="w-full px-4 md:px-8 py-8">
      <div className="text-left mb-8">
        <Zap className="h-16 w-16 text-yellow-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">What do you want to master today?</h2>
        <p className="text-gray-300 text-lg">Choose from our curated topics to practice!</p>
      </div>
      
      {/* Exam Selection Section */}
      {!selectedExamCategory && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-violet-400" />
            <h3 className="text-xl font-semibold text-white">Choose Your Exam</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            {exams.map((examName) => (
              <Button
                key={examName}
                variant="outline"
                className={`w-full h-auto py-2 px-3 text-left text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                  ${selectedExam === examName
                    ? 'bg-violet-600 text-white border-violet-600 shadow-lg'
                    : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                  }`}
                onClick={() => handleExamSelect(examName)}
              >
                {examName}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Subject Selection Section */}
      {selectedExam && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-violet-400" />
            <h3 className="text-xl font-semibold text-white">Choose Your Subject for {selectedExam}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {subjects.map((subjectName) => (
              <Button
                key={subjectName}
                variant="outline"
                className={`w-full h-auto py-2 px-3 text-left text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                  ${selectedSubject === subjectName
                    ? 'bg-violet-600 text-white border-violet-600 shadow-lg'
                    : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                  }`}
                onClick={() => handleSubjectSelect(subjectName)}
              >
                {subjectName}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Topic Selection Section */}
      {selectedExam && selectedSubject && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-violet-400" />
            <h3 className="text-xl font-semibold text-white">Choose Your Topic for {selectedSubject}</h3>
          </div>

          {/* Topics Grid */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">Select Topic:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {topics.map((topicName: string) => (
                <Button
                  key={topicName}
                  variant="outline"
                  className={`w-full h-auto py-2 px-3 text-left text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                    ${topic === topicName
                      ? 'bg-violet-600 text-white border-violet-600 shadow-lg'
                      : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                    }`}
                  onClick={() => handleTopicSelect(topicName)}
                >
                  {topicName}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!selectedExam && (
        <p className="text-gray-400 text-left">Please select an exam to see subjects.</p>
      )}
      {!selectedSubject && selectedExam && (
        <p className="text-gray-400 text-left">Please select a subject to see topics.</p>
      )}

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
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!topic.trim() || !selectedExam || !selectedSubject}
          className="w-full sm:w-auto h-14 text-lg font-semibold bg-violet-600 hover:bg-violet-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Let&apos;s Practice! 🚀
        </Button>
      </div>

      {/* Custom Topic Link */}
      <div className="mt-6 text-left">
        <p className="text-gray-400 text-sm">Can&apos;t find your topic? <a href="/custom-topic" className="text-blue-400 hover:text-blue-300 text-sm underline">Request Custom Topic</a></p>
      </div>
    </div>
  );
};