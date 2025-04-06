
import React from 'react';
import { motion } from 'framer-motion';
import { Tip } from '../types';

interface TipContentProps {
  tip: Tip;
}

const TipContent: React.FC<TipContentProps> = ({ tip }) => {
  return (
    <motion.div
      key={tip.id}
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -3 }}
      transition={{ duration: 0.15 }}
      className="text-gray-300 leading-relaxed text-sm md:text-base p-4"
    >
      {tip.text}
    </motion.div>
  );
};

export default TipContent;
