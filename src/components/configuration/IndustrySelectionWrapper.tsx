
import React from 'react';
import IndustrySelection from './IndustrySelection';

interface IndustrySelectionWrapperProps {
  selectedIndustries: string[];
  onSelect: (industries: string[], industryNames: string[]) => void;
}

const IndustrySelectionWrapper: React.FC<IndustrySelectionWrapperProps> = ({ 
  selectedIndustries, 
  onSelect,
  ...rest 
}) => {
  return (
    <IndustrySelection
      selectedIndustries={selectedIndustries}
      onSelect={onSelect}
      {...rest}
    />
  );
};

export default IndustrySelectionWrapper;
