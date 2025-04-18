
import React from 'react';
import { useCapabilitiesState } from '@/hooks/useCapabilitiesState';
import CapabilitiesHeader from './CapabilitiesHeader';
import CapabilitiesGroups from './CapabilitiesGroups';
import CallsVolumeSelector from './CallsVolumeSelector';

interface CapabilitiesOptionsProps {
  selectedCapabilities: string[];
  selectedIntegrations: string[];
  selectedCallsVolume: string;
  onToggleCapability: (capabilityId: string) => void;
  onToggleIntegration: (integrationId: string) => void;
  onChangeCallsVolume: (volume: string) => void;
}

const CapabilitiesOptions: React.FC<CapabilitiesOptionsProps> = ({
  selectedCapabilities,
  selectedIntegrations,
  selectedCallsVolume,
  onToggleCapability,
  onToggleIntegration,
  onChangeCallsVolume,
}) => {
  const { 
    automationCapabilities,
    intelligenceCapabilities,
    integrationCapabilities 
  } = useCapabilitiesState();

  return (
    <div className="w-full lg:flex-1 space-y-6 md:space-y-8">
      <CapabilitiesHeader />
      
      <CallsVolumeSelector
        selectedVolume={selectedCallsVolume}
        onChange={onChangeCallsVolume}
      />
      
      <CapabilitiesGroups
        selectedCapabilities={selectedCapabilities}
        selectedIntegrations={selectedIntegrations}
        onToggleCapability={onToggleCapability}
        onToggleIntegration={onToggleIntegration}
        automationCapabilities={automationCapabilities}
        intelligenceCapabilities={intelligenceCapabilities}
        integrationCapabilities={integrationCapabilities}
      />
    </div>
  );
};

export default CapabilitiesOptions;
