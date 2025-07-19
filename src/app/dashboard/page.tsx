"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, TrendingUp, Calendar, Target, Award, ArrowRight, BarChart3, Clock, Star } from "lucide-react";
import Link from 'next/link';
import { Navigation } from "@/components/Navigation";

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('week');

  // Mock data - in a real app, this would come from a database
  const stats = {
    totalSessions: 24,
    totalTopics: 18,
    averageScore: 8.2,
    currentStreak: 5,
    weeklyGoal: 3,
    weeklyProgress: 2
  };

  const recentSessions = [
    {
      topic: "Quantum Physics",
      date: "2024-01-15",
      score: 8.5,
      duration: "4:32",
      status: "completed"
    },
    {
      topic: "Machine Learning Basics",
      date: "2024-01-14",
      score: 7.8,
      duration: "6:15",
      status: "completed"
    },
    {
      topic: "Climate Change",
      date: "2024-01-13",
      score: 9.1,
      duration: "5:42",
      status: "completed"
    },
    {
      topic: "Shakespeare's Themes",
      date: "2024-01-12",
      score: 8.9,
      duration: "7:18",
      status: "completed"
    }
  ];

  const topTopics = [
    { topic: "Physics", sessions: 8, avgScore: 8.7 },
    { topic: "Computer Science", sessions: 6, avgScore: 8.2 },
    { topic: "Literature", sessions: 4, avgScore: 8.9 },
    { topic: "Biology", sessions: 3, avgScore: 7.8 }
  ];

  const achievements = [
    { name: "First Steps", description: "Complete your first practice session", earned: true },
    { name: "Consistent Learner", description: "Practice for 7 days in a row", earned: true },
    { name: "Topic Master", description: "Master 5 different topics", earned: false },
    { name: "Perfect Score", description: "Get a 10/10 on any explanation", earned: false }
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black opacity-90"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      }}></div>

      <div className="relative z-10">
        <Navigation currentPage="/dashboard" />

        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Your Dashboard</h1>
                <p className="text-gray-300">Track your learning progress and achievements</p>
              </div>
              <Link href="/practice">
                <Button className="bg-violet-600 hover:bg-violet-700">
                  New Practice Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Sessions</p>
                      <p className="text-3xl font-bold text-white">{stats.totalSessions}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-violet-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Topics Covered</p>
                      <p className="text-3xl font-bold text-white">{stats.totalTopics}</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Avg Score</p>
                      <p className="text-3xl font-bold text-white">{stats.averageScore}/10</p>
                    </div>
                    <Award className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Current Streak</p>
                      <p className="text-3xl font-bold text-white">{stats.currentStreak} days</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Goal Progress */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Weekly Goal</h3>
                  <Badge className="bg-violet-600 text-white">
                    {stats.weeklyProgress}/{stats.weeklyGoal} sessions
                  </Badge>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-violet-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {stats.weeklyGoal - stats.weeklyProgress} more sessions to reach your goal
                </p>
              </CardContent>
            </Card>

            {/* Recent Sessions & Top Topics */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Recent Sessions */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Sessions</h3>
                  <div className="space-y-4">
                    {recentSessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{session.topic}</p>
                          <p className="text-gray-400 text-sm">{session.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-600 text-white">
                            {session.score}/10
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{session.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Topics */}
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Top Topics</h3>
                  <div className="space-y-4">
                    {topTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{topic.topic}</p>
                          <p className="text-gray-400 text-sm">{topic.sessions} sessions</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-white font-medium">{topic.avgScore}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-green-900/20 border-green-600' 
                          : 'bg-gray-800/50 border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          achievement.earned ? 'bg-green-600' : 'bg-gray-600'
                        }`}>
                          <Award className={`h-4 w-4 ${
                            achievement.earned ? 'text-white' : 'text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className={`font-medium ${
                            achievement.earned ? 'text-white' : 'text-gray-300'
                          }`}>
                            {achievement.name}
                          </p>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 