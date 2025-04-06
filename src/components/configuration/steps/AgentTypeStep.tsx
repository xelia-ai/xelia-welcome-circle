
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
      <h2 className="text-white text-xl font-semibold mb-4">Configura a Xelia según tus objetivos</h2>
      <AgentTypeSelection 
        selectedType={selectedType} 
        onSelect={onSelect} 
      />
    </div>
  );
};

export default AgentTypeStep;
