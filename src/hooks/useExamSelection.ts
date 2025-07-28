import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface Exam {
  _id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  gradient: string;
}

interface ExamSelectionResponse {
  success: boolean;
  message: string;
  exam: {
    code: string;
    name: string;
    description: string;
    icon: string;
  };
}

interface UserExamPreference {
  currentExam: string | null;
}

// Fetch all available exams
const fetchExams = async (): Promise<Exam[]> => {
  const response = await fetch('/api/exams');
  if (!response.ok) {
    throw new Error('Failed to fetch exams');
  }
  const data = await response.json();
  return data.exams;
};

// Update user's exam preference
const updateExamPreference = async (examCode: string): Promise<ExamSelectionResponse> => {
  const response = await fetch('/api/exam-selection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ examCode }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update exam preference');
  }

  return response.json();
};

// Get user's current exam preference
const fetchUserExamPreference = async (): Promise<UserExamPreference> => {
  const response = await fetch('/api/exam-selection');
  if (!response.ok) {
    throw new Error('Failed to fetch user exam preference');
  }
  return response.json();
};

export const useExamSelection = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // Query for all available exams
  const {
    data: exams = [],
    isLoading: isLoadingExams,
    error: examsError,
  } = useQuery({
    queryKey: ['exams'],
    queryFn: fetchExams,
    enabled: !!session,
  });

  // Query for user's current exam preference
  const {
    data: userPreference,
    isLoading: isLoadingPreference,
    error: preferenceError,
  } = useQuery({
    queryKey: ['userExamPreference'],
    queryFn: fetchUserExamPreference,
    enabled: !!session,
  });

  // Mutation for updating exam preference
  const updateExamMutation = useMutation({
    mutationFn: updateExamPreference,
    onSuccess: (data) => {
      toast.success(data.message);
      // Invalidate and refetch user preference
      queryClient.invalidateQueries({ queryKey: ['userExamPreference'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const selectExam = (examCode: string) => {
    updateExamMutation.mutate(examCode);
  };

  return {
    exams,
    isLoadingExams,
    examsError,
    userPreference,
    isLoadingPreference,
    preferenceError,
    selectExam,
    isUpdating: updateExamMutation.isPending,
  };
}; 