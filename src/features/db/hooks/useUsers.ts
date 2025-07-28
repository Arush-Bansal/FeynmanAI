import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getUserByEmail, 
  getUserById, 
  createUser, 
  updateUser, 
  updateUserStats, 
  updateUserPreferences, 
  incrementUserStats 
} from '../data';

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  byEmail: (email: string) => [...userKeys.all, 'byEmail', email] as const,
};

// Get user by ID
export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get user by email
export const useUserByEmail = (email: string) => {
  return useQuery({
    queryKey: userKeys.byEmail(email),
    queryFn: () => getUserByEmail(email),
    enabled: !!email,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // Add the new user to cache
      queryClient.setQueryData(userKeys.detail(data._id.toString()), data);
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => updateUser(id, data),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(userKeys.detail(variables.id), data);
    },
  });
};

// Update user stats mutation
export const useUpdateUserStats = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, stats }: { id: string; stats: Record<string, unknown> }) => updateUserStats(id, stats),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(userKeys.detail(variables.id), data);
    },
  });
};

// Update user preferences mutation
export const useUpdateUserPreferences = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, preferences }: { id: string; preferences: Record<string, unknown> }) => 
      updateUserPreferences(id, preferences),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(userKeys.detail(variables.id), data);
    },
  });
};

// Increment user stats mutation
export const useIncrementUserStats = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, statsUpdate }: { 
      id: string; 
      statsUpdate: {
        totalPracticeSessions?: number;
        totalPracticeTime?: number;
        streakDays?: number;
      }
    }) => incrementUserStats(id, statsUpdate),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(userKeys.detail(variables.id), data);
    },
  });
}; 