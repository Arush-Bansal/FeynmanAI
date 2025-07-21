import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { EXAM_CATEGORIES } from "@/features/content-library";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSelectedExam(): string | null {
  if (typeof window === 'undefined') return null;
  const storedExam = localStorage.getItem('selectedExamCategory');
  return storedExam && EXAM_CATEGORIES.includes(storedExam as typeof EXAM_CATEGORIES[number]) ? storedExam : null;
}
