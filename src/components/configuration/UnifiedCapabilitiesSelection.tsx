import React from 'react';
import { VOLUME_PRICING } from '@/data/industries/common';
import CapabilitiesOptions from './capabilities/CapabilitiesOptions';
import CalculatorsPanel from './capabilities/CalculatorsPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import CapabilitiesCalculator from './CapabilitiesCalculator';

interface UnifiedCapabilitiesSelectionProps {
  selectedCapabilities: string[];
  selectedIntegrations: string[];
  selectedCallsVolume: string;
  onChangeCapabilities: (capabilities: string[]) => void;
  onChangeIntegrations: (integrations: string[]) => void;
  onChangeCallsVolume: (volume: string) => void;
  website?: string;
  industryCount?: number;
}

const UnifiedCapabilitiesSelection: React.FC<UnifiedCapabilitiesSelectionProps> = ({ 
  selectedCapabilities, 
  selectedIntegrations,
  selectedCallsVolume,
  onChangeCapabilities,
  onChangeIntegrations,
  onChangeCallsVolume,
  website = '',
  industryCount = 1
}) => {
  const isMobile = useIsMobile();
  
  const toggleCapability = (capabilityId: string) => {
    if (selectedCapabilities.includes(capabilityId)) {
      onChangeCapabilities(selectedCapabilities.filter(id => id !== capabilityId));
    } else {
      onChangeCapabilities([...selectedCapabilities, capabilityId]);
    }
  };

  const toggleIntegration = (integrationId: string) => {
    if (selectedIntegrations.includes(integrationId)) {
      onChangeIntegrations(selectedIntegrations.filter(id => id !== integrationId));
    } else {
      onChangeIntegrations([...selectedIntegrations, integrationId]);
    }
  };

  // Get volume price for calculator
  const getVolumePrice = () => {
    return VOLUME_PRICING[selectedCallsVolume as keyof typeof VOLUME_PRICING] || 0;
  };

  const getCapabilitiesByCategory = (category: string) => {
    return CAPABILITIES
      .filter(cap => cap.category === category && category !== 'communication')
      .map(cap => ({
        id: cap.id,
        name: cap.name,
        description: cap.description,
        icon: getIconForCapability(cap.id),
        price: cap.price,
        hasConnection: cap.hasConnection,
        connectionType: cap.connectionType,
        integrationOptions: cap.integrationOptions
      }));
  };

  const getIconForCapability = (id: string): React.ReactNode => {
    switch (id) {
      case 'multi-language':
        return <MessageSquare className="w-5 h-5" />;
      case 'whatsapp-integration':
      case 'confirmation-whatsapp':
        return <IconBrandWhatsapp size={20} />;
      case 'elite-memory':
      case 'conversation-memory':
      case 'database-search':
      case 'voice-assistant':
      case 'real-time-data':
        return <Brain className="w-5 h-5" />;
      default:
        return <Bot className="w-5 h-5" />;
    }
  };

  const automationCapabilities = getCapabilitiesByCategory('automation');
  const intelligenceCapabilities = getCapabilitiesByCategory('intelligence');
  const integrationCapabilities = getCapabilitiesByCategory('integration');

  return (
    <div className="w-full mx-auto px-2 md:px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <CapabilitiesOptions
          selectedCapabilities={selectedCapabilities}
          selectedIntegrations={selectedIntegrations}
          selectedCallsVolume={selectedCallsVolume}
          onToggleCapability={toggleCapability}
          onToggleIntegration={toggleIntegration}
          onChangeCallsVolume={onChangeCallsVolume}
          automationCapabilities={automationCapabilities}
          intelligenceCapabilities={intelligenceCapabilities}
          integrationCapabilities={integrationCapabilities}
        />

        {isMobile && (
          <div className="mt-6 md:mt-8">
            <CapabilitiesCalculator 
              selectedCapabilities={selectedCapabilities} 
              industryCount={industryCount}
              volumePrice={getVolumePrice()}
            />
          </div>
        )}

        <div className="w-full lg:w-auto lg:min-w-[350px] lg:max-w-[450px] flex flex-col gap-6 md:gap-8">
          <CalculatorsPanel
            selectedCapabilities={selectedCapabilities}
            website={website}
            industryCount={industryCount}
            volumePrice={getVolumePrice()}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default UnifiedCapabilitiesSelection;
