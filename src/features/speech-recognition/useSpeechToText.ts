// This custom hook wraps useSpeechRecognition and adds keyboard event handling for the spacebar.
// It allows users to start/stop speech recognition by holding/releasing the spacebar, in addition to the usual API.
// It also exposes startListening and stopListening functions for use in UI components.
import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export function useSpeechToText() {
  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !listening) {
        SpeechRecognition.startListening({ continuous: true, interimResults: true });
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && listening) {
        SpeechRecognition.stopListening();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [listening]);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, interimResults: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
    startListening,
    stopListening,
  };
} 