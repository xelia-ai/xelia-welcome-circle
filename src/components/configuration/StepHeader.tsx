
import React from 'react';
import { Bot, Building2, Globe, Zap, Link, Settings } from 'lucide-react';

interface StepInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepHeaderProps {
  stepInfo: StepInfo;
  currentStep?: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ stepInfo, currentStep }) => {
  // Custom title for agent-type step
  const displayTitle = currentStep === 'agent-type' 
    ? "Configura a Xelia según tus objetivos" 
    : stepInfo.title;
    
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-xelia-accent/10 flex items-center justify-center mr-3 text-xelia-accent">
          {stepInfo.icon}
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-xelia-gray-dark">{displayTitle}</h1>
          <p className="text-xelia-gray-medium text-sm">{stepInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepHeader;
