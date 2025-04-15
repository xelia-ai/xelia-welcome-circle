
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAPABILITIES } from '@/data/industries/common';
import { PriceAnimationState } from './types';

interface PriceAnimationProps {
  animationState: PriceAnimationState;
}

const PriceAnimation: React.FC<PriceAnimationProps> = ({ animationState }) => {
  const { addedCapability, lastAddedName } = animationState;
  
  return (
    <AnimatePresence mode="wait">
      {addedCapability && (
        <motion.div 
          key="added-animation"
          className="flex flex-col items-end mr-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <motion.span className="text-xelia-accent font-medium text-xs whitespace-nowrap">
            + {lastAddedName}
          </motion.span>
          <motion.span className="text-xelia-accent font-medium text-xs">
            +${CAPABILITIES.find(c => c.id === addedCapability)?.price || 0}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PriceAnimation;
