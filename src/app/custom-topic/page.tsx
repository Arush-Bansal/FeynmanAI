"use client"
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";


const CustomTopicPage = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user?.email || '');
  const [customTopic, setCustomTopic] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !customTopic.trim()) {
      toast.error('Please fill in all fields!');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address!');
      return;
    }

    setIsLoading(true);
    
    try {
      // Google Apps Script Web App URL from environment variable
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!scriptURL) {
        throw new Error('Google Script URL not configured');
      }
      
      const formData = new FormData();
      formData.append('email', email);
      formData.append('topic', customTopic);
      formData.append('timestamp', new Date().toISOString());
      formData.append('type', 'custom_topic_request'); // To distinguish from waitlist entries
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Thank you for your request! We\'ll review it and get back to you soon.');
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error submitting your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setIsSubmitted(false);
    setEmail('');
    setCustomTopic('');
  };

  if (isSubmitted) {
    return (

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8 max_w-2xl pt-8">

            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
                <p className="text-gray-300 text-lg mb-6">
                  We&apos;ve received your custom topic request. We&apos;ll review it and get back to you soon!
                </p>
                <p className="text-gray-400 mb-8">
                  We&apos;ll send you an email at <strong className="text-white">{email}</strong> once your topic is added to our collection.
                </p>
                
                <div className="space-y-4">
                  <Button
                    onClick={handleBack}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Request Another Topic
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/practice'}
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Back to Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

    );
  }

  return (
    <div className="relative z-10">
      <div className="container mx-auto px-4 py-8 max-w-2xl pt-8">

        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Lightbulb className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Request Custom Topic</h2>
              <p className="text-gray-300 text-lg">
                Can&apos;t find your topic? Let us know what you&apos;d like to practice!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Lightbulb className="h-4 w-4 inline mr-2" />
                  Custom Topic
                </label>
                <textarea
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Describe the topic you'd like to practice (e.g., 'Advanced Calculus', 'Shakespeare's Sonnets', 'Machine Learning Algorithms')"
                  className="w-full h-32 p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Request 📝'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/practice'}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Practice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomTopicPage;