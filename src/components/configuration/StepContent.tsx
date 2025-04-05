
import React from 'react';
import { ConfigStep } from '@/utils/configStepInfo';
import { AgentTypeStep, IndustryStep, SummaryStep } from './steps';
import WebsiteInput from './WebsiteInput';
import CapabilitiesSelection from './CapabilitiesSelection';
import IntegrationsSelection from './IntegrationsSelection';

interface StepContentProps {
  currentStep: ConfigStep;
  config: {
    agentType: string;
    industries: string[];
    industryNames: string[];
    website: string;
    capabilities: string[];
    integrations: string[];
  };
  updateConfig: (key: string, value: any) => void;
  onEdit: (step: ConfigStep) => void;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  config,
  updateConfig,
  onEdit
}) => {
  switch (currentStep) {
    case 'agent-type':
      return (
        <AgentTypeStep
          selectedType={config.agentType}
          onSelect={(type) => updateConfig('agentType', type)}
        />
      );
    case 'industry':
      return (
        <IndustryStep
          selectedIndustries={config.industries}
          onSelect={(industries, industryNames) => {
            updateConfig('industries', industries);
            updateConfig('industryNames', industryNames);
          }}
        />
      );
    case 'website':
      return (
        <WebsiteInput
          website={config.website}
          onChange={(value) => updateConfig('website', value)}
        />
      );
    case 'capabilities':
      return (
        <CapabilitiesSelection
          selectedCapabilities={config.capabilities}
          onChange={(capabilities) => updateConfig('capabilities', capabilities)}
        />
      );
    case 'integrations':
      return (
        <IntegrationsSelection
          selectedIntegrations={config.integrations}
          onChange={(integrations) => updateConfig('integrations', integrations)}
        />
      );
    case 'summary':
      return (
        <SummaryStep
          config={config}
          onEdit={onEdit}
        />
      );
    default:
      return null;
  }
};

export default StepContent;
