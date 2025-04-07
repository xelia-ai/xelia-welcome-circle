
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface WelcomeCircleProps {
  className?: string;
}

const WelcomeCircle: React.FC<WelcomeCircleProps> = ({ className }) => {
  return (
    <div className={cn('relative h-[280px] w-[280px] flex items-center justify-center', className)}>
      {/* Simple luminous circle with avatar */}
      <motion.div 
        className="absolute inset-0 w-full h-full rounded-full opacity-30"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        style={{
          boxShadow: '0 0 60px 30px rgba(255, 255, 255, 0.15)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)'
        }}
      />
      
      {/* Avatar image */}
      <motion.div 
        className="relative z-10"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
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
    </div>
  );
};

export default WelcomeCircle;
