
import React from 'react';
import { Check } from 'lucide-react';
import SectionContainer from './SectionContainer';

interface IntegrationsSectionProps {
  integrations: string[];
  integrationNames: string[];
  onEdit: () => void;
}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  integrations,
  integrationNames,
  onEdit
}) => {
  return (
    <SectionContainer title="Integraciones" onEdit={onEdit}>
      {integrations.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {integrationNames.map((name, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <Check className="w-4 h-4 text-xelia-accent mr-2 flex-shrink-0" />
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-gray-400 italic">No has seleccionado integraciones</span>
      )}
    </SectionContainer>
  );
};

export default IntegrationsSection;
