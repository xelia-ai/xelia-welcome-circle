
import React from 'react';
import { Check } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { integrations, getIntegrationNameMap } from '../../integrations/integrationsData';

interface IntegrationsSectionProps {
  integrations: string[];
  integrationNames: string[];
  onEdit: () => void;
}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  integrations: selectedIntegrations,
  integrationNames,
  onEdit
}) => {
  // Get the actual integration data to display icons/logos
  const integrationData = integrations.filter(i => selectedIntegrations.includes(i.id));
  
  return (
    <SectionContainer title="Integraciones conectadas" onEdit={onEdit}>
      {selectedIntegrations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {integrationData.map((integration) => (
            <div key={integration.id} className="flex items-center">
              <span className="text-lg mr-2">{integration.logo}</span>
              <span className="text-gray-300">{integration.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-gray-400 italic">No has conectado integraciones</span>
      )}
    </SectionContainer>
  );
};

export default IntegrationsSection;
