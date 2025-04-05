
import React from 'react';
import Summary from '@/components/configuration/Summary';
import AgentPreview from '@/components/configuration/AgentPreview';
import { ConfigStep } from '@/utils/configStepInfo';

interface SummaryStepProps {
  config: {
    agentType: string;
    industries: string[];
    industryNames: string[];
    website: string;
    capabilities: string[];
    integrations: string[];
  };
  onEdit: (step: ConfigStep) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ config, onEdit }) => {
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
          onEdit={onEdit} 
        />
      </div>
      <div className="h-full">
        <AgentPreview 
          agentType={config.agentType}
          industry={config.industries[0] || ''}
          capabilities={config.capabilities}
          website={config.website}
        />
      </div>
    </div>
  );
};

export default SummaryStep;
