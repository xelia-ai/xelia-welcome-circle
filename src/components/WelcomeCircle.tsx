
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface WelcomeCircleProps {
  className?: string;
}

const WelcomeCircle: React.FC<WelcomeCircleProps> = ({ className }) => {
  return (
    <motion.div 
      className={cn('relative h-[280px] w-[280px] flex items-center justify-center', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Outer glow effect */}
      <motion.div 
        className="absolute w-[260px] h-[260px] rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(20px)'
        }}
      />
      
      {/* Simple container for avatar */}
      <motion.div
        className="z-10 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <img 
          src="/lovable-uploads/9f5bc4b9-a87a-4af7-88b1-e1249e0a7301.png" 
          alt="Xelia Avatar" 
          className="w-[100px] h-[100px] object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

export default WelcomeCircle;
