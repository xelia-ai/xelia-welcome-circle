
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PremiumFeatures from './integrations/PremiumFeatures';
import ComingSoonFeatures from './integrations/ComingSoonFeatures';
import BasicIntegrationsTab from './integrations/BasicIntegrationsTab';
import { integrations } from './integrations/integrationsData';
import IntegrationSearch from './integrations/IntegrationSearch';

interface IntegrationsSelectionProps {
  selectedIntegrations: string[];
  onChange: (integrations: string[]) => void;
}

const IntegrationsSelection: React.FC<IntegrationsSelectionProps> = ({ 
  selectedIntegrations, 
  onChange 
}) => {
  const [connectingIntegration, setConnectingIntegration] = useState<string | null>(null);
  const [premiumFeatures, setPremiumFeatures] = useState<string[]>([]);

  const simulateConnection = (integrationId: string) => {
    if (selectedIntegrations.includes(integrationId)) {
      // Remove integration
      onChange(selectedIntegrations.filter(id => id !== integrationId));
      return;
    }

    // Simulate connection process
    setConnectingIntegration(integrationId);
    setTimeout(() => {
      onChange([...selectedIntegrations, integrationId]);
      setConnectingIntegration(null);
    }, 1500);
  };

  const handlePremiumToggle = (featureId: string) => {
    setPremiumFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="basic" className="mb-8">
        <TabsList className="mb-6 w-full grid grid-cols-2 p-0 overflow-hidden rounded-xl h-14">
          <TabsTrigger value="basic" className="text-base py-3 rounded-l-xl">Integraciones Básicas</TabsTrigger>
          <TabsTrigger value="premium" className="text-base py-3 rounded-r-xl">Integraciones Avanzadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <BasicIntegrationsTab
            integrations={integrations}
            selectedIntegrations={selectedIntegrations}
            connectingIntegration={connectingIntegration}
            premiumFeatures={premiumFeatures}
            handleConnect={simulateConnection}
          />
        </TabsContent>
        
        <TabsContent value="premium" className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
              <span className="p-1 rounded-md bg-xelia-accent/20 mr-2 text-xelia-accent">🔹</span>
              Integraciones Avanzadas
            </h2>
            <PremiumFeatures 
              selectedFeatures={premiumFeatures} 
              onToggle={handlePremiumToggle} 
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
              <span className="p-1 rounded-md bg-xelia-accent/20 mr-2 text-xelia-accent">🔹</span>
              Próximamente
            </h2>
            <ComingSoonFeatures />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
              <span className="p-1 rounded-md bg-xelia-accent/20 mr-2 text-xelia-accent">🔹</span>
              Personaliza tus Integraciones
            </h2>
            <IntegrationSearch />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsSelection;
