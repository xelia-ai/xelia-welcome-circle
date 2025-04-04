
import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ConfigStep = 'agent-type' | 'industry' | 'website' | 'capabilities' | 'integrations' | 'summary';

interface ConfigurationNavigationProps {
  currentStep: ConfigStep;
  totalSteps: number;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const ConfigurationNavigation: React.FC<ConfigurationNavigationProps> = ({
  currentStep,
  totalSteps,
  canProceed,
  onNext,
  onPrevious
}) => {
  const getStepNumber = () => {
    const steps: ConfigStep[] = ['agent-type', 'industry', 'website', 'capabilities', 'integrations', 'summary'];
    return steps.indexOf(currentStep) + 1;
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={currentStep === 'agent-type'}
          className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={16} />
          Anterior
        </Button>
      </div>
      
      <div className="text-center text-sm text-gray-400">
        Paso {getStepNumber()} de {totalSteps}
      </div>
      
      <div>
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 ${
            canProceed 
              ? 'bg-xelia-accent hover:bg-xelia-accent-dark shadow-accent' 
              : 'bg-xelia-accent/50 cursor-not-allowed'
          }`}
        >
          {currentStep === 'summary' ? 'Finalizar' : 'Siguiente'}
          {currentStep === 'summary' ? <Check size={16} /> : <ArrowRight size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default ConfigurationNavigation;
