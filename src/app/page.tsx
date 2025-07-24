"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, ArrowRight, Target, Award } from "lucide-react";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { KnowledgeGraphDemo } from "@/components/KnowledgeGraphDemo";

export default function Home() {
  const { data: session } = useSession();
  

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-violet-400" />,
      title: "Master Any Concept",
      description: "Choose any topic and explain it like you're teaching a friend"
    },
    {
      icon: <Target className="h-8 w-8 text-blue-400" />,
      title: "Get Instant Feedback",
      description: "Receive AI-powered analysis of your explanations"
    },
    {
      icon: <Award className="h-8 w-8 text-green-400" />,
      title: "Track Progress",
      description: "See your improvement over time with detailed insights"
    }
  ];

  return (
    <>
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Master any concept by explaining it simply ✨
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Use the Feynman Technique to deepen your understanding. Explain concepts out loud, 
                get instant feedback, and identify gaps in your knowledge.
              </p>
              
              <div className="flex gap-4 justify-center mb-16">
                {session ? (
                  <Link href="/practice">
                    <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-400 text-white text-lg px-8 py-4 rounded-md shadow-md hover:brightness-105 transition-all duration-200">
                      Start Practicing Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4" onClick={() => signIn('google')}>
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
                      <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4 bg-transparent">
                        Watch a Demo
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-white text-center mb-12">
                Why Use the Feynman Technique?
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {features.map((feature, index) => (
                  <Card 
                    key={index}
                    className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 cursor-pointer"
                    // onClick={() => setActiveFeature(index)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                      <p className="text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="p-12 text-center">
                <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Master Your Knowledge?
                </h3>
                <p className="text-xl text-gray-300 mb-8">
                  Choose any topic and start explaining. Our AI will help you identify areas for improvement.
                </p>
                <Link href="/practice">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-400 text-white text-lg px-8 py-4 rounded-md shadow-md hover:brightness-105 transition-all duration-200">
                    Start Your First Practice Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="container mx-auto px-4 py-16">
            <KnowledgeGraphDemo />
          </div>
        </>
  );
}