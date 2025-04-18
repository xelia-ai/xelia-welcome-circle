
import React, { useState } from 'react';
import { ConfigStep } from '@/utils/configStepInfo';
import IndustriesSection from './summary/IndustriesSection';
import WebsiteSection from './summary/WebsiteSection';
import CapabilitiesSection from './summary/CapabilitiesSection';
import IntegrationsSection from './summary/IntegrationsSection';
import SummaryPriceCard from './summary/SummaryPriceCard';
import SummaryActionButtons from './summary/SummaryActionButtons';
import PreviewColumn from './summary/PreviewColumn';

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
  updateConfig?: (key: string, value: any) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  config,
  onEdit,
  updateConfig
}) => {
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);

  const handleEditInSummary = (step: ConfigStep) => {
    if (['industry', 'website', 'capabilities'].includes(step)) {
      onEdit(step);
    }
  };

  const handleRemoveCapability = (capabilityId: string) => {
    if (updateConfig && config.capabilities.includes(capabilityId)) {
      const updatedCapabilities = config.capabilities.filter(id => id !== capabilityId);
      updateConfig('capabilities', updatedCapabilities);
    }
  };

  // Create a mapping for capability names
  const capabilityNames: Record<string, string> = {};
  config.capabilities.forEach(cap => {
    capabilityNames[cap] = cap; // Using the ID as the name for now
  });

  // Create a mapping for integration names
  const integrationNames: Record<string, string> = {};
  config.integrations.forEach(int => {
    integrationNames[int] = int; // Using the ID as the name for now
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="p-6 bg-gray-800/60 border border-gray-700 rounded-xl">
          <IndustriesSection 
            industryNames={config.industryNames} 
            onEdit={() => handleEditInSummary('industry')} 
          />
          
          <WebsiteSection 
            website={config.website} 
            onEdit={() => handleEditInSummary('website')} 
          />
          
          <CapabilitiesSection 
            capabilities={config.capabilities}
            capabilityNames={capabilityNames}
            callsVolume={config.callsVolume}
            onEdit={() => handleEditInSummary('capabilities')} 
          />
          
          <IntegrationsSection 
            integrations={config.integrations}
            integrationNames={integrationNames}
            onEdit={() => handleEditInSummary('capabilities')} 
          />
          
          <SummaryPriceCard 
            basePrice={75}
            industryCount={config.industries.length}
            additionalPrice={(config.industries.length - 1) * 15}
            capabilitiesPrice={config.capabilities.length * 25}
            volumePrice={
              config.callsVolume === '500' ? 0 : 
              config.callsVolume === '1000' ? 50 : 
              config.callsVolume === '5000' ? 150 : 300
            }
            totalPrice={
              75 + // base price
              ((config.industries.length - 1) * 15) + // additional industries
              (config.capabilities.length * 25) + // capabilities
              (config.callsVolume === '500' ? 0 : 
               config.callsVolume === '1000' ? 50 : 
               config.callsVolume === '5000' ? 150 : 300) // volume price
            }
            capabilities={config.capabilities}
            onRemoveCapability={handleRemoveCapability}
          />
          
          <SummaryActionButtons
            isCallDialogOpen={isCallDialogOpen}
            setIsCallDialogOpen={setIsCallDialogOpen}
          />
        </div>
      </div>
      
      <PreviewColumn 
        agentType={config.agentType}
        industry={config.industries[0] || ''}
        capabilities={config.capabilities}
        website={config.website}
      />
    </div>
  );
};

export default SummaryStep;
