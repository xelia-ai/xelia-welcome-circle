
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
    <div className="max-w-6xl mx-auto px-4">
      <div className="display-grid-parent flex flex-wrap gap-6">
        {/* Columna de opciones */}
        <div className="w-full lg:flex-1 space-y-8">
          <div className="pb-2">
            <h3 className="text-2xl font-medium text-white">Personaliza tu inversión</h3>
            <p className="text-gray-400 mt-1">
              Selecciona sólo las capacidades que quieres para tu negocio.
            </p>
          </div>
          
          <div className="space-y-8">
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
          
          <div className="mt-8">
            <CapabilitiesCalculator selectedCapabilities={selectedCapabilities} />
          </div>
        </div>

        {/* Contenedor para calculadoras y tips - Reordenado según la petición */}
        <div className="w-full lg:w-auto lg:min-w-[350px] lg:max-w-[450px] flex flex-col gap-8">
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
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSelection;
