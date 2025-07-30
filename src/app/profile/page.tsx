"use client"
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LogOut, 
  Loader2, 
  Settings, 
  Clock, 
  Trophy, 
  Calendar,
  BookOpen,
  Flame,
  Bell,
  User,
  Shield,
  BarChart3,
  Edit3,
  Save,
  X
} from "lucide-react";
import { useExamSelection } from '@/hooks/useExamSelection';
import { clearUserData } from "@/lib/utils";

interface UserProfile {
  user: {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  preferences: {
    defaultExam?: string;
    notificationSettings: {
      email: boolean;
      push: boolean;
    };
    practiceGoals: {
      dailyTarget: number;
      weeklyTarget: number;
    };
  };
  stats: {
    totalPracticeSessions: number;
    totalPracticeTime: number;
    totalHours: number;
    averageScore: number;
    bestScore: number;
    streakDays: number;
    lastActiveDate: string;
  };
  analytics: {
    totalSessions: number;
    totalTime: number;
    averageScore: number;
    totalDays: number;
  };
}

const ProfilePage = () => {
  const { data: session } = useSession();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPreferences, setEditedPreferences] = useState<UserProfile['preferences'] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { exams, isLoadingExams, userPreference, selectExam } = useExamSelection();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedExam = localStorage.getItem('selectedExamCategory');
      if (storedExam) {
        setSelectedExam(storedExam);
      }
    }
  }, []);

  useEffect(() => {
    if (userPreference?.currentExam) {
      setSelectedExam(userPreference.currentExam);
    }
  }, [userPreference]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!session?.user?.email) return;

      try {
        setIsLoading(true);
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setEditedPreferences(data.preferences);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [session]);

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
    clearUserData();
    signOut({ callbackUrl: "/" });
  };

  const handleSavePreferences = async () => {
    if (!profileData) return;

    try {
      setIsSaving(true);
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences: editedPreferences }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfileData(prev => prev ? { ...prev, preferences: updatedData.user.preferences } : null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMasteryLevel = (score: number) => {
    if (score >= 90) return { level: 'EXPERT', color: 'text-purple-400', bg: 'bg-purple-900/20' };
    if (score >= 80) return { level: 'ADVANCED', color: 'text-blue-400', bg: 'bg-blue-900/20' };
    if (score >= 70) return { level: 'INTERMEDIATE', color: 'text-green-400', bg: 'bg-green-900/20' };
    if (score >= 50) return { level: 'BEGINNER', color: 'text-yellow-400', bg: 'bg-yellow-900/20' };
    return { level: 'NOVICE', color: 'text-red-400', bg: 'bg-red-900/20' };
  };

  if (isLoading || isLoadingExams) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300">Failed to load profile data</p>
        </div>
      </div>
    );
  }

  const masteryLevel = getMasteryLevel(profileData.stats.averageScore);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Profile</h1>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="border-gray-600 text-white hover:bg-gray-800 text-red-500 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Profile Overview */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-6 mb-6">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-green-500/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-green-500/20 border-4 border-green-500/20 flex items-center justify-center">
                  <User className="h-10 w-10 text-green-400" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{session?.user?.name}</h2>
                <p className="text-lg text-gray-300 mb-2">{session?.user?.email}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-green-900/30 text-green-400 border-green-500/30">
                    <Shield className="h-3 w-3 mr-1" />
                    {profileData.user.role.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-900/30 text-blue-400 border-blue-500/30">
                    <Calendar className="h-3 w-3 mr-1" />
                    Member since {formatDate(profileData.user.createdAt)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Sessions</p>
                      <p className="text-2xl font-bold text-white">{profileData.stats.totalPracticeSessions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Time</p>
                      <p className="text-2xl font-bold text-white">{formatDuration(profileData.stats.totalPracticeTime)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Trophy className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Best Score</p>
                      <p className="text-2xl font-bold text-white">{profileData.stats.bestScore}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Flame className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Streak</p>
                      <p className="text-2xl font-bold text-white">{profileData.stats.streakDays} days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Performance & Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings & Preferences */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5 text-green-400" />
                  Settings & Preferences
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-gray-400 hover:text-white"
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exam Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Exam Preparation</h3>
                <p className="text-gray-300 mb-4 text-sm">Choose the exam you are preparing for:</p>
                <div className="flex flex-wrap gap-3">
                  {exams.map((exam) => (
                    <Badge
                      key={exam._id}
                      variant={selectedExam === exam.code ? "default" : "secondary"}
                      className={`cursor-pointer text-sm px-3 py-2 ${
                        selectedExam === exam.code 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600'
                      }`}
                      onClick={() => handleExamSelect(exam.code)}
                    >
                      {exam.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Practice Goals */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Practice Goals</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Daily Target (minutes)</label>
                                         <input
                       type="number"
                       value={editedPreferences?.practiceGoals?.dailyTarget || 30}
                       onChange={(e) => setEditedPreferences(prev => prev ? {
                         ...prev,
                         practiceGoals: { ...prev.practiceGoals, dailyTarget: parseInt(e.target.value) }
                       } : null)}
                       disabled={!isEditing}
                       className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white disabled:opacity-50"
                     />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Weekly Sessions Target</label>
                                         <input
                       type="number"
                       value={editedPreferences?.practiceGoals?.weeklyTarget || 5}
                       onChange={(e) => setEditedPreferences(prev => prev ? {
                         ...prev,
                         practiceGoals: { ...prev.practiceGoals, weeklyTarget: parseInt(e.target.value) }
                       } : null)}
                       disabled={!isEditing}
                       className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white disabled:opacity-50"
                     />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Email Notifications</span>
                    </div>
                                         <input
                       type="checkbox"
                       checked={editedPreferences?.notificationSettings?.email || false}
                       onChange={(e) => setEditedPreferences(prev => prev ? {
                         ...prev,
                         notificationSettings: { ...prev.notificationSettings, email: e.target.checked }
                       } : null)}
                       disabled={!isEditing}
                       className="w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                     />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Push Notifications</span>
                    </div>
                                         <input
                       type="checkbox"
                       checked={editedPreferences?.notificationSettings?.push || false}
                       onChange={(e) => setEditedPreferences(prev => prev ? {
                         ...prev,
                         notificationSettings: { ...prev.notificationSettings, push: e.target.checked }
                       } : null)}
                       disabled={!isEditing}
                       className="w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                     />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <Button
                  onClick={handleSavePreferences}
                  disabled={isSaving}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
          
          {/* Performance Metrics */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5 text-green-400" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Average Score */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-gray-400 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-white">{profileData.stats.averageScore.toFixed(1)}%</p>
                </div>
                <Badge className={`${masteryLevel.bg} ${masteryLevel.color} border-0`}>
                  {masteryLevel.level}
                </Badge>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Daily Goal Progress</span>
                    <span className="text-white">
                      {Math.min(100, (profileData.stats.totalPracticeTime / (profileData.preferences.practiceGoals.dailyTarget * 60)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, (profileData.stats.totalPracticeTime / (profileData.preferences.practiceGoals.dailyTarget * 60)) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Weekly Sessions Goal</span>
                    <span className="text-white">
                      {Math.min(100, (profileData.stats.totalPracticeSessions / profileData.preferences.practiceGoals.weeklyTarget) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, (profileData.stats.totalPracticeSessions / profileData.preferences.practiceGoals.weeklyTarget) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Last Active */}
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Last Active</p>
                <p className="text-white font-medium">{formatDate(profileData.stats.lastActiveDate)}</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;