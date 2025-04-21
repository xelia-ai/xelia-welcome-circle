
import { useMemo } from 'react';
import { MessageSquare, Bot, Brain, ServerCog } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { CAPABILITIES } from '@/data/industries/common';
import { Capability } from '@/components/configuration/capabilities/types';

export const useCapabilitiesState = () => {
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

  const getCapabilitiesByCategory = (category: string): Capability[] => {
    return CAPABILITIES
      .filter(cap => cap.category === category)
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

  const automationCapabilities = useMemo(() => 
    getCapabilitiesByCategory('automation'), []
  );
  
  const intelligenceCapabilities = useMemo(() => 
    getCapabilitiesByCategory('intelligence'), []
  );
  
  const integrationCapabilities = useMemo(() => 
    getCapabilitiesByCategory('integration'), []
  );

  return {
    automationCapabilities,
    intelligenceCapabilities,
    integrationCapabilities
  };
};
