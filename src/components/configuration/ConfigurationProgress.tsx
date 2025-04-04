
import React from 'react';

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

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {['Tipo', 'Industria', 'Web', 'Capacidades', 'Integraciones', 'Resumen'].map((label, index) => (
          <div 
            key={label} 
            className={`text-xs font-medium ${getStepNumber() > index + 1 ? 'text-xelia-accent' : 
              getStepNumber() === index + 1 ? 'text-white' : 'text-gray-500'}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="w-full bg-xelia-light h-2 rounded-full overflow-hidden">
        <div 
          className="bg-xelia-accent h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConfigurationProgress;
