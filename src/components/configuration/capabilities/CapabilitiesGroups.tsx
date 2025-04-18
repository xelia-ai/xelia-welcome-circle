
import React from 'react';
import { MessageSquare, Bot, Brain, ServerCog } from 'lucide-react';
import { CAPABILITY_CATEGORIES } from '@/data/industries/common';
import CapabilityGroup from './CapabilityGroup';
import { getCommunicationCapabilities } from './CommunicationCards';
import { Capability } from './types';

interface CapabilitiesGroupsProps {
  selectedCapabilities: string[];
  selectedIntegrations: string[];
  onToggleCapability: (capabilityId: string) => void;
  onToggleIntegration: (integrationId: string) => void;
  automationCapabilities: Capability[];
  intelligenceCapabilities: Capability[];
  integrationCapabilities: Capability[];
}

const CapabilitiesGroups: React.FC<CapabilitiesGroupsProps> = ({
  selectedCapabilities,
  selectedIntegrations,
  onToggleCapability,
  onToggleIntegration,
  automationCapabilities,
  intelligenceCapabilities,
  integrationCapabilities
}) => {
  const communicationCapabilities = getCommunicationCapabilities();

  return (
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
  );
};

export default CapabilitiesGroups;
