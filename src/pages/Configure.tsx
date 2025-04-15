
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConfigurationProgress from '@/components/configuration/ConfigurationProgress';
import StepHeader from '@/components/configuration/StepHeader';
import ConfigurationNavigation from '@/components/configuration/ConfigurationNavigation';
import AnimatedStepContent from '@/components/configuration/AnimatedStepContent';
import StepContent from '@/components/configuration/StepContent';
import { stepInfo } from '@/utils/configStepInfo';
import { useConfigureState } from '@/hooks/useConfigureState';
import { useIsMobile } from '@/hooks/use-mobile';

const Configure = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { 
    currentStep, 
    config, 
    direction, 
    updateConfig, 
    goToNextStep, 
    goToPreviousStep, 
    canProceed 
  } = useConfigureState();

  const handleNextStep = () => {
    if (currentStep === 'summary') {
      navigate('/demo');
    } else {
      goToNextStep();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'agent-type') {
      // Navigate back to homepage if on first step
      navigate('/');
    } else {
      goToPreviousStep();
    }
  };

  // Empty function for backward compatibility
  const handleEditInSummary = (step: any) => {
    // Esta función se usará en el futuro para editar secciones en la vista resumen
  };

  const totalSteps = 6;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-xelia-dark via-xelia-dark to-xelia-light py-4 md:py-8 px-3 md:px-4 sm:px-6">
      <div className="max-w-5xl w-full mx-auto flex flex-col flex-grow">
        <StepHeader 
          stepInfo={stepInfo[currentStep]} 
          currentStep={currentStep} 
        />
        
        <ConfigurationProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />

        <div className="frosted-glass rounded-xl p-3 md:p-6 flex-grow mb-6">
          <div className="h-full overflow-y-auto pb-16 md:pb-0">
            <AnimatedStepContent currentStep={currentStep} direction={direction}>
              <StepContent
                currentStep={currentStep}
                config={config}
                updateConfig={updateConfig}
                onEdit={handleEditInSummary}
              />
            </AnimatedStepContent>
          </div>
        </div>

        <ConfigurationNavigation 
          currentStep={currentStep}
          totalSteps={totalSteps}
          canProceed={canProceed()}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      </div>
    </div>
  );
};

export default Configure;
