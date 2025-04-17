
import React from 'react';
import { MessageSquare, Bot, Brain, ServerCog } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { CAPABILITY_CATEGORIES, CAPABILITIES } from '@/data/industries/common';
import CapabilitiesCalculator from './CapabilitiesCalculator';
import ROICalculator from './roi/ROICalculator';
import { useIsMobile } from '@/hooks/use-mobile';
import CapabilityGroup from './capabilities/CapabilityGroup';
import TipsWidget from './roi/TipsWidget';
import { getCommunicationCapabilities } from './capabilities/CommunicationCards';

interface CapabilitiesSelectionProps {
  selectedCapabilities: string[];
  onChange: (capabilities: string[]) => void;
  website?: string;
  industryCount?: number;
}

const CapabilitiesSelection: React.FC<CapabilitiesSelectionProps> = ({ 
  selectedCapabilities, 
  onChange,
  website = '',
  industryCount = 1
}) => {
  const isMobile = useIsMobile();
  
  const toggleCapability = (capabilityId: string) => {
    if (selectedCapabilities.includes(capabilityId)) {
      onChange(selectedCapabilities.filter(id => id !== capabilityId));
    } else {
      onChange([...selectedCapabilities, capabilityId]);
    }
  };

  // Get the communication capabilities including our new one
  const communicationCapabilities = getCommunicationCapabilities();
  
  // Agrupar el resto de capacidades por categoría
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
    // Asignar iconos específicos según el ID de la capacidad
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
        {/* Columna de opciones - Siempre primero en móvil */}
        <div className="w-full lg:flex-1 space-y-6 md:space-y-8">
          <div className="pb-2">
            <p className="text-gray-300 text-sm md:text-base">
              Selecciona sólo las capacidades que quieres para tu negocio.
            </p>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <CapabilityGroup
              title={CAPABILITY_CATEGORIES.communication}
              icon={<MessageSquare className="w-5 h-5" />}
              capabilities={communicationCapabilities}
              selectedCapabilities={selectedCapabilities}
              selectedIntegrations={[]}
              onToggleCapability={toggleCapability}
              onToggleIntegration={() => {}}
              isDefault={true}
            />
            
            <CapabilityGroup
              title={CAPABILITY_CATEGORIES.automation}
              icon={<Bot className="w-5 h-5" />}
              capabilities={automationCapabilities}
              selectedCapabilities={selectedCapabilities}
              selectedIntegrations={[]}
              onToggleCapability={toggleCapability}
              onToggleIntegration={() => {}}
            />
            
            <CapabilityGroup
              title={CAPABILITY_CATEGORIES.intelligence}
              icon={<Brain className="w-5 h-5" />}
              capabilities={intelligenceCapabilities}
              selectedCapabilities={selectedCapabilities}
              selectedIntegrations={[]}
              onToggleCapability={toggleCapability}
              onToggleIntegration={() => {}}
            />
            
            <CapabilityGroup
              title={CAPABILITY_CATEGORIES.integration}
              icon={<ServerCog className="w-5 h-5" />}
              capabilities={integrationCapabilities}
              selectedCapabilities={selectedCapabilities}
              selectedIntegrations={[]}
              onToggleCapability={toggleCapability}
              onToggleIntegration={() => {}}
            />
          </div>
          
          {isMobile && (
            <div className="mt-6 md:mt-8">
              <CapabilitiesCalculator 
                selectedCapabilities={selectedCapabilities} 
                industryCount={industryCount}
              />
            </div>
          )}
        </div>

        {/* Container for calculators and tips - After capabilities on mobile */}
        <div className="w-full lg:w-auto lg:min-w-[350px] lg:max-w-[450px] flex flex-col gap-6 md:gap-8">
          {/* ROI Calculator */}
          <div className="w-full">
            <ROICalculator 
              selectedCapabilities={selectedCapabilities} 
              website={website}
              fullWidth={true}
            />
          </div>
          
          {/* Tips Widget */}
          <div className="w-full">
            <TipsWidget selectedCapabilities={selectedCapabilities} />
          </div>
          
          {/* Capabilities Calculator only on desktop */}
          {!isMobile && (
            <div className="w-full">
              <CapabilitiesCalculator 
                selectedCapabilities={selectedCapabilities} 
                industryCount={industryCount}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSelection;
