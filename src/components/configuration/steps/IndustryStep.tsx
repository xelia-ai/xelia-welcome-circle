
import React from 'react';
import IndustrySelection from '@/components/configuration/IndustrySelection';

interface IndustryStepProps {
  selectedIndustries: string[];
  onSelect: (industries: string[], industryNames: string[]) => void;
}

const IndustryStep: React.FC<IndustryStepProps> = ({ 
  selectedIndustries, 
  onSelect 
}) => {
  return (
    <div>
      <IndustrySelection 
        selectedIndustries={selectedIndustries} 
        onSelect={onSelect}
      />
    </div>
  );
};

export default IndustryStep;
