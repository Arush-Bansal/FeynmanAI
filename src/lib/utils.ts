import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TOPIC_CONTENT } from "@/features/content-library";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSelectedExam(): string | null {
  if (typeof window === 'undefined') return null;
  const storedExam = localStorage.getItem('selectedExamCategory');
  const EXAM_CATEGORIES = Object.keys(TOPIC_CONTENT);
  return storedExam && EXAM_CATEGORIES.includes(storedExam) ? storedExam : null;
}
