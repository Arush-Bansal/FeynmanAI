import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getExamsForSelection, 
  getExamCategories 
} from '../services/contentService';
import { getExamByCode } from '../data/client';
import { 
  getAllExams, 
  createExam, 
  updateExam, 
  deleteExam
} from '../data/client';

// Query Keys
export const examKeys = {
  all: ['exams'] as const,
  lists: () => [...examKeys.all, 'list'] as const,
  list: (filters: string) => [...examKeys.lists(), { filters }] as const,
  details: () => [...examKeys.all, 'detail'] as const,
  detail: (id: string) => [...examKeys.details(), id] as const,
  categories: () => [...examKeys.all, 'categories'] as const,
  byCode: (code: string) => [...examKeys.all, 'byCode', code] as const,
};

// Get all exams for selection (with UI data)
export const useExamsForSelection = () => {
  return useQuery({
    queryKey: examKeys.lists(),
    queryFn: getExamsForSelection,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get exam categories
export const useExamCategories = () => {
  return useQuery({
    queryKey: examKeys.categories(),
    queryFn: getExamCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get exam by code
export const useExamByCode = (code: string) => {
  return useQuery({
    queryKey: examKeys.byCode(code),
    queryFn: () => getExamByCode(code),
    enabled: !!code,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get all exams (raw data)
export const useAllExams = () => {
  return useQuery({
    queryKey: examKeys.lists(),
    queryFn: getAllExams,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create exam mutation
export const useCreateExam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createExam,
    onSuccess: () => {
      // Invalidate and refetch exams
      queryClient.invalidateQueries({ queryKey: examKeys.lists() });
      queryClient.invalidateQueries({ queryKey: examKeys.categories() });
    },
  });
};

// Update exam mutation
export const useUpdateExam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => updateExam(id, data),
    onSuccess: (data, variables) => {
      // Update the specific exam in cache
      queryClient.setQueryData(examKeys.detail(variables.id), data);
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: examKeys.lists() });
    },
  });
};

// Delete exam mutation
export const useDeleteExam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteExam,
    onSuccess: (_, variables) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: examKeys.detail(variables) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: examKeys.lists() });
      queryClient.invalidateQueries({ queryKey: examKeys.categories() });
    },
  });
}; 