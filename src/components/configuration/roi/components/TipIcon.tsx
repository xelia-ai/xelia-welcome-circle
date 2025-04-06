
import React from 'react';
import { motion } from 'framer-motion';
import { Tip } from '../types';

interface TipIconProps {
  currentTip: Tip;
}

const TipIcon: React.FC<TipIconProps> = ({ currentTip }) => {
  return (
    <motion.div
      key={currentTip.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {currentTip.icon}
    </motion.div>
  );
};

export default TipIcon;
