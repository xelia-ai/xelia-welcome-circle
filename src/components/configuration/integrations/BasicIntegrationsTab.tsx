
import React from 'react';
import IntegrationCard from './IntegrationCard';
import IntegrationsSummary from './IntegrationsSummary';
import IntegrationSearch from './IntegrationSearch';
import { Integration, getPremiumFeatureName, getIntegrationNameMap } from './integrationsData';

interface BasicIntegrationsTabProps {
  integrations: Integration[];
  selectedIntegrations: string[];
  connectingIntegration: string | null;
  premiumFeatures: string[];
  handleConnect: (id: string) => void;
}

const BasicIntegrationsTab: React.FC<BasicIntegrationsTabProps> = ({
  integrations,
  selectedIntegrations,
  connectingIntegration,
  premiumFeatures,
  handleConnect
}) => {
  const getIntegrationStatus = (integrationId: string) => {
    if (connectingIntegration === integrationId) {
      return 'connecting';
    }
    if (selectedIntegrations.includes(integrationId)) {
      return 'connected';
    }
    return 'not-connected';
  };

  const integrationNames = getIntegrationNameMap();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {integrations.map((integration) => {
          const status = getIntegrationStatus(integration.id);
          return (
            <IntegrationCard
              key={integration.id}
              id={integration.id}
              name={integration.name}
              logo={integration.logo}
              description={integration.description}
              status={status as 'connected' | 'connecting' | 'not-connected'}
              onConnect={handleConnect}
            />
          );
        })}
      </div>

      <IntegrationsSummary
        selectedIntegrations={selectedIntegrations}
        integrationNames={integrationNames}
        premiumFeatures={premiumFeatures}
        getPremiumFeatureName={getPremiumFeatureName}
      />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
          <span className="p-1 rounded-md bg-xelia-accent/20 mr-2 text-xelia-accent">🔍</span>
          Buscador de Integraciones
        </h2>
        <IntegrationSearch />
      </div>
    </>
  );
};

export default BasicIntegrationsTab;
