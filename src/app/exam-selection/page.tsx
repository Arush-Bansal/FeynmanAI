"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, GraduationCap } from 'lucide-react';

import { EXAM_CATEGORIES } from '@/features/content-library';

const ExamSelectionPage = () => {
  const router = useRouter();

  const handleExamSelect = (exam: string) => {
    localStorage.setItem('selectedExamCategory', exam);
    router.push('/select-topic');
  };

  // Optional: Redirect if exam is already selected
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedExam = localStorage.getItem('selectedExamCategory');
      if (storedExam) {
        // router.push('/select-topic'); // Uncomment if you want to skip this page if exam is already selected
      }
    }
  }, []);

  const getExamConfig = (exam: string) => {
    switch (exam) {
      case 'JEE':
        return {
          icon: '/images/jee-icon.svg',
          description: 'Engineering Entrance',
          color: 'text-blue-400',
          bgColor: 'bg-blue-600',
        };
      case 'NEET':
        return {
          icon: '/images/neet-icon.svg',
          description: 'Medical Entrance',
          color: 'text-green-400',
          bgColor: 'bg-green-600',
        };
      default:
        return {
          icon: '/images/upsc-icon.svg',
          description: 'Civil Services',
          color: 'text-purple-400',
          bgColor: 'bg-purple-600',
        };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Exam
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the exam you&apos;re preparing for to get started with personalized practice
          </p>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {EXAM_CATEGORIES.map((exam) => {
            const config = getExamConfig(exam);
            return (
              <Card 
                key={exam}
                className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                onClick={() => handleExamSelect(exam)}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image 
                        src={config.icon} 
                        alt={`${exam} Icon`} 
                        width={48} 
                        height={48} 
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-3">{exam}</h2>
                  <p className="text-gray-300 text-lg mb-6">{config.description}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <GraduationCap className="h-4 w-4" />
                    <span>Click to continue</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Your selection will help us provide relevant topics and practice materials
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamSelectionPage;