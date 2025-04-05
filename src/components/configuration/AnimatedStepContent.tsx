
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedStepContentProps {
  currentStep: string;
  direction: 'forward' | 'backward';
  children: React.ReactNode;
}

const AnimatedStepContent: React.FC<AnimatedStepContentProps> = ({
  currentStep,
  direction,
  children
}) => {
  // Animation variants - modified to slide from top/bottom instead of left/right
  const pageVariants = {
    enter: (direction: 'forward' | 'backward') => ({
      y: direction === 'forward' ? -30 : 30,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      y: direction === 'forward' ? 30 : -30,
      opacity: 0
    })
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3
  };

  return (
    <AnimatePresence initial={false} mode="wait" custom={direction}>
      <motion.div
        key={currentStep}
        custom={direction}
        variants={pageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={pageTransition}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedStepContent;
