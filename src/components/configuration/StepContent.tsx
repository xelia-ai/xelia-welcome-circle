
import React from 'react';
import { ConfigStep } from '@/utils/configStepInfo';
import { AgentTypeStep, IndustryStep, SummaryStep } from './steps';
import TrainingDocsUpload from './TrainingDocsUpload';
import CapabilitiesSelection from './CapabilitiesSelection';
import IntegrationsSelection from './IntegrationsSelection';

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
            // En un caso real, aquí se procesarían los archivos
            // Por ahora, sólo guardamos que se han cargado documentos
            updateConfig('website', `${files.length} documento(s) cargado(s)`);
          }}
          onSkipTraining={(skip) => {
            updateConfig('skipTraining', skip);
          }}
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
