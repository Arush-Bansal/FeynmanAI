import dbConnect from '../dbConnect';
import {
  getAllExams,
  getSubjectsByExam,
  getTopicsBySubject,
  getSubtopicsByTopic,
  getConceptsBySubtopic,
  getExamByCode
} from '../data';

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

// Get all exams for the exam selection page
export const getExamsForSelection = async (): Promise<ExamData[]> => {
  await dbConnect();
  const exams = await getAllExams();
  return exams.map(exam => ({
    _id: exam._id.toString(),
    name: exam.name,
    code: exam.code,
    description: exam.description,
    icon: exam.icon,
    gradient: exam.gradient
  }));
};

// Get exam categories (for backward compatibility)
export const getExamCategories = async (): Promise<string[]> => {
  const exams = await getExamsForSelection();
  return exams.map(exam => exam.code);
};

// Get subjects for a specific exam
export const getSubjectsForExam = async (examCode: string): Promise<SubjectData[]> => {
  await dbConnect();
  const exam = await getExamByCode(examCode);
  if (!exam) {
    throw new Error(`Exam with code ${examCode} not found`);
  }
  
  const subjects = await getSubjectsByExam(exam._id.toString());
  return subjects.map(subject => ({
    _id: subject._id.toString(),
    name: subject.name,
    code: subject.code,
    description: subject.description,
    exam: subject.exam.toString()
  }));
};

// Get topics for a specific subject
export const getTopicsForSubject = async (subjectId: string): Promise<TopicData[]> => {
  await dbConnect();
  const topics = await getTopicsBySubject(subjectId);
  return topics.map(topic => ({
    _id: topic._id.toString(),
    name: topic.name,
    code: topic.code,
    description: topic.description,
    subject: topic.subject.toString()
  }));
};

// Get subtopics for a specific topic
export const getSubtopicsForTopic = async (topicId: string): Promise<SubtopicData[]> => {
  await dbConnect();
  const subtopics = await getSubtopicsByTopic(topicId);
  return subtopics.map(subtopic => ({
    _id: subtopic._id.toString(),
    name: subtopic.name,
    code: subtopic.code,
    description: subtopic.description,
    topic: subtopic.topic.toString(),
    parentSubtopic: subtopic.parentSubtopic?.toString()
  }));
};

// Get concepts for a specific subtopic
export const getConceptsForSubtopic = async (subtopicId: string): Promise<ConceptData[]> => {
  await dbConnect();
  const concepts = await getConceptsBySubtopic(subtopicId);
  return concepts.map(concept => ({
    _id: concept._id.toString(),
    name: concept.name,
    code: concept.code,
    description: concept.description,
    subtopic: concept.subtopic.toString(),
    keyPoints: concept.keyPoints,
    concepts: concept.concepts,
    difficulty: concept.difficulty,
    estimatedTime: concept.estimatedTime
  }));
};

// Get topic content (for backward compatibility with existing code)
export const getTopicContent = async (examCode: string, subjectName: string, topicName: string): Promise<TopicContent | null> => {
  await dbConnect();
  
  // Get exam
  const exam = await getExamByCode(examCode);
  if (!exam) return null;
  
  // Get subject
  const subjects = await getSubjectsByExam(exam._id.toString());
  const subject = subjects.find(s => s.name === subjectName);
  if (!subject) return null;
  
  // Get topic
  const topics = await getTopicsBySubject(subject._id.toString());
  const topic = topics.find(t => t.name === topicName);
  if (!topic) return null;
  
  // Get subtopics
  const subtopics = await getSubtopicsByTopic(topic._id.toString());
  if (subtopics.length === 0) return null;
  
  // Get concepts from first subtopic (for now, we'll use the first subtopic)
  const concepts = await getConceptsBySubtopic(subtopics[0]._id.toString());
  if (concepts.length === 0) return null;
  
  // Combine all key points from all concepts
  const allKeyPoints = concepts.flatMap(concept => concept.keyPoints);
  const allConcepts = concepts.map(concept => concept.concepts).join(' ');
  
  return {
    keyPoints: allKeyPoints,
    concepts: allConcepts
  };
}; 