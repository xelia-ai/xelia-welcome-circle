
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
          <li key={index} className="flex items-center text-gray-300 group hover:text-white transition-colors duration-300">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mr-2 flex-shrink-0 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
              <Check className="w-3 h-3 text-purple-400 group-hover:text-purple-300" />
            </div>
            {name}
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};

export default IndustriesSection;
