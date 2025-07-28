"use client"
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Loader2 } from "lucide-react";
import { useExamSelection } from '@/hooks/useExamSelection';
import { clearUserData } from "@/lib/utils";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const { exams, isLoadingExams, userPreference, selectExam } = useExamSelection();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedExam = localStorage.getItem('selectedExamCategory');
      if (storedExam) {
        setSelectedExam(storedExam);
      }
    }
  }, []);

  // Update selected exam when user preference changes
  useEffect(() => {
    if (userPreference?.currentExam) {
      setSelectedExam(userPreference.currentExam);
    }
  }, [userPreference]);

  const handleExamSelect = async (examCode: string) => {
    try {
      await selectExam(examCode);
      setSelectedExam(examCode);
      localStorage.setItem('selectedExamCategory', examCode);
    } catch (error) {
      console.error('Error selecting exam:', error);
    }
  };

  const handleSignOut = () => {
    // Clear localStorage before signing out
    clearUserData();
    signOut({ callbackUrl: "/" });
  };

  if (isLoadingExams) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white">Profile</h1>
      </div>

      <div className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl rounded-lg p-8 mb-8">
        <div className="flex items-center gap-6">
          {session?.user?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full hidden sm:block"
            />
          )}
          <div>
            <h2 className="text-3xl font-bold text-white">{session?.user?.name}</h2>
            <p className="text-lg text-gray-300">{session?.user?.email}</p>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="mt-4 border-gray-600 text-white hover:bg-gray-800 text-red-500 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2 text-red-500 hover:text-white" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Exam Preparation</h2>
        <p className="text-gray-300 mb-4">Choose the exam you are preparing for:</p>
        <div className="flex flex-wrap gap-3">
          {exams.map((exam) => (
            <Badge
              key={exam._id}
              variant={selectedExam === exam.code ? "default" : "secondary"}
              className={`cursor-pointer text-lg px-4 py-2 ${
                selectedExam === exam.code 
                  ? 'bg-green-600 text-white hover:bg-gray-600 hover:text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600'
              }`}
              onClick={() => handleExamSelect(exam.code)}
            >
              {exam.name}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;