
import React from 'react';
import { Check } from 'lucide-react';
import SectionContainer from './SectionContainer';

interface CapabilitiesSectionProps {
  capabilities: string[];
  capabilityNames: string[];
  onEdit: () => void;
}

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  capabilities,
  capabilityNames,
  onEdit
}) => {
  return (
    <SectionContainer title="Capacidades" onEdit={onEdit}>
      {capabilities.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {capabilityNames.map((name, index) => (
            <li key={index} className="flex items-center text-gray-300 group hover:text-white transition-colors duration-300">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mr-2 flex-shrink-0 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <Check className="w-3 h-3 text-purple-400 group-hover:text-purple-300" />
              </div>
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-gray-400 italic">No has seleccionado capacidades</span>
      )}
    </SectionContainer>
  );
};

export default CapabilitiesSection;
