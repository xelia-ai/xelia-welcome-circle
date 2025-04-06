
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
  const steps = [
    { key: 'agent-type', label: 'Crear Agente' },
    { key: 'industry', label: 'Industria' },
    { key: 'website', label: 'Entrenar' },
    { key: 'capabilities', label: 'Capacidades' },
    { key: 'integrations', label: 'Integraciones' }, 
    { key: 'summary', label: 'Demo' }
  ];
  const currentStepNumber = getStepNumber();

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStepNumber;
          const isActive = stepNumber === currentStepNumber;
          const isPending = stepNumber > currentStepNumber;
          
          return (
            <div 
              key={step.key} 
              className="flex flex-col items-center relative"
            >
              <div className="relative">
                {isActive ? (
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 bg-white text-xelia-accent border border-xelia-accent`}
                    animate={{ boxShadow: ['0 0 0px rgba(92,106,255,0)', '0 0 10px rgba(92,106,255,0.5)', '0 0 0px rgba(92,106,255,0)'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-sm font-medium">{stepNumber}</span>
                  </motion.div>
                ) : (
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                      isCompleted ? 'bg-xelia-accent text-white' : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{stepNumber}</span>
                    )}
                  </div>
                )}
                
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-10 w-full h-[2px] bg-gray-700 -z-10">
                    <div 
                      className="h-full bg-xelia-accent transition-all duration-500" 
                      style={{ 
                        width: isCompleted ? '100%' : isActive ? '50%' : '0%'
                      }}
                    ></div>
                  </div>
                )}
              </div>
              
              <span 
                className={`text-sm font-medium mt-2 ${
                  isCompleted ? 'text-xelia-accent' : 
                  isActive ? 'text-white' : 
                  'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="relative w-full bg-gray-700 h-1.5 rounded-full overflow-hidden mt-4 hidden">
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
