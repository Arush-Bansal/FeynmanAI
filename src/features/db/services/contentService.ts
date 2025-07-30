// Client-safe content service that only makes API calls
// No direct database model imports

export interface ExamData {
  _id: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface SubjectData {
  _id: string;
  name: string;
  code: string;
  description: string;
  exam: string;
}

export interface TopicData {
  _id: string;
  name: string;
  code: string;
  description: string;
  subject: string;
}

export interface SubtopicData {
  _id: string;
  name: string;
  code: string;
  description: string;
  topic: string;
  parentSubtopic?: string;
}

export interface ConceptData {
  _id: string;
  name: string;
  code: string;
  description: string;
  subtopic: string;
  keyPoints: string[];
  concepts: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedTime: number;
}

export interface TopicContent {
  keyPoints: string[];
  concepts: string;
}

export interface ExamContent {
  [key: string]: TopicContent;
}

export interface SubjectContent {
  [key: string]: ExamContent;
}

export interface ContentLibrary {
  [key: string]: SubjectContent;
}

// Get all exams for the exam selection page
export const getExamsForSelection = async (): Promise<ExamData[]> => {
  const response = await fetch('/api/exams');
  if (!response.ok) {
    throw new Error('Failed to fetch exams');
  }
  const data = await response.json();
  return data.exams;
};

// Get exam categories (for backward compatibility)
export const getExamCategories = async (): Promise<string[]> => {
  const exams = await getExamsForSelection();
  return exams.map(exam => exam.code);
};

// Get subjects for a specific exam
export const getSubjectsForExam = async (examCode: string): Promise<SubjectData[]> => {
  const response = await fetch(`/api/subjects?exam=${encodeURIComponent(examCode)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch subjects');
  }
  const data = await response.json();
  return data.subjects;
};

// Get topics for a specific subject
export const getTopicsForSubject = async (subjectId: string): Promise<TopicData[]> => {
  const response = await fetch(`/api/topics?subject=${encodeURIComponent(subjectId)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch topics');
  }
  const data = await response.json();
  return data.topics;
};

// Get subtopics for a specific topic
export const getSubtopicsForTopic = async (topicId: string): Promise<SubtopicData[]> => {
  const response = await fetch(`/api/subtopics?topic=${encodeURIComponent(topicId)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch subtopics');
  }
  const data = await response.json();
  return data.subtopics;
};

// Get concepts for a specific subtopic
export const getConceptsForSubtopic = async (subtopicId: string): Promise<ConceptData[]> => {
  const response = await fetch(`/api/concepts?subtopic=${encodeURIComponent(subtopicId)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch concepts');
  }
  const data = await response.json();
  return data.concepts;
};

// Get topic content (for backward compatibility with existing code)
export const getTopicContent = async (examCode: string, subjectName: string, topicName: string): Promise<TopicContent | null> => {
  const response = await fetch(`/api/topic-content?exam=${encodeURIComponent(examCode)}&subject=${encodeURIComponent(subjectName)}&topic=${encodeURIComponent(topicName)}`);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data.content;
};

// Get full content library (for backward compatibility)
export const getContentLibrary = async (): Promise<ContentLibrary> => {
  const response = await fetch('/api/content-library');
  if (!response.ok) {
    throw new Error('Failed to fetch content library');
  }
  const data = await response.json();
  return data.contentLibrary;
};

// Get exam configuration for UI
export const getExamConfig = async (examCode: string) => {
  const response = await fetch(`/api/exam-config?exam=${encodeURIComponent(examCode)}`);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data.config;
}; 