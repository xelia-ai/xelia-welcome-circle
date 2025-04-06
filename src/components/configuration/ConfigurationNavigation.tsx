
import React from 'react';
import { ArrowLeft, ArrowRight, Check, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  const getStepNumber = () => {
    const steps: ConfigStep[] = ['agent-type', 'industry', 'website', 'capabilities', 'integrations', 'summary'];
    return steps.indexOf(currentStep) + 1;
  };

  const isFirstStep = currentStep === 'agent-type';

  return (
    <div className={`flex justify-between items-center w-full ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50 bg-xelia-dark/95 border-t border-gray-700 p-3 backdrop-blur-md' : ''}`}>
      <Button 
        variant="outline" 
        onClick={onPrevious}
        disabled={false} // Always enabled, even on first step
        className="flex items-center gap-1 md:gap-2 bg-[#444] border-[#444] text-white hover:bg-[#555] hover:text-white transition-all duration-200 h-10 md:h-auto px-3 md:px-4 text-sm md:text-base"
      >
        {isFirstStep ? <Home size={isMobile ? 14 : 16} /> : <ArrowLeft size={isMobile ? 14 : 16} />}
        {isFirstStep ? 'Inicio' : (isMobile ? 'Atrás' : 'Anterior')}
      </Button>
      
      <div className="text-center text-xs md:text-sm text-gray-400 hidden md:block">
        Paso {getStepNumber()} de {totalSteps}
      </div>
      
      <motion.div
        whileHover={canProceed ? { scale: 1.03 } : {}}
        whileTap={canProceed ? { scale: 0.97 } : {}}
      >
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-1 md:gap-2 transition-all duration-300 h-10 md:h-auto px-3 md:px-4 text-sm md:text-base ${
            canProceed 
              ? 'bg-xelia-accent hover:bg-xelia-accent-dark shadow-accent transform hover:-translate-y-0.5' 
              : 'bg-xelia-accent/50 cursor-not-allowed'
          }`}
        >
          {currentStep === 'summary' ? 'Finalizar' : 'Siguiente'}
          {currentStep === 'summary' ? <Check size={isMobile ? 14 : 16} /> : <ArrowRight size={isMobile ? 14 : 16} />}
        </Button>
      </motion.div>
    </div>
  );
};

export default ConfigurationNavigation;
