
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IndustrySelection from '@/components/configuration/IndustrySelection';
import WebsiteInput from '@/components/configuration/WebsiteInput';
import CapabilitiesSelection from '@/components/configuration/CapabilitiesSelection';
import IntegrationsSelection from '@/components/configuration/IntegrationsSelection';
import Summary from '@/components/configuration/Summary';
import AgentTypeSelection from '@/components/configuration/AgentTypeSelection';
import AgentPreview from '@/components/configuration/AgentPreview';
import ConfigurationProgress from '@/components/configuration/ConfigurationProgress';
import StepHeader from '@/components/configuration/StepHeader';
import ConfigurationNavigation from '@/components/configuration/ConfigurationNavigation';
import { ConfigStep, stepInfo } from '@/utils/configStepInfo';
import { motion, AnimatePresence } from 'framer-motion';

const Configure = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<ConfigStep>('agent-type');
  const [config, setConfig] = useState({
    agentType: '',
    industries: [] as string[],
    industryNames: [] as string[],
    website: '',
    capabilities: [] as string[],
    integrations: [] as string[]
  });
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const updateConfig = (key: keyof typeof config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const goToNextStep = () => {
    setDirection('forward');
    switch (currentStep) {
      case 'agent-type':
        setCurrentStep('industry');
        break;
      case 'industry':
        setCurrentStep('website');
        break;
      case 'website':
        setCurrentStep('capabilities');
        break;
      case 'capabilities':
        setCurrentStep('integrations');
        break;
      case 'integrations':
        setCurrentStep('summary');
        break;
      case 'summary':
        navigate('/demo');
        break;
    }
  };

  const goToPreviousStep = () => {
    setDirection('backward');
    switch (currentStep) {
      case 'industry':
        setCurrentStep('agent-type');
        break;
      case 'website':
        setCurrentStep('industry');
        break;
      case 'capabilities':
        setCurrentStep('website');
        break;
      case 'integrations':
        setCurrentStep('capabilities');
        break;
      case 'summary':
        setCurrentStep('integrations');
        break;
    }
  };

  const handleEditInSummary = (step: ConfigStep) => {
    // No cambiamos de paso, solo actualizamos la configuración
    // La edición ahora ocurre in-situ en el componente Summary
    // Pero mantenemos esta función por compatibilidad con la interfaz
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'agent-type':
        return !!config.agentType;
      case 'industry':
        return config.industries.length > 0;
      case 'website':
        return !!config.website;
      case 'capabilities':
        return config.capabilities.length > 0;
      case 'integrations':
        return true;
      case 'summary':
        return true;
      default:
        return false;
    }
  };

  // Animation variants
  const pageVariants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    }),
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -50 : 50,
      opacity: 0
    })
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3
  };

  const renderStepContent = () => {
    return (
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="h-full"
        >
          {(() => {
            switch (currentStep) {
              case 'agent-type':
                return (
                  <div className="md:col-span-2">
                    <AgentTypeSelection 
                      selectedType={config.agentType} 
                      onSelect={(type) => updateConfig('agentType', type)} 
                    />
                  </div>
                );
              case 'industry':
                return (
                  <div>
                    <IndustrySelection 
                      selectedIndustries={config.industries} 
                      onSelect={(industries, industryNames) => {
                        updateConfig('industries', industries);
                        updateConfig('industryNames', industryNames);
                      }}
                    />
                  </div>
                );
              case 'website':
                return <WebsiteInput 
                  website={config.website} 
                  onChange={(value) => updateConfig('website', value)} 
                />;
              case 'capabilities':
                return <CapabilitiesSelection 
                  selectedCapabilities={config.capabilities} 
                  onChange={(capabilities) => updateConfig('capabilities', capabilities)} 
                />;
              case 'integrations':
                return <IntegrationsSelection 
                  selectedIntegrations={config.integrations} 
                  onChange={(integrations) => updateConfig('integrations', integrations)} 
                />;
              case 'summary':
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <Summary 
                        config={{
                          ...config,
                          // For backward compatibility with existing Summary component
                          industry: config.industries[0] || '',
                          industryName: config.industryNames[0] || ''
                        }}
                        onEdit={handleEditInSummary} 
                      />
                    </div>
                    <div className="h-full">
                      <AgentPreview 
                        agentType={config.agentType}
                        industry={config.industries[0] || ''}
                        capabilities={config.capabilities}
                      />
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  const totalSteps = 6;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-xelia-dark via-xelia-dark to-xelia-light py-8 px-4 sm:px-6">
      <div className="max-w-5xl w-full mx-auto flex flex-col flex-grow">
        <StepHeader stepInfo={stepInfo[currentStep]} />
        
        <ConfigurationProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />

        <div className="frosted-glass rounded-xl p-6 flex-grow mb-6">
          <div className="h-full">
            {renderStepContent()}
          </div>
        </div>

        <ConfigurationNavigation 
          currentStep={currentStep}
          totalSteps={totalSteps}
          canProceed={canProceed()}
          onNext={goToNextStep}
          onPrevious={goToPreviousStep}
        />
      </div>
    </div>
  );
};

export default Configure;
