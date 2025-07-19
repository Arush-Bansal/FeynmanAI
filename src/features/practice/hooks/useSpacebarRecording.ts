"use client"
import { useEffect } from 'react';

interface UseSpacebarRecordingProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isEnabled: boolean;
}

export const useSpacebarRecording = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  isEnabled
}: UseSpacebarRecordingProps) => {
  useEffect(() => {
    if (!isEnabled) return;

    let isSpacePressed = false;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isSpacePressed && !isRecording) {
        e.preventDefault();
        isSpacePressed = true;
        onStartRecording();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isSpacePressed && isRecording) {
        e.preventDefault();
        isSpacePressed = false;
        onStopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording, onStartRecording, onStopRecording, isEnabled]);
}; 