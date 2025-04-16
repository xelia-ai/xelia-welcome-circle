
import React from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CompetitiveProgressBarProps {
  progressValue: number;
  controls: any;
}

const CompetitiveProgressBar: React.FC<CompetitiveProgressBarProps> = ({ 
  progressValue, 
  controls 
}) => {
  return (
    <div className="h-2.5 w-full bg-gray-700/80 rounded-full overflow-hidden shadow-inner">
      <motion.div 
        className="h-full bg-gradient-to-r from-xelia-accent to-xelia-accent-light"
        initial={{ width: 0 }}
        animate={controls}
        style={{ 
          boxShadow: '0 0 8px rgba(92, 106, 255, 0.5)',
          borderRadius: 'inherit'
        }}
      />
    </div>
  );
};

export default CompetitiveProgressBar;
