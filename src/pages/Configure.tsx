
import React, { useState } from 'react';
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

const Configure = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<ConfigStep>('agent-type');
  const [config, setConfig] = useState({
    agentType: '',
    industry: '',
    industryName: '',
    website: '',
    capabilities: [] as string[],
    integrations: [] as string[]
  });

  const updateConfig = (key: keyof typeof config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const goToNextStep = () => {
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

  const canProceed = () => {
    switch (currentStep) {
      case 'agent-type':
        return !!config.agentType;
      case 'industry':
        return !!config.industry;
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

  const renderStepContent = () => {
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
              selectedIndustry={config.industry} 
              onSelect={(id, name) => {
                updateConfig('industry', id);
                updateConfig('industryName', name);
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
                config={config} 
                onEdit={(step: ConfigStep) => setCurrentStep(step)} 
              />
            </div>
            <div className="h-full">
              <AgentPreview 
                agentType={config.agentType}
                industry={config.industry}
                capabilities={config.capabilities}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
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
