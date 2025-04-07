
import React, { useRef, useState, useEffect } from 'react';
import ParticleVisualization from './welcome/ParticleVisualization';
import TypingText from './welcome/TypingText';
import StartButton from './welcome/StartButton';

// The welcome text that will be typed out
const welcomeScript = `Hola, soy Xelia, tu asistente virtual de inteligencia artificial. Estoy aquí para ayudarte a automatizar la atención y ventas de tu empresa con tecnología avanzada y personalizada.`;

const WelcomeExperience: React.FC = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Try to preload audio
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.addEventListener('canplaythrough', () => {
        setAudioLoaded(true);
      });
      
      // Handle audio load error
      audio.addEventListener('error', (e) => {
        console.error('Audio file could not be loaded', e);
        // We still allow the experience to continue even if audio fails
        setAudioLoaded(true);
      });
      
      return () => {
        audio.removeEventListener('canplaythrough', () => setAudioLoaded(true));
        audio.removeEventListener('error', () => {});
      };
    }
  }, []);

  // Start experience on user interaction (to comply with browser autoplay policies)
  const startExperience = () => {
    setAudioPermission(true);
    // Start audio playback
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
        // Continue with visual experience even if audio fails
      });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Audio element */}
      <audio 
        ref={audioRef}
        src="/lovable-uploads/mensaje-oficial-xelia.mp3" 
        preload="auto"
      />

      {/* Only show particles after user clicks the start button */}
      {audioPermission && (
        <ParticleVisualization 
          audioPermission={audioPermission} 
          audioElement={audioRef.current}
        />
      )}

      {/* Text container - only visible after permission */}
      {audioPermission && (
        <TypingText 
          audioElement={audioRef.current}
          audioPermission={audioPermission}
          welcomeScript={welcomeScript}
        />
      )}

      {/* Start button (only shown before permission is granted) */}
      {!audioPermission && (
        <StartButton onClick={startExperience} />
      )}
    </div>
  );
};

export default WelcomeExperience;
