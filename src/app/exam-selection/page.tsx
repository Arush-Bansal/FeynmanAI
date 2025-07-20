"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { AuthLayout } from "@/components/AuthLayout";

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

  return (
    <AuthLayout requireAuth={false}>
      <div className="flex flex-col h-screen w-full">
        {/* JEE Block */}
        <div
          className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 text-white cursor-pointer transition-all duration-300 hover:scale-[1.01] shadow-lg"
          onClick={() => handleExamSelect('JEE')}
        >
          <Image src="/images/jee-icon.svg" alt="JEE Icon" width={120} height={120} className="mb-4" />
          <h2 className="text-4xl font-bold">JEE</h2>
          <p className="text-lg mt-2">Engineering Entrance</p>
        </div>

        {/* NEET Block */}
        <div
          className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-green-700 to-green-900 text-white cursor-pointer transition-all duration-300 hover:scale-[1.01] shadow-lg"
          onClick={() => handleExamSelect('NEET')}
        >
          <Image src="/images/neet-icon.svg" alt="NEET Icon" width={120} height={120} className="mb-4" />
          <h2 className="text-4xl font-bold">NEET</h2>
          <p className="text-lg mt-2">Medical Entrance</p>
        </div>

        
      </div>
    </AuthLayout>
  );
};

export default ExamSelectionPage;