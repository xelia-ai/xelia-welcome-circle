
import React from 'react';
import { ConfigStep } from '@/utils/configStepInfo';
import { AgentTypeStep, IndustryStep, SummaryStep } from './steps';
import TrainingDocsUpload from './TrainingDocsUpload';
import UnifiedCapabilitiesSelection from './UnifiedCapabilitiesSelection';

interface StepContentProps {
  currentStep: ConfigStep;
  config: {
    agentType: string;
    industries: string[];
    industryNames: string[];
    website: string;
    websiteValidated: boolean;
    capabilities: string[];
    integrations: string[];
    callsVolume: string;
    skipTraining?: boolean;
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
        <TrainingDocsUpload
          website={config.website}
          onWebsiteChange={(url) => {
            updateConfig('website', url);
          }}
          onFilesSelected={(files) => {
            // In a real case, files would be processed here
            // For now, we just record that documents have been uploaded
            updateConfig('website', `${files.length} documento(s) cargado(s)`);
          }}
          onSkipTraining={(skip) => {
            updateConfig('skipTraining', skip);
          }}
        />
      );
    case 'capabilities':
      return (
        <UnifiedCapabilitiesSelection
          selectedCapabilities={config.capabilities}
          selectedIntegrations={config.integrations}
          selectedCallsVolume={config.callsVolume}
          onChangeCapabilities={(capabilities) => updateConfig('capabilities', capabilities)}
          onChangeIntegrations={(integrations) => updateConfig('integrations', integrations)}
          onChangeCallsVolume={(volume) => updateConfig('callsVolume', volume)}
          website={config.website}
          industryCount={config.industries.length}
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
