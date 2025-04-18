
import React from 'react';
import { MessageSquare, Bot, Brain, ServerCog } from 'lucide-react';
import { CAPABILITY_CATEGORIES } from '@/data/industries/common';
import CapabilityGroup from './CapabilityGroup';
import { getCommunicationCapabilities } from './CommunicationCards';
import CallsVolumeSelector from './CallsVolumeSelector';

interface CapabilitiesOptionsProps {
  selectedCapabilities: string[];
  selectedIntegrations: string[];
  selectedCallsVolume: string;
  onToggleCapability: (capabilityId: string) => void;
  onToggleIntegration: (integrationId: string) => void;
  onChangeCallsVolume: (volume: string) => void;
  automationCapabilities: any[];
  intelligenceCapabilities: any[];
  integrationCapabilities: any[];
}

const CapabilitiesOptions: React.FC<CapabilitiesOptionsProps> = ({
  selectedCapabilities,
  selectedIntegrations,
  selectedCallsVolume,
  onToggleCapability,
  onToggleIntegration,
  onChangeCallsVolume,
  automationCapabilities,
  intelligenceCapabilities,
  integrationCapabilities,
}) => {
  const communicationCapabilities = getCommunicationCapabilities();

  return (
    <div className="w-full lg:flex-1 space-y-6 md:space-y-8">
      <div className="pb-2">
        <p className="text-gray-300 text-sm md:text-base">
          Selecciona sólo las capacidades que quieres para tu negocio.
        </p>
      </div>
      
      <CallsVolumeSelector
        selectedVolume={selectedCallsVolume}
        onChange={onChangeCallsVolume}
      />
      
      <div className="space-y-6 md:space-y-8">
        <CapabilityGroup
          title={CAPABILITY_CATEGORIES.communication}
          icon={<MessageSquare className="w-5 h-5" />}
          capabilities={communicationCapabilities}
          selectedCapabilities={selectedCapabilities}
          selectedIntegrations={selectedIntegrations}
          onToggleCapability={onToggleCapability}
          onToggleIntegration={onToggleIntegration}
          isDefault={true}
        />
        
        <CapabilityGroup
          title={CAPABILITY_CATEGORIES.automation}
          icon={<Bot className="w-5 h-5" />}
          capabilities={automationCapabilities}
          selectedCapabilities={selectedCapabilities}
          selectedIntegrations={selectedIntegrations}
          onToggleCapability={onToggleCapability}
          onToggleIntegration={onToggleIntegration}
        />
        
        <CapabilityGroup
          title={CAPABILITY_CATEGORIES.intelligence}
          icon={<Brain className="w-5 h-5" />}
          capabilities={intelligenceCapabilities}
          selectedCapabilities={selectedCapabilities}
          selectedIntegrations={selectedIntegrations}
          onToggleCapability={onToggleCapability}
          onToggleIntegration={onToggleIntegration}
        />
        
        <CapabilityGroup
          title={CAPABILITY_CATEGORIES.integration}
          icon={<ServerCog className="w-5 h-5" />}
          capabilities={integrationCapabilities}
          selectedCapabilities={selectedCapabilities}
          selectedIntegrations={selectedIntegrations}
          onToggleCapability={onToggleCapability}
          onToggleIntegration={onToggleIntegration}
        />
      </div>
    </div>
  );
};

export default CapabilitiesOptions;

