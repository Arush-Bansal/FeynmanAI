"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeatureCard } from "@/components/FeatureCard";
import { KnowledgeGraphDemo } from "@/components/KnowledgeGraphDemo";
import { 
  Brain, 
  MessageSquare, 
  Target, 
  Zap, 
  BookOpen, 
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Mic
} from "lucide-react";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Revolutionary knowledge graphs that light up as you speak, powered by advanced AI understanding."
    },
    {
      icon: Mic,
      title: "Voice Recognition",
      description: "Speak naturally about any topic while our AI analyzes your knowledge in real-time."
    },
    {
      icon: Target,
      title: "Feynman Technique",
      description: "Master complex topics by explaining them simply - the most effective learning method."
    },
    {
      icon: Sparkles,
      title: "Smart Assessment",
      description: "Get instant feedback on what you know, what you missed, and what's most important."
    },
    {
      icon: BookOpen,
      title: "Exam-Ready",
      description: "Focus on concepts that appear most frequently in past year papers and exams."
    },
    {
      icon: MessageSquare,
      title: "Interactive Feedback",
      description: "Receive personalized cards showing your knowledge gaps and areas for improvement."
    }
  ];

  const stats = [
    { number: "10M+", label: "Students Worldwide" },
    { number: "95%", label: "Retention Rate" },
    { number: "40%", label: "Faster Learning" }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="border-green-500/20 text-green-400">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered Learning Revolution
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Learn Faster with{" "}
                  <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
                    AI-Powered
                  </span>{" "}
                  Feynman Technique
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  Master any subject by speaking your thoughts while our AI creates 
                  a live knowledge graph. See exactly what you know, what you missed, 
                  and what matters most for your exams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {session ? (
                  <>
                    <Link href="/practice">
                      <Button size="lg" className="bg-green-600 text-white text-lg px-8 hover:bg-green-700 transition-all duration-300">
                        Start Practicing
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/custom-topic">
                      <Button variant="outline" size="lg" className="text-lg px-8 border-green-500/50 text-green-400 hover:bg-green-500/10">
                        Request Topic
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button size="lg" className="bg-green-600 text-white text-lg px-8 hover:bg-green-700 transition-all duration-300" onClick={() => signIn('google')}>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Login with Google
                    </Button>
                    <Link href="/practice">
                      <Button variant="outline" size="lg" className="text-lg px-8 border-green-500/20 text-green-400 hover:bg-green-500/10">
                        Watch Demo
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-green-500">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <KnowledgeGraphDemo />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-white">Knowledge Gaps</div>
                  <div className="text-xs text-gray-400">Identified</div>
                </div>
                <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-white">Exam Focus</div>
                  <div className="text-xs text-gray-400">Prioritized</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="border-green-500/20 text-green-400">
              How feynman Works
            </Badge>
            <h2 className="text-4xl font-bold text-white">Simple. Smart. Effective.</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the most advanced implementation of the Feynman Technique, 
              powered by AI that understands how you learn.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Choose Your Topic</h3>
              <p className="text-gray-300">
                Select any chapter or subject you want to master from your curriculum.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Speak Your Knowledge</h3>
              <p className="text-gray-300">
                Explain the topic in your own words while watching the knowledge graph light up.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Get Smart Feedback</h3>
              <p className="text-gray-300">
                Receive personalized insights on what you missed and what&apos;s exam-important.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="border-green-500/20 text-green-400">
              Features
            </Badge>
            <h2 className="text-4xl font-bold text-white">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Every feature is designed to accelerate your learning and help you 
              achieve better results in less time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8 mb-12">
            <Badge variant="secondary" className="border-green-500/20 text-green-400">
              <Users className="h-3 w-3 mr-1" />
              Ready to Start?
            </Badge>
            <h2 className="text-4xl font-bold text-white">
              {session ? "Continue Your Learning Journey" : "Join Thousands of Students"}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {session 
                ? "Pick up where you left off or explore new topics to master."
                : "Start mastering any subject with AI-powered feedback and personalized insights."
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {session ? (
              <>
                <Link href="/practice">
                  <Button size="lg" className="bg-green-600 text-white text-lg px-8 hover:bg-green-700 transition-all duration-300">
                    Continue Practicing
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/custom-topic">
                  <Button variant="outline" size="lg" className="text-lg px-8 border-green-500/50 text-green-400 hover:bg-green-500/10">
                    Request New Topic
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button size="lg" className="bg-green-600 text-white text-lg px-8 hover:bg-green-700 transition-all duration-300" onClick={() => signIn('google')}>
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Get Started Now
                </Button>
                <Link href="/practice">
                  <Button variant="outline" size="lg" className="text-lg px-8 border-green-500/20 text-green-400 hover:bg-green-500/10">
                    Watch Demo
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 bg-green-600 rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div className="text-lg font-semibold">
                <span className="text-white">feynman</span>
                <span className="text-gray-400 text-sm ml-2">by Grifi</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2024 Grifi. All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}