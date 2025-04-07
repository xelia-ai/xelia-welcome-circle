
import React, { useEffect, useState } from 'react';

interface TypingTextProps {
  audioElement: HTMLAudioElement | null;
  audioPermission: boolean;
  welcomeScript: string;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  audioElement,
  audioPermission,
  welcomeScript
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!audioElement || !audioPermission) return;
    
    // Set up the typing animation based on audio time
    const handleTimeUpdate = () => {
      if (!audioElement) return;
      
      const progress = audioElement.currentTime / audioElement.duration;
      const textLength = Math.floor(welcomeScript.length * progress);
      
      if (textLength <= welcomeScript.length) {
        setDisplayedText(welcomeScript.substring(0, textLength));
      } else {
        setAnimationComplete(true);
      }
    };
    
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioPermission, audioElement, welcomeScript]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full max-w-2xl px-6">
      <div className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
        {displayedText}
        <span className={`inline-block w-2 h-5 bg-white ml-1 ${animationComplete ? 'opacity-0' : 'animate-pulse'}`}></span>
      </div>
    </div>
  );
};

export default TypingText;
