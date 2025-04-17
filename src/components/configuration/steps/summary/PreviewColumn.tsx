
import React from 'react';
import AgentPreview from '@/components/configuration/AgentPreview';

interface PreviewColumnProps {
  agentType: string;
  industry: string;
  capabilities: string[];
  website: string;
}

const PreviewColumn: React.FC<PreviewColumnProps> = ({
  agentType,
  industry,
  capabilities,
  website
}) => {
  return (
    <div className="h-full">
      <AgentPreview 
        agentType={agentType}
        industry={industry}
        capabilities={capabilities}
        website={website}
      />
    </div>
  );
};

export default PreviewColumn;
