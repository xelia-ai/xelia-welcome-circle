
import { useState } from 'react';
import { ConfigStep } from '@/utils/configStepInfo';

export interface ConfigState {
  agentType: string;
  industries: string[];
  industryNames: string[];
  website: string;
  websiteValidated: boolean;
  capabilities: string[];
  integrations: string[];
}

export const useConfigureState = () => {
  const [currentStep, setCurrentStep] = useState<ConfigStep>('agent-type');
  const [config, setConfig] = useState<ConfigState>({
    agentType: '',
    industries: [],
    industryNames: [],
    website: '',
    websiteValidated: false,
    capabilities: [],
    integrations: []
  });
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const updateConfig = (key: keyof ConfigState, value: any) => {
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

  const canProceed = () => {
    switch (currentStep) {
      case 'agent-type':
        return !!config.agentType;
      case 'industry':
        return config.industries.length > 0;
      case 'website':
        // Aseguramos que el sitio web haya sido validado o que estén usando documentos
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

  return {
    currentStep,
    setCurrentStep,
    config,
    direction,
    updateConfig,
    goToNextStep,
    goToPreviousStep,
    canProceed
  };
};
