
import React from 'react';
import { cn } from '@/lib/utils';

interface WelcomeCircleProps {
  className?: string;
}

const WelcomeCircle: React.FC<WelcomeCircleProps> = ({ className }) => {
  return (
    <div className={cn('circle-container', className)}>
      <div className="circle-backdrop animate-pulse"></div>
      <div className="xelia-circle animate-circle-breathe circle-glow"></div>
    </div>
  );
};

export default WelcomeCircle;
