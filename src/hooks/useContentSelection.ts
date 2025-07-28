import { useQuery } from '@tanstack/react-query';
import { 
  getSubjectsForExam, 
  getTopicsForSubject, 
  getSubtopicsForTopic, 
  getConceptsForSubtopic 
} from '@/features/db/services/contentService';

export const useSubjects = (examCode: string | null) => {
  return useQuery({
    queryKey: ['subjects', examCode],
    queryFn: () => examCode ? getSubjectsForExam(examCode) : Promise.resolve([]),
    enabled: !!examCode,
  });
};

export const useTopics = (subjectId: string | null) => {
  return useQuery({
    queryKey: ['topics', subjectId],
    queryFn: () => subjectId ? getTopicsForSubject(subjectId) : Promise.resolve([]),
    enabled: !!subjectId,
  });
};

export const useSubtopics = (topicId: string | null) => {
  return useQuery({
    queryKey: ['subtopics', topicId],
    queryFn: () => topicId ? getSubtopicsForTopic(topicId) : Promise.resolve([]),
    enabled: !!topicId,
  });
};

export const useConcepts = (subtopicId: string | null) => {
  return useQuery({
    queryKey: ['concepts', subtopicId],
    queryFn: () => subtopicId ? getConceptsForSubtopic(subtopicId) : Promise.resolve([]),
    enabled: !!subtopicId,
  });
}; 