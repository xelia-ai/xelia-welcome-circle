
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
            <li key={index} className="flex items-center text-gray-300">
              <Check className="w-4 h-4 text-xelia-accent mr-2 flex-shrink-0" />
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
