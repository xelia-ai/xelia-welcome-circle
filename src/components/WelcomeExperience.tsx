
import React, { useRef, useState, useEffect } from 'react';
import TypingText from './welcome/TypingText';
import StartButton from './welcome/StartButton';
import WelcomeCircle from './WelcomeCircle';

// The welcome text that will be typed out
const welcomeScript = `Hola, soy Xelia, tu asistente virtual de inteligencia artificial. Estoy aquí para ayudarte a automatizar la atención y ventas de tu empresa con tecnología avanzada y personalizada.`;

interface WelcomeExperienceProps {
  onSkip?: () => void;
}

const WelcomeExperience: React.FC<WelcomeExperienceProps> = ({ onSkip }) => {
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

  // Handle skip intro
  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-xelia-dark to-xelia-dark/95 flex flex-col">
      {/* Audio element */}
      <audio 
        ref={audioRef}
        src="/lovable-uploads/mensaje-oficial-xelia.mp3" 
        preload="auto"
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Text container - only visible after permission */}
        {audioPermission && (
          <>
            <WelcomeCircle className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <TypingText 
              audioElement={audioRef.current}
              audioPermission={audioPermission}
              welcomeScript={welcomeScript}
            />
          </>
        )}

        {/* Start button (only shown before permission is granted) */}
        {!audioPermission && (
          <StartButton onClick={startExperience} />
        )}
      </div>
      
      {/* Skip button */}
      <button 
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-white/60 hover:text-white font-light text-sm transition-all duration-300 z-50"
      >
        Saltar intro
      </button>
    </div>
  );
};

export default WelcomeExperience;
