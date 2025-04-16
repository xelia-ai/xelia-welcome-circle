
import React from 'react';
import { ConfigStep } from '@/utils/configStepInfo';
import AgentPreview from '@/components/configuration/AgentPreview';
import IndustriesSection from './summary/IndustriesSection';
import WebsiteSection from './summary/WebsiteSection';
import CapabilitiesSection from './summary/CapabilitiesSection';
import IntegrationsSection from './summary/IntegrationsSection';
import SummaryPriceCard from './summary/SummaryPriceCard';
import ActionButtons from './summary/ActionButtons';
import { 
  getCapabilityNames, 
  getIntegrationNames, 
  calculateIndustriesPrice 
} from './summary/utilities';

interface SummaryStepProps {
  config: {
    agentType: string;
    industries: string[];
    industryNames: string[];
    website: string;
    capabilities: string[];
    integrations: string[];
    callsVolume: string;
  };
  onEdit: (step: ConfigStep) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ config, onEdit }) => {
  const capabilityNames = getCapabilityNames(config.capabilities);
  const integrationNames = getIntegrationNames(config.integrations);
  const priceInfo = calculateIndustriesPrice(config.industries.length);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="p-6 bg-gray-800/60 border border-gray-700 rounded-xl">
          <h2 className="text-2xl font-medium text-white mb-6">
            Tu agente está listo. Aquí tienes todo lo que Xelia puede hacer por ti.
          </h2>
          
          <IndustriesSection 
            industryNames={config.industryNames} 
            onEdit={() => onEdit('industry')} 
          />
          
          <WebsiteSection 
            website={config.website} 
            onEdit={() => onEdit('website')} 
          />
          
          <CapabilitiesSection 
            capabilities={config.capabilities} 
            capabilityNames={capabilityNames}
            callsVolume={config.callsVolume}
            onEdit={() => onEdit('capabilities')} 
          />
          
          <IntegrationsSection 
            integrations={config.integrations} 
            integrationNames={integrationNames}
            onEdit={() => onEdit('capabilities')} // Changed from 'integrations' to 'capabilities'
          />
          
          <SummaryPriceCard 
            basePrice={priceInfo.basePrice}
            industryCount={config.industries.length}
            additionalPrice={priceInfo.additionalPrice}
            totalPrice={priceInfo.totalPrice}
          />
          
          <ActionButtons />
        </div>
      </div>
      
      <div className="h-full">
        <AgentPreview 
          agentType={config.agentType}
          industry={config.industries[0] || ''}
          capabilities={config.capabilities}
          website={config.website}
        />
      </div>
    </div>
  );
};

export default SummaryStep;
