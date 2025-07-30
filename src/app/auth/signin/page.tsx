"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Brain, Zap } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const SignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  useEffect(() => {
    if (session) {
      router.push(callbackUrl);
    }
  }, [session, router, callbackUrl]);

  useEffect(() => {
    if (error) {
      toast.error('Authentication failed. Please try again.');
    }
  }, [error]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6 w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center">
              <Brain className="h-10 w-10 text-green-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Welcome to Feynman
            </CardTitle>
            <p className="text-gray-300 text-lg">
              Master concepts through explanation
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">Learn through teaching</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Brain className="h-4 w-4" />
                <span className="text-sm">AI-powered analysis</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Zap className="h-4 w-4" />
                <span className="text-sm">Instant feedback</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 h-12 text-base font-medium"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
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
                Continue with Google
              </Button>
            </div>

            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-4">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
              
              <Button
                variant="ghost"
                asChild
                className="text-gray-400 hover:text-white"
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SignInPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SignInPage />
  </Suspense>
);

export default SignInPageWithSuspense; 