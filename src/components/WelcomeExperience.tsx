
import React, { useRef, useState } from 'react';
import ParticleVisualization from './welcome/ParticleVisualization';
import TypingText from './welcome/TypingText';
import StartButton from './welcome/StartButton';

// The welcome text that will be typed out
const welcomeScript = `Hola, soy Xelia, tu asistente virtual de inteligencia artificial. Estoy aquí para ayudarte a automatizar la atención y ventas de tu empresa con tecnología avanzada y personalizada.`;

const WelcomeExperience: React.FC = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Start experience on user interaction (to comply with browser autoplay policies)
  const startExperience = () => {
    setAudioPermission(true);
    // Start audio playback
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Audio element */}
      <audio 
        ref={audioRef}
        src="/lovable-uploads/mensaje-oficial-xelia.mp3" 
        preload="auto"
      />

      {/* Three.js canvas for particles */}
      <ParticleVisualization 
        audioPermission={audioPermission} 
        audioElement={audioRef.current}
      />

      {/* Text container */}
      <TypingText 
        audioElement={audioRef.current}
        audioPermission={audioPermission}
        welcomeScript={welcomeScript}
      />

      {/* Start button (only shown before permission is granted) */}
      {!audioPermission && (
        <StartButton onClick={startExperience} />
      )}
    </div>
  );
};

export default WelcomeExperience;
