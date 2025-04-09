
import React from 'react';
import { Industry } from '@/types/industry';

interface IndustryDescriptionProps {
  selectedIndustriesData: Industry[];
}

const IndustryDescription: React.FC<IndustryDescriptionProps> = ({ 
  selectedIndustriesData
}) => {
  if (selectedIndustriesData.length !== 1) return null;
  
  return (
    <p className="text-sm text-gray-300 mt-3 border-t border-gray-700 pt-3">
      {selectedIndustriesData[0]?.description}
    </p>
  );
};

export default IndustryDescription;
