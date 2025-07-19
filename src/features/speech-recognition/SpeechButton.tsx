"use client";

import { MicButton } from "./MicButton";
import { useSpeechToText } from "./useSpeechToText";

export function SpeechToText() {
  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
    startListening,
    stopListening,
  } = useSpeechToText();

  return (
    <div>
      <div style={{ marginBottom: '0.5rem', color: isMicrophoneAvailable ? 'green' : 'red' }}>
        Microphone: {isMicrophoneAvailable ? 'Available' : 'Not available'}
      </div>
      <div style={{ marginBottom: '0.5rem', color: browserSupportsSpeechRecognition ? 'green' : 'red' }}>
        Browser supports speech recognition: {browserSupportsSpeechRecognition ? 'Yes' : 'No'}
      </div>
      <div style={{ marginBottom: '0.5rem', color: browserSupportsContinuousListening ? 'green' : 'red' }}>
        Browser supports continuous listening: {browserSupportsContinuousListening ? 'Yes' : 'No'}
      </div>
      <MicButton
        listening={listening}
        startListening={startListening}
        stopListening={stopListening}
      />
      <div style={{ marginTop: '0.5rem', color: '#555' }}>
        Hold the mic button <b>or</b> press and hold <kbd>Spacebar</kbd> to talk
      </div>
      <div>Your words: {transcript}</div>
      <button onClick={resetTranscript} style={{ marginTop: '0.5rem' }}>Reset Transcript</button>
    </div>
  );
}
