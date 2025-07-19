"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, BookOpen, Lightbulb, Target, ArrowLeft, Quote, Users, Award } from "lucide-react";
import Link from 'next/link';
import { Navigation } from "@/components/Navigation";

export default function About() {
  const steps = [
    {
      number: "01",
      title: "Choose a Concept",
      description: "Pick any topic you want to understand better - from quantum physics to cooking techniques."
    },
    {
      number: "02", 
      title: "Explain Out Loud",
      description: "Record yourself explaining the concept as if teaching it to someone who knows nothing about it."
    },
    {
      number: "03",
      title: "Identify Gaps",
      description: "Our AI analyzes your explanation and identifies areas where your understanding might be unclear."
    },
    {
      number: "04",
      title: "Refine & Repeat",
      description: "Use the feedback to improve your understanding and practice again until you master the concept."
    }
  ];

  const benefits = [
    {
      icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
      title: "Deeper Understanding",
      description: "Explaining concepts forces you to truly understand them, not just memorize."
    },
    {
      icon: <Target className="h-6 w-6 text-blue-400" />,
      title: "Identify Knowledge Gaps",
      description: "Discover exactly where your understanding is weak or unclear."
    },
    {
      icon: <Users className="h-6 w-6 text-green-400" />,
      title: "Better Communication",
      description: "Learn to explain complex ideas in simple, understandable terms."
    },
    {
      icon: <Award className="h-6 w-6 text-purple-400" />,
      title: "Retention & Recall",
      description: "Active explanation helps you remember information much better than passive reading."
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
        <Navigation currentPage="/about" />

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-12 w-12 text-violet-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                About Feynman
              </h1>
              <Sparkles className="h-10 w-10 text-blue-400" />
            </div>
            <p className="text-xl text-violet-300 mb-4">by Grifi</p>
            <h2 className="text-3xl font-bold text-white mb-6">
              The Power of Simple Explanation
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Named after the brilliant physicist Richard Feynman, this technique helps you master any concept 
              by explaining it in simple terms. If you can&apos;t explain it simply, you don&apos;t understand it well enough.
            </p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <Quote className="h-12 w-12 text-violet-400 mx-auto mb-4" />
              <blockquote className="text-2xl text-white italic mb-4">
                &quot;If you can&apos;t explain it to a six-year-old, you don&apos;t understand it yourself.&quot;
              </blockquote>
              <p className="text-gray-300">— Richard Feynman</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              How the Feynman Technique Works
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className="bg-gray-900/50 border-gray-700 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Badge className="bg-violet-600 text-white text-lg px-3 py-1">
                        {step.number}
                      </Badge>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Benefits of the Feynman Technique
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index}
                  className="bg-gray-900/50 border-gray-700 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{benefit.title}</h4>
                        <p className="text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
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
              <BookOpen className="h-16 w-16 text-violet-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Master Any Concept?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Start practicing the Feynman Technique today and transform how you learn.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/practice">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-lg px-8 py-4">
                    Start Practicing
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 