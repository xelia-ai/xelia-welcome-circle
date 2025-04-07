
import React from 'react';
import { motion } from 'framer-motion';

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center"
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
