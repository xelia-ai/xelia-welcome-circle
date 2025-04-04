
import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
      <Button 
        variant="outline" 
        onClick={onPrevious}
        disabled={currentStep === 'agent-type'}
        className="flex items-center gap-2 bg-[#444] border-[#444] text-white hover:bg-[#555] hover:text-white transition-all duration-200"
      >
        <ArrowLeft size={16} />
        Anterior
      </Button>
      
      <div className="text-center text-sm text-gray-400">
        Paso {getStepNumber()} de {totalSteps}
      </div>
      
      <motion.div
        whileHover={canProceed ? { scale: 1.03 } : {}}
        whileTap={canProceed ? { scale: 0.97 } : {}}
      >
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 transition-all duration-300 ${
            canProceed 
              ? 'bg-xelia-accent hover:bg-xelia-accent-dark shadow-accent transform hover:-translate-y-0.5' 
              : 'bg-xelia-accent/50 cursor-not-allowed'
          }`}
        >
          {currentStep === 'summary' ? 'Finalizar' : 'Siguiente'}
          {currentStep === 'summary' ? <Check size={16} /> : <ArrowRight size={16} />}
        </Button>
      </motion.div>
    </div>
  );
};

export default ConfigurationNavigation;
