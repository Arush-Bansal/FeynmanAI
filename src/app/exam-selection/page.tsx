"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

import { TOPIC_CONTENT } from '@/features/content-library';

const ExamSelectionPage = () => {
  const router = useRouter();

  const handleExamSelect = (exam: string) => {
    localStorage.setItem('selectedExamCategory', exam);
    router.push('/practice');
  };

  // Optional: Redirect if exam is already selected
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedExam = localStorage.getItem('selectedExamCategory');
      if (storedExam) {
        // router.push('/practice'); // Uncomment if you want to skip this page if exam is already selected
      }
    }
  }, []);

  const examCategories = Object.keys(TOPIC_CONTENT);

  const getExamConfig = (exam: string) => {
    switch (exam) {
      case 'JEE':
        return {
          icon: '/images/jee-icon.svg',
          gradient: 'from-blue-700 to-blue-900',
          description: 'Engineering Entrance',
        };
      case 'NEET':
        return {
          icon: '/images/neet-icon.svg',
          gradient: 'from-green-700 to-green-900',
          description: 'Medical Entrance',
        };
      default:
        return {
          icon: '/images/default-icon.svg',
          gradient: 'from-gray-700 to-gray-900',
          description: 'Exam',
        };
    }
  };

  return (
    
      <div className="flex flex-col h-screen w-full">
        {examCategories.map((exam) => {
          const config = getExamConfig(exam);
          return (
            <div
              key={exam}
              className={`flex-1 flex flex-col items-center justify-center bg-gradient-to-br ${config.gradient} text-white cursor-pointer transition-all duration-300 hover:scale-[1.01] shadow-lg`}
              onClick={() => handleExamSelect(exam)}
            >
              <Image src={config.icon} alt={`${exam} Icon`} width={120} height={120} className="mb-4" />
              <h2 className="text-4xl font-bold">{exam}</h2>
              <p className="text-lg mt-2">{config.description}</p>
            </div>
          );
        })}
      </div>
    
  );
};

export default ExamSelectionPage;