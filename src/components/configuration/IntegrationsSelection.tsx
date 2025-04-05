
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { integrations, getIntegrationNameMap } from './integrations/integrationsData';
import BasicIntegrationsTab from './integrations/BasicIntegrationsTab';
import PremiumFeaturesTab from './integrations/PremiumFeaturesTab';
import PersonalizationSheet from './integrations/PersonalizationSheet';

interface IntegrationsSelectionProps {
  selectedIntegrations: string[];
  onChange: (integrations: string[]) => void;
}

const IntegrationsSelection: React.FC<IntegrationsSelectionProps> = ({ 
  selectedIntegrations, 
  onChange 
}) => {
  const [connectingIntegration, setConnectingIntegration] = useState<string | null>(null);
  const [selectedPremiumFeatures, setSelectedPremiumFeatures] = useState<string[]>([]);
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);

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
    setSelectedPremiumFeatures(prev => {
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
            premiumFeatures={selectedPremiumFeatures}
            handleConnect={simulateConnection}
          />
        </TabsContent>
        
        <TabsContent value="premium">
          <PremiumFeaturesTab
            selectedPremiumFeatures={selectedPremiumFeatures}
            onPremiumToggle={handlePremiumToggle}
            selectedIntegrations={selectedIntegrations}
            onOpenPersonalization={() => setIsPersonalizationOpen(true)}
          />
        </TabsContent>
      </Tabs>

      <PersonalizationSheet 
        open={isPersonalizationOpen} 
        onOpenChange={setIsPersonalizationOpen}
        selectedIntegrations={selectedIntegrations}
        premiumFeatures={selectedPremiumFeatures}
        onIntegrationToggle={simulateConnection}
        onPremiumToggle={handlePremiumToggle}
      />
    </div>
  );
};

export default IntegrationsSelection;
