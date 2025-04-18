
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isMobile = useIsMobile();
  const { 
    currentStep, 
    config, 
    direction, 
    updateConfig, 
    goToNextStep, 
    goToPreviousStep, 
    canProceed,
    setCurrentStep
  } = useConfigureState();

  // Check for URL parameters that would indicate we should jump to a specific step
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stepParam = params.get('step');
    
    if (stepParam && ['agent-type', 'industry', 'website', 'capabilities', 'summary'].includes(stepParam)) {
      setCurrentStep(stepParam as any);
    }
  }, [location.search, setCurrentStep]);

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

  // Function for editing in summary view
  const handleEditInSummary = (step: any) => {
    // Navigate to the specific step for editing
    if (['industry', 'website', 'capabilities'].includes(step)) {
      navigate(`/configure?step=${step}`);
      setCurrentStep(step);
    }
  };

  // Updated total steps from 6 to 5 since we merged capabilities and integrations
  const totalSteps = 5;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-xelia-dark via-xelia-dark to-xelia-light p-4 md:py-8 md:px-6">
      <div className="max-w-7xl w-full mx-auto flex flex-col flex-grow">
        <StepHeader 
          stepInfo={stepInfo[currentStep]} 
          currentStep={currentStep} 
        />
        
        <ConfigurationProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />

        <div className="frosted-glass rounded-xl p-4 md:p-6 flex-grow mb-6 overflow-hidden">
          <div className="h-full overflow-y-auto pb-20 md:pb-4 pr-1 -mr-1">
            <div className="min-w-[320px] max-w-full mx-auto">
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
