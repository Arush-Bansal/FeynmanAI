"use client"

import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Zap, BookOpen, GraduationCap } from "lucide-react";

interface TopicContent {
  keyPoints: string[];
  concepts: string;
}

interface ExamContent { 
  [key: string]: TopicContent;
}

interface SubjectContent {
  [key: string]: ExamContent;
}

interface TopicContentType {
  [key: string]: SubjectContent;
}

const SelectTopicPage = () => {
  const [topic, setTopic] = useState('');
  const [selectedExamCategory, setSelectedExamCategory] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [topicContent, setTopicContent] = useState<TopicContentType | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCategory = localStorage.getItem('selectedExamCategory');
      if (storedCategory) {
        setSelectedExamCategory(storedCategory);
      }
    }
  }, []);

  useEffect(() => {
    // Dynamically import TOPIC_CONTENT to avoid serialization issues
    import('@/features/content-library/constants').then((module) => {
      setTopicContent(module.TOPIC_CONTENT);
    });
  }, []);

  const handleTopicSubmit = () => {
    if (!topic.trim() || !selectedExamCategory || !selectedSubject) {
      toast.error('Please select an exam, subject, and topic to practice!');
      return;
    }
    router.push(`/practice?exam=${selectedExamCategory}&subject=${selectedSubject}&topic=${topic}`);
  };

  const handleTopicSelect = (selectedTopic: string) => {
    setTopic(selectedTopic);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setTopic(''); // Clear selected topic when subject changes
  };

  const handleExamSelect = (exam: string) => {
    setSelectedExamCategory(exam);
    setSelectedSubject(null); // Clear selected subject when exam changes
    setTopic(''); // Clear selected topic when exam changes
  };

  if (!topicContent) {
    return (
      <div className="w-full px-4 md:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading topics...</p>
        </div>
      </div>
    );
  }

  const exams = Object.keys(topicContent);
  const subjects = selectedExamCategory ? Object.keys(topicContent[selectedExamCategory]) : [];
  const topics = (selectedExamCategory && selectedSubject) ? Object.keys(topicContent[selectedExamCategory][selectedSubject]) : [];

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
                  ${selectedExamCategory === examName
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
      {selectedExamCategory && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-violet-400" />
            <h3 className="text-xl font-semibold text-white">Choose Your Subject for {selectedExamCategory}</h3>
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
      {selectedExamCategory && selectedSubject && (
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

      {!selectedExamCategory && (
        <p className="text-gray-400 text-left">Please select an exam to see subjects.</p>
      )}
      {!selectedSubject && selectedExamCategory && (
        <p className="text-gray-400 text-left">Please select a subject to see topics.</p>
      )}

      {/* Selected Topic Display */}
      {topic && (
        <div className="mb-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-300">Selected Topic:</span>
          </div>
          <p className="text-white font-semibold text-lg">{topic}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={handleTopicSubmit}
          disabled={!topic.trim() || !selectedExamCategory || !selectedSubject}
          className="w-full sm:w-auto h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

export default SelectTopicPage;