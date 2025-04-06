
import React from 'react';
import { MessageSquare, Bot } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import CapabilitiesCalculator from './CapabilitiesCalculator';
import ROICalculator from './roi/ROICalculator';
import { useIsMobile } from '@/hooks/use-mobile';
import CapabilityGroup, { Capability } from './capabilities/CapabilityGroup';
import { Globe, Brain, Calendar, Database, Clock, RefreshCw, FileSearch, Mail } from 'lucide-react';
import TipsWidget from './roi/TipsWidget';

interface CapabilitiesSelectionProps {
  selectedCapabilities: string[];
  onChange: (capabilities: string[]) => void;
  website?: string;
}

const CapabilitiesSelection: React.FC<CapabilitiesSelectionProps> = ({ 
  selectedCapabilities, 
  onChange,
  website = ''
}) => {
  const isMobile = useIsMobile();
  
  const toggleCapability = (capabilityId: string) => {
    if (selectedCapabilities.includes(capabilityId)) {
      onChange(selectedCapabilities.filter(id => id !== capabilityId));
    } else {
      onChange([...selectedCapabilities, capabilityId]);
    }
  };

  // Group capabilities by category
  const communicationCapabilities: Capability[] = [
    {
      id: 'multi-language',
      name: 'Multilingüe',
      description: 'Responde a tus clientes en varios idiomas (español, inglés, etc.)',
      icon: <Globe className="w-5 h-5" />,
      price: 60
    },
    {
      id: 'whatsapp-integration',
      name: 'Integración con WhatsApp',
      description: 'Interactúa con tus clientes a través de WhatsApp',
      icon: <IconBrandWhatsapp size={20} />,
      price: 75
    }
  ];

  const automationCapabilities: Capability[] = [
    {
      id: 'appointment-scheduling',
      name: 'Programación de citas',
      description: 'Gestiona automáticamente la programación de citas y reuniones',
      icon: <Calendar className="w-5 h-5" />,
      price: 65
    },
    {
      id: 'follow-ups',
      name: 'Seguimiento automático',
      description: 'Envía recordatorios y seguimientos automáticos a tus clientes',
      icon: <Clock className="w-5 h-5" />,
      price: 60
    },
    {
      id: 'email-notes',
      name: 'Notas por correo al cliente',
      description: 'Envía una nota interna con el resumen de cada llamada al correo del responsable. Si lo deseas, también puedes programar una respuesta automática para el cliente.',
      icon: <Mail className="w-5 h-5" />,
      price: 55
    }
  ];

  return (
    <div className="w-full mx-auto px-2 md:px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Columna de opciones - Siempre primero en móvil */}
        <div className="w-full lg:flex-1 space-y-6 md:space-y-8">
          <div className="pb-2">
            <p className="text-gray-400 text-sm md:text-base">
              Selecciona sólo las capacidades que quieres para tu negocio.
            </p>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <CapabilityGroup
              title="Comunicación"
              icon={<MessageSquare className="w-5 h-5" />}
              capabilities={communicationCapabilities}
              selectedCapabilities={selectedCapabilities}
              onToggle={toggleCapability}
            />
            
            <CapabilityGroup
              title="Automatización"
              icon={<Bot className="w-5 h-5" />}
              capabilities={automationCapabilities}
              selectedCapabilities={selectedCapabilities}
              onToggle={toggleCapability}
            />
          </div>
          
          {isMobile && (
            <div className="mt-6 md:mt-8">
              <CapabilitiesCalculator selectedCapabilities={selectedCapabilities} />
            </div>
          )}
        </div>

        {/* Contenedor para calculadoras y tips - Después de las capacidades en móvil */}
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
              <CapabilitiesCalculator selectedCapabilities={selectedCapabilities} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSelection;
