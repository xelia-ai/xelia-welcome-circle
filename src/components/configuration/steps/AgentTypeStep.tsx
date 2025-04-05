
import React from 'react';
import AgentTypeSelection from '@/components/configuration/AgentTypeSelection';

interface AgentTypeStepProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const AgentTypeStep: React.FC<AgentTypeStepProps> = ({ 
  selectedType, 
  onSelect 
}) => {
  return (
    <div className="md:col-span-2">
      <AgentTypeSelection 
        selectedType={selectedType} 
        onSelect={onSelect} 
      />
    </div>
  );
};

export default AgentTypeStep;
