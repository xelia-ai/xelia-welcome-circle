
import React from 'react';
import { motion } from 'framer-motion';
import { Tip } from '../types';

interface TipContentProps {
  currentTip: Tip;
}

const TipContent: React.FC<TipContentProps> = ({ currentTip }) => {
  return (
    <motion.div
      key={currentTip.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="text-gray-300 leading-relaxed"
    >
      {currentTip.text}
    </motion.div>
  );
};

export default TipContent;
