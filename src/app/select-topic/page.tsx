"use client"

import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Zap, BookOpen, GraduationCap, Loader2 } from "lucide-react";
import { useExamSelection } from '@/hooks/useExamSelection';
import { useSubjects, useTopics } from '@/hooks/useContentSelection';
import { useTopicContent } from '@/hooks/useTopicContent';

interface Subject {
  _id: string;
  name: string;
  code: string;
  description: string;
  exam: string;
}

interface Topic {
  _id: string;
  name: string;
  code: string;
  description: string;
  subject: string;
}

const SelectTopicPage = () => {
  const [topic, setTopic] = useState('');
  const [selectedExamCategory, setSelectedExamCategory] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const router = useRouter();

  const { exams, isLoadingExams } = useExamSelection();

  // Get subjects for selected exam
  const {
    data: subjects = [],
    isLoading: isLoadingSubjects,
    error: subjectsError,
  } = useSubjects(selectedExamCategory);

  // Get topics for selected subject
  const {
    data: topics = [],
    isLoading: isLoadingTopics,
    error: topicsError,
  } = useTopics(selectedSubject);

  // Get topic content for selected topic
  const selectedSubjectData = subjects.find((s: Subject) => s._id === selectedSubject);
  const selectedTopicData = topics.find((t: Topic) => t._id === topic);
  const {} = useTopicContent(selectedExamCategory, selectedSubjectData?.name || null, selectedTopicData?.name || null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCategory = localStorage.getItem('selectedExamCategory');
      if (storedCategory) {
        setSelectedExamCategory(storedCategory);
      }
    }
  }, []);

  const handleTopicSubmit = () => {
    if (!topic.trim() || !selectedExamCategory || !selectedSubject) {
      toast.error('Please select an exam, subject, and topic to practice!');
      return;
    }

    // Get the selected topic data
    const selectedTopic = topics.find((t: Topic) => t._id === topic);
    if (!selectedTopic) {
      toast.error('Selected topic not found');
      return;
    }

    // Navigate to subtopic tree page
    router.push(`/subtopic-tree?exam=${selectedExamCategory}&subject=${selectedSubject}&topic=${selectedTopic._id}`);
  };

  const handleTopicSelect = (topicId: string) => {
    setTopic(topicId);
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setTopic(''); // Clear selected topic when subject changes
  };

  const handleExamSelect = (exam: string) => {
    setSelectedExamCategory(exam);
    setSelectedSubject(null); // Clear selected subject when exam changes
    setTopic(''); // Clear selected topic when exam changes
  };

  if (isLoadingExams) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading exams...</p>
        </div>
      </div>
    );
  }

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
            <BookOpen className="h-5 w-5 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Choose Your Exam</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            {exams.map((exam) => (
              <Button
                key={exam._id}
                variant="outline"
                className={`w-full h-auto py-2 px-3 text-left text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                  ${selectedExamCategory === exam.code
                    ? 'bg-green-600 text-white border-green-600 shadow-lg'
                    : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                  }`}
                onClick={() => handleExamSelect(exam.code)}
              >
                {exam.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Subject Selection Section */}
      {selectedExamCategory && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Choose Your Subject for {selectedExamCategory}</h3>
          </div>
          {isLoadingSubjects ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-green-400 mr-2" />
              <span className="text-gray-300">Loading subjects...</span>
            </div>
          ) : subjectsError ? (
            <div className="text-red-400 text-center py-4">
              Failed to load subjects. Please try again.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {subjects.map((subject: Subject) => (
                <Button
                  key={subject._id}
                  variant="outline"
                  className={`w-full h-auto py-2 px-3 text-left text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                    ${selectedSubject === subject._id
                      ? 'bg-transparent text-green-400 border-green-400 shadow-lg hover:bg-gray-700 hover:text-green-400'
                      : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                    }`}
                  onClick={() => handleSubjectSelect(subject._id)}
                >
                  {subject.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Topic Selection Section */}
      {selectedExamCategory && selectedSubject && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Choose Your Topic for {selectedSubjectData?.name || selectedSubject}</h3>
          </div>
          {isLoadingTopics ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-green-400 mr-2" />
              <span className="text-gray-300">Loading topics...</span>
            </div>
          ) : topicsError ? (
            <div className="text-red-400 text-center py-4">
              Failed to load topics. Please try again.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {topics.map((topicItem: Topic) => (
                <Button
                  key={topicItem._id}
                  variant="outline"
                  className={`w-full h-auto py-2 px-3 text-left text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                    ${topic === topicItem._id
                      ? 'bg-transparent text-green-400 border-green-400 shadow-lg hover:bg-gray-700 hover:text-green-400'
                      : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                    }`}
                  onClick={() => handleTopicSelect(topicItem._id)}
                >
                  {topicItem.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      {selectedExamCategory && selectedSubject && topic && (
        <div className="flex justify-center">
          <Button
            onClick={handleTopicSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            View Subtopic Tree
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectTopicPage;