"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const AuthErrorContent = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please contact support.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link has expired or has already been used.';
      case 'Default':
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  const getErrorTitle = (errorCode: string | null) => {
    switch (errorCode) {
      case 'Configuration':
        return 'Configuration Error';
      case 'AccessDenied':
        return 'Access Denied';
      case 'Verification':
        return 'Verification Failed';
      case 'Default':
      default:
        return 'Authentication Error';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {getErrorTitle(error)}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-300 text-lg leading-relaxed">
                {getErrorMessage(error)}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Link href="/auth/signin">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Link>
              </Button>
              
              <Button
                variant="outline"
                asChild
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                Need help? Contact our support team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AuthErrorPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="w-full max-w-md">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Loading...
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 text-lg">Loading error details...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
};

export default AuthErrorPage; 