"use client"
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export const useSpeechRecognition = () => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }

        setTranscript(prev => prev + finalTranscript + interimTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Speech recognition error. Please try again.');
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startRecording = () => {
    if (!recognition) {
      toast.error('Speech recognition not supported in this browser');
      return;
    }
    
    setIsRecording(true);
    setTranscript('');
    recognition.start();
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    resetTranscript
  };
}; 