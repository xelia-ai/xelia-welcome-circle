
import React from 'react';
import { motion } from 'framer-motion';

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <button
        onClick={onClick}
        className="cta-button text-white font-medium px-8 py-6 rounded-xl text-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
      >
        Comenzar Experiencia
      </button>
    </motion.div>
  );
};

export default StartButton;
