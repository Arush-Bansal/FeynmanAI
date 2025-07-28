import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTopicsForSubject,
  TopicData 
} from '../services/contentService';
import { 
  getTopicsBySubject, 
  createTopic, 
  updateTopic, 
  deleteTopic 
} from '../data/client';

// Query Keys
export const topicKeys = {
  all: ['topics'] as const,
  lists: () => [...topicKeys.all, 'list'] as const,
  list: (subjectId: string) => [...topicKeys.lists(), { subjectId }] as const,
  details: () => [...topicKeys.all, 'detail'] as const,
  detail: (id: string) => [...topicKeys.details(), id] as const,
  bySubject: (subjectId: string) => [...topicKeys.all, 'bySubject', subjectId] as const,
};

// Get topics for a specific subject
export const useTopicsForSubject = (subjectId: string) => {
  return useQuery({
    queryKey: topicKeys.bySubject(subjectId),
    queryFn: () => getTopicsForSubject(subjectId),
    enabled: !!subjectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get topics by subject ID (raw data)
export const useTopicsBySubject = (subjectId: string) => {
  return useQuery({
    queryKey: topicKeys.list(subjectId),
    queryFn: () => getTopicsBySubject(subjectId),
    enabled: !!subjectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create topic mutation
export const useCreateTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTopic,
    onSuccess: (data) => {
      // Invalidate topics for the subject
      if (data.subject) {
        queryClient.invalidateQueries({ queryKey: topicKeys.list(data.subject.toString()) });
      }
    },
  });
};

// Update topic mutation
export const useUpdateTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => updateTopic(id, data),
    onSuccess: (data, variables) => {
      // Update the specific topic in cache
      queryClient.setQueryData(topicKeys.detail(variables.id), data);
      // Invalidate lists to refetch
      if (data.subject) {
        queryClient.invalidateQueries({ queryKey: topicKeys.list(data.subject.toString()) });
      }
    },
  });
};

// Delete topic mutation
export const useDeleteTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTopic,
    onSuccess: (_, variables) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: topicKeys.detail(variables) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: topicKeys.lists() });
    },
  });
}; 