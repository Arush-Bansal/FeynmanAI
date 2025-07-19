import React from "react";

type MicButtonProps = {
  listening: boolean;
  startListening: () => void;
  stopListening: () => void;
};

export const MicButton: React.FC<MicButtonProps> = ({ listening, startListening, stopListening }) => (
  <button
    onMouseDown={startListening}
    onMouseUp={stopListening}
    onMouseLeave={stopListening}
    onTouchStart={startListening}
    onTouchEnd={stopListening}
    aria-label="Hold to talk"
    style={{ fontSize: '2rem', padding: '1rem', borderRadius: '50%', border: '1px solid #ccc', background: listening ? '#e0f7fa' : '#fff' }}
  >
    🎤
  </button>
); 