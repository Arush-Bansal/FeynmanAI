"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Zap, ArrowRight, BookOpen, Target, Users, Award } from "lucide-react";
import Link from 'next/link';
import { Navigation } from "@/components/Navigation";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

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
    <div className="min-h-screen bg-gray-950 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black opacity-90"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      }}></div>

      <div className="relative z-10">
        <Navigation currentPage="/" />

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-12 w-12 text-violet-400" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Feynman
              </h1>
              <Sparkles className="h-10 w-10 text-blue-400" />
            </div>
            <p className="text-xl text-violet-300 mb-4">by Grifi</p>
            <h2 className="text-4xl font-bold text-white mb-6">
              Master any concept by explaining it simply ✨
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Use the Feynman Technique to deepen your understanding. Explain concepts out loud, 
              get instant feedback, and identify gaps in your knowledge.
            </p>
            
            <div className="flex gap-4 justify-center mb-16">
              <Link href="/practice">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-lg px-8 py-4">
                  Start Practicing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
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
                  onClick={() => setActiveFeature(index)}
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

        {/* CTA Section */}
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
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-lg px-8 py-4">
                  Start Your First Practice Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
