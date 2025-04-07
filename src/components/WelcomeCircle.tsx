
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface WelcomeCircleProps {
  className?: string;
}

const WelcomeCircle: React.FC<WelcomeCircleProps> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded after a small delay to allow for animation
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn('relative h-[280px] w-[280px] flex items-center justify-center', className)}>
      {/* Luminous background effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full rounded-full bg-white/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ 
          delay: 0.2,
          duration: 1.2, 
          ease: [0.23, 1, 0.32, 1]
        }}
        style={{
          boxShadow: '0 0 40px 20px rgba(255, 255, 255, 0.25)',
          filter: 'blur(8px)'
        }}
      />

      {/* Avatar container */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 0.6, 
          duration: 1, 
          ease: [0.23, 1, 0.32, 1] 
        }}
      >
        <motion.div 
          className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center overflow-hidden"
          animate={{ 
            boxShadow: isLoaded 
              ? '0 8px 30px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.2)'
              : '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img 
            src="/lovable-uploads/9f5bc4b9-a87a-4af7-88b1-e1249e0a7301.png" 
            alt="Xelia Avatar" 
            className="w-[100px] h-[100px] object-contain"
            style={{ 
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeCircle;
