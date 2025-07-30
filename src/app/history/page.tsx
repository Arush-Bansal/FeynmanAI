"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Calendar,
  Loader2,
  Play,
  CheckCircle,
  XCircle,
  BarChart3
} from "lucide-react";
import { getPracticeSessionsByUser } from "@/features/db/data/practiceSessions";
import { getPracticeSessionStats } from "@/features/db/data/practiceSessions";

interface PracticeSession {
  _id: string;
  concept: {
    name: string;
    code: string;
  };
  subtopic: {
    name: string;
  };
  topic: {
    name: string;
  };
  subject: {
    name: string;
  };
  exam: {
    name: string;
  };
  transcript: string;
  duration: number;
  analysis: {
    overallScore: number;
    coveredTopics: string[];
    missedTopics: string[];
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  startedAt: string;
  completedAt?: string;
  createdAt: string;
}

interface SessionStats {
  totalSessions: number;
  totalTime: number;
  averageScore: number;
  bestScore: number;
}

const HistoryPage = () => {
  const { data: session } = useSession();
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!session?.user?.email) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch practice sessions
        const sessionsResponse = await fetch('/api/practice-sessions');
        if (!sessionsResponse.ok) {
          throw new Error('Failed to fetch practice sessions');
        }
        const sessionsData = await sessionsResponse.json();
        setPracticeSessions(sessionsData);

        // Fetch stats
        const statsResponse = await fetch('/api/practice-sessions/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [session]);

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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'IN_PROGRESS':
        return <Play className="h-4 w-4 text-yellow-500" />;
      case 'ABANDONED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-600 text-white">Completed</Badge>;
      case 'IN_PROGRESS':
        return <Badge className="bg-yellow-600 text-white">In Progress</Badge>;
      case 'ABANDONED':
        return <Badge className="bg-red-600 text-white">Abandoned</Badge>;
      default:
        return <Badge className="bg-gray-600 text-white">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading your history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
          <p className="text-gray-300">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-green-600 hover:bg-green-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Practice History</h1>
          <p className="text-gray-400">Track your learning progress and review past sessions</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Sessions</p>
                    <p className="text-2xl font-bold text-white">{stats.totalSessions}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Time</p>
                    <p className="text-2xl font-bold text-white">{formatDuration(stats.totalTime)}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Average Score</p>
                    <p className="text-2xl font-bold text-white">{stats.averageScore.toFixed(1)}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Best Score</p>
                    <p className="text-2xl font-bold text-white">{stats.bestScore.toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Practice Sessions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Sessions</h2>
          
          {practiceSessions.length === 0 ? (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No practice sessions yet</h3>
                <p className="text-gray-500 mb-4">Start practicing to see your history here</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Practicing
                </Button>
              </CardContent>
            </Card>
          ) : (
            practiceSessions.map((session) => (
              <Card key={session._id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(session.status)}
                      <div>
                        <CardTitle className="text-white text-lg">
                          {session.concept.name}
                        </CardTitle>
                        <p className="text-gray-400 text-sm">
                          {session.subject.name} • {session.topic.name} • {session.subtopic.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(session.status)}
                      {session.analysis?.overallScore && (
                        <Badge className="bg-blue-600 text-white">
                          {session.analysis.overallScore.toFixed(1)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{formatDate(session.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{formatDuration(session.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{session.exam.name}</span>
                    </div>
                  </div>
                  
                  {session.analysis && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {session.analysis.strengths && session.analysis.strengths.length > 0 && (
                          <div>
                            <h4 className="text-green-400 font-medium mb-2">Strengths</h4>
                            <div className="flex flex-wrap gap-1">
                              {session.analysis.strengths.slice(0, 3).map((strength, index) => (
                                <Badge key={index} className="bg-green-600/20 text-green-400 border-green-600/30">
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {session.analysis.weaknesses && session.analysis.weaknesses.length > 0 && (
                          <div>
                            <h4 className="text-red-400 font-medium mb-2">Areas to Improve</h4>
                            <div className="flex flex-wrap gap-1">
                              {session.analysis.weaknesses.slice(0, 3).map((weakness, index) => (
                                <Badge key={index} className="bg-red-600/20 text-red-400 border-red-600/30">
                                  {weakness}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage; 