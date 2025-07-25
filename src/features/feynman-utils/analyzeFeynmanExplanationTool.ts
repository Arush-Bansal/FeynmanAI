import { Tool } from '@google/generative-ai';

export const analyzeFeynmanExplanationTool = {
  functionDeclarations: [{
    name: "analyzeFeynmanExplanation",
    description: "Analyzes a student's explanation of a topic using the Feynman Technique and provides structured feedback.",
    parameters: {
      type: "object",
      properties: {
        exam: {
          type: "string",
          description: "The exam context for the topic (e.g., 'JEE', 'NEET', 'UPSC')."
        },
        subject: {
          type: "string",
          description: "The subject of the topic (e.g., 'Physics', 'Chemistry', 'Biology')."
        },
        topic: {
          type: "string",
          description: "The main topic the student is explaining."
        },
        keyPoints: {
          type: "array",
          items: {
            type: "string"
          },
          description: "A list of key points the user was required to cover."
        },
        userTranscript: {
          type: "string",
          description: "The full transcript of the user's explanation."
        },
        coveredTopics: {
          type: "array",
          items: {
            type: "object",
            properties: {
              topicName: {
                type: "string",
                description: "Name of the sub-topic or key concept."
              },
              covered: {
                type: "boolean",
                description: "True if the topic was covered, false otherwise."
              }
            },
            required: ["topicName", "covered"]
          },
          description: "A list of sub-topics or key concepts and whether they were covered by the user."
        },
        detailedAnalysis: {
          type: "string",
          description: "A detailed analysis of the user's explanation, including strengths, areas for improvement, and specific feedback."
        },
        sideQuestions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description: "A side question asked by the user."
              },
              answer: {
                type: "string",
                description: "The answer to the side question."
              }
            },
            required: ["question", "answer"]
          },
          description: "A list of any side questions asked by the user in the transcript and their answers."
        },
        similarTopics: {
          type: "array",
          items: {
            type: "string"
          },
          description: "A list of topics similar to this one that the user can practice."
        },
        overallScore: {
          type: "number",
          description: "An overall score (0-100) for the user's performance based on their explanation."
        }
      },
      required: ["exam", "subject", "topic", "keyPoints", "userTranscript", "coveredTopics", "detailedAnalysis", "sideQuestions", "similarTopics", "overallScore"]
    }
  }]
} as Tool;