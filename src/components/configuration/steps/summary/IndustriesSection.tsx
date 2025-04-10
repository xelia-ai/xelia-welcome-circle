
import React from 'react';
import { Check } from 'lucide-react';
import SectionContainer from './SectionContainer';

interface IndustriesSectionProps {
  industryNames: string[];
  onEdit: () => void;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  industryNames,
  onEdit
}) => {
  return (
    <SectionContainer title="Industria" onEdit={onEdit}>
      <ul className="space-y-2">
        {industryNames.map((name, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <Check className="w-4 h-4 text-xelia-accent mr-2" />
            {name}
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};

export default IndustriesSection;
