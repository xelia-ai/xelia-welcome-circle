
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
  // Animation variants
  const pageVariants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -50 : 50,
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
