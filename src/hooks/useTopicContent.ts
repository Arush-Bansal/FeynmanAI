import { useQuery } from '@tanstack/react-query';

interface TopicContent {
  keyPoints: string[];
  concepts: string;
}

interface TopicContentResponse {
  success: boolean;
  content: TopicContent;
}

const fetchTopicContent = async (examCode: string, subjectName: string, topicName: string): Promise<TopicContentResponse> => {
  const response = await fetch(`/api/topic-content?exam=${encodeURIComponent(examCode)}&subject=${encodeURIComponent(subjectName)}&topic=${encodeURIComponent(topicName)}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch topic content');
  }

  return response.json();
};

export const useTopicContent = (examCode: string | null, subjectName: string | null, topicName: string | null) => {
  return useQuery({
    queryKey: ['topicContent', examCode, subjectName, topicName],
    queryFn: () => {
      if (!examCode || !subjectName || !topicName) {
        throw new Error('Missing required parameters');
      }
      return fetchTopicContent(examCode, subjectName, topicName);
    },
    enabled: !!(examCode && subjectName && topicName),
  });
}; 