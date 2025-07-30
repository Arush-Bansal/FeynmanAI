import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStoredExamCategory(): string | null {
  if (typeof window === 'undefined') return null;
  const storedExam = localStorage.getItem('selectedExamCategory');
  return storedExam || null;
}

export function clearUserData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('selectedExamCategory');
  // Add any other user data that needs to be cleared
}
