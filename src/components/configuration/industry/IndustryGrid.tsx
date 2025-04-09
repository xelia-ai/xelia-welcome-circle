
import React from 'react';
import { Industry } from '@/types/industry';
import IndustryCard from './IndustryCard';

interface IndustryGridProps {
  industries: Industry[];
  selectedIndustries: string[];
  onToggle: (industryId: string) => void;
}

const IndustryGrid: React.FC<IndustryGridProps> = ({ 
  industries, 
  selectedIndustries, 
  onToggle 
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {industries.map((industry) => (
        <IndustryCard 
          key={industry.id}
          industry={industry}
          isSelected={selectedIndustries.includes(industry.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default IndustryGrid;
