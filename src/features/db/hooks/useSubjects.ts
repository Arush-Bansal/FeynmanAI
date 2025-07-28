import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getSubjectsForExam,
  SubjectData 
} from '../services/contentService';
import { 
  getSubjectsByExam, 
  createSubject, 
  updateSubject, 
  deleteSubject 
} from '../data';

// Query Keys
export const subjectKeys = {
  all: ['subjects'] as const,
  lists: () => [...subjectKeys.all, 'list'] as const,
  list: (examId: string) => [...subjectKeys.lists(), { examId }] as const,
  details: () => [...subjectKeys.all, 'detail'] as const,
  detail: (id: string) => [...subjectKeys.details(), id] as const,
  byExam: (examCode: string) => [...subjectKeys.all, 'byExam', examCode] as const,
};

// Get subjects for a specific exam
export const useSubjectsForExam = (examCode: string) => {
  return useQuery({
    queryKey: subjectKeys.byExam(examCode),
    queryFn: () => getSubjectsForExam(examCode),
    enabled: !!examCode,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get subjects by exam ID (raw data)
export const useSubjectsByExam = (examId: string) => {
  return useQuery({
    queryKey: subjectKeys.list(examId),
    queryFn: () => getSubjectsByExam(examId),
    enabled: !!examId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create subject mutation
export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSubject,
    onSuccess: (data) => {
      // Invalidate subjects for the exam
      if (data.exam) {
        queryClient.invalidateQueries({ queryKey: subjectKeys.list(data.exam.toString()) });
      }
    },
  });
};

// Update subject mutation
export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => updateSubject(id, data),
    onSuccess: (data, variables) => {
      // Update the specific subject in cache
      queryClient.setQueryData(subjectKeys.detail(variables.id), data);
      // Invalidate lists to refetch
      if (data.exam) {
        queryClient.invalidateQueries({ queryKey: subjectKeys.list(data.exam.toString()) });
      }
    },
  });
};

// Delete subject mutation
export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteSubject,
    onSuccess: (_, variables) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: subjectKeys.detail(variables) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: subjectKeys.lists() });
    },
  });
}; 