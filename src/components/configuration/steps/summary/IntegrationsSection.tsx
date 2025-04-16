
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
            <div key={integration.id} className="flex items-center p-2 rounded-lg bg-gray-700/30 border border-gray-700">
              <div className="w-8 h-8 mr-2 flex items-center justify-center text-[#3EF3B0] bg-[#3EF3B0]/10 rounded-full border border-[#3EF3B0]/30">
                {integration.logo}
              </div>
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
