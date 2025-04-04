
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

type ConfigStep = 'agent-type' | 'industry' | 'website' | 'capabilities' | 'integrations' | 'summary';

interface ConfigurationProgressProps {
  currentStep: ConfigStep;
  totalSteps: number;
}

const ConfigurationProgress: React.FC<ConfigurationProgressProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const getStepNumber = () => {
    const steps: ConfigStep[] = ['agent-type', 'industry', 'website', 'capabilities', 'integrations', 'summary'];
    return steps.indexOf(currentStep) + 1;
  };

  const progress = ((getStepNumber() - 1) / (totalSteps - 1)) * 100;
  const steps = ['Tipo', 'Industria', 'Web', 'Capacidades', 'Integraciones', 'Resumen'];
  const currentStepNumber = getStepNumber();

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStepNumber;
          const isActive = stepNumber === currentStepNumber;
          
          return (
            <div 
              key={label} 
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                    isCompleted ? 'bg-xelia-accent text-white' : 
                    isActive ? 'bg-white text-xelia-accent border border-xelia-accent' : 
                    'bg-gray-700 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{stepNumber}</span>
                  )}
                </div>
                
                {/* Dot indicator for active step */}
                {isActive && (
                  <motion.div 
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-xelia-accent rounded-full"
                    initial={{ scale: 0.5, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  />
                )}
              </div>
              
              <span 
                className={`text-xs font-medium mt-1 ${
                  isCompleted ? 'text-xelia-accent' : 
                  isActive ? 'text-white' : 
                  'text-gray-500'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="relative w-full bg-gray-700 h-1.5 rounded-full overflow-hidden mt-2">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-xelia-accent rounded-full"
          initial={{ width: `${progress}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ConfigurationProgress;
