
import React from 'react';
import { motion } from 'framer-motion';
import { Tip } from '../types';
import { Zap, TrendingUp, Lightbulb } from 'lucide-react';

interface TipIconProps {
  currentTip: Tip;
}

const TipIcon: React.FC<TipIconProps> = ({ currentTip }) => {
  // Map icon name to the actual icon component
  const renderIcon = () => {
    switch (currentTip.iconName) {
      case 'Zap':
        return <Zap className="h-8 w-8 text-xelia-accent" />;
      case 'TrendingUp':
        return <TrendingUp className="h-8 w-8 text-xelia-accent" />;
      default:
        return <Lightbulb className="h-8 w-8 text-xelia-accent" />;
    }
  };

  return (
    <motion.div
      key={currentTip.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {renderIcon()}
    </motion.div>
  );
};

export default TipIcon;
