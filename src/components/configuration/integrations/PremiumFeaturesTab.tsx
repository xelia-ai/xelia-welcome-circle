
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import PremiumFeatures from './PremiumFeatures';
import IntegrationsSummary from './IntegrationsSummary';
import ComingSoonFeatures from './ComingSoonFeatures';
import IntegrationSearch from './IntegrationSearch';
import { getIntegrationNameMap, getPremiumFeatureName } from './integrationsData';

interface PremiumFeaturesTabProps {
  selectedPremiumFeatures: string[];
  onPremiumToggle: (featureId: string) => void;
  selectedIntegrations: string[];
  onOpenPersonalization: () => void;
}

const PremiumFeaturesTab: React.FC<PremiumFeaturesTabProps> = ({
  selectedPremiumFeatures,
  onPremiumToggle,
  selectedIntegrations,
  onOpenPersonalization
}) => {
  const integrationNames = getIntegrationNameMap();

  return (
    <div className="space-y-10">
      <PremiumFeatures 
        selectedFeatures={selectedPremiumFeatures} 
        onToggle={onPremiumToggle} 
      />
      
      <IntegrationsSummary
        selectedIntegrations={selectedIntegrations}
        integrationNames={integrationNames}
        premiumFeatures={selectedPremiumFeatures}
        getPremiumFeatureName={getPremiumFeatureName}
      />
      
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

      <div className="mt-8 text-center">
        <Button 
          onClick={onOpenPersonalization}
          className="bg-xelia-accent hover:bg-xelia-accent/90 text-black font-medium text-base px-6 py-5 h-auto"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          ¿Quieres personalizar más tu Xelia?
        </Button>
      </div>
    </div>
  );
};

export default PremiumFeaturesTab;
