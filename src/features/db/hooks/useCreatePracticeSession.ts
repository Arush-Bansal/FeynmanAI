"use client";

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type PracticeSessionData = {
  topic: string | null;
  exam: string | null;
  subject: string | null;
  subtopic: string | null;
  concept: string | null;
};

const createPracticeSession = async (sessionData: PracticeSessionData) => {
  const response = await fetch('/api/practice-sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'create',
      sessionData,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create practice session');
  }

  return response.json();
};

export const useCreatePracticeSession = () => {
  return useMutation({
    mutationFn: createPracticeSession,
    onSuccess: (data) => {
      toast.success('Practice session created successfully!');
      console.log('Practice session created:', data.sessionId);
    },
    onError: (error) => {
      toast.error(error.message);
      console.error('Error creating practice session:', error);
    },
  });
};
