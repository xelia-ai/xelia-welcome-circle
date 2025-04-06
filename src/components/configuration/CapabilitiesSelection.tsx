
import React from 'react';
import { MessageSquare, BrainCircuit, Bot } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import CapabilitiesCalculator from './CapabilitiesCalculator';
import ROICalculator from './ROICalculator';
import { useIsMobile } from '@/hooks/use-mobile';
import CapabilityGroup, { Capability } from './capabilities/CapabilityGroup';
import { Globe, Brain, Calendar, Database, Clock, RefreshCw, FileSearch } from 'lucide-react';
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
      id: 'rescheduling',
      name: 'Reprogramación inteligente',
      description: 'Permite a los usuarios reprogramar citas, añadir notas o cancelar fácilmente',
      icon: <RefreshCw className="w-5 h-5" />,
      price: 65
    }
  ];

  const intelligenceCapabilities: Capability[] = [
    {
      id: 'conversation-memory',
      name: 'Memoria de conversaciones',
      description: 'Recuerda detalles de conversaciones anteriores con tus clientes',
      icon: <Brain className="w-5 h-5" />,
      price: 55
    },
    {
      id: 'real-time-data',
      name: 'Datos en tiempo real',
      description: 'Accede a información actualizada para respuestas más precisas',
      icon: <Database className="w-5 h-5" />,
      price: 70
    },
    {
      id: 'database-search',
      name: 'Búsqueda en base de datos',
      description: 'Genera passkeys para que tus clientes accedan y editen su información',
      icon: <FileSearch className="w-5 h-5" />,
      price: 50
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="display-grid-parent flex flex-wrap gap-6">
        {/* Columna de opciones */}
        <div className="w-full lg:flex-1 space-y-6">
          <h3 className="text-2xl font-medium text-white mb-4">Selecciona las capacidades</h3>
          
          <div className="space-y-10">
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
            
            <CapabilityGroup
              title="Inteligencia avanzada"
              icon={<BrainCircuit className="w-5 h-5" />}
              capabilities={intelligenceCapabilities}
              selectedCapabilities={selectedCapabilities}
              onToggle={toggleCapability}
            />
          </div>
        </div>

        {/* Contenedor para calculadoras y tips - Apilar en móvil, lado a lado en desktop */}
        <div className="w-full lg:w-auto lg:min-w-[350px] lg:max-w-[450px] flex flex-col gap-6">
          {/* Calculadora de precio */}
          <div className="w-full">
            <CapabilitiesCalculator selectedCapabilities={selectedCapabilities} />
          </div>
          
          {/* Tips Widget */}
          <div className="w-full hidden lg:block">
            <TipsWidget selectedCapabilities={selectedCapabilities} />
          </div>
          
          {/* ROI Calculator */}
          <div className="w-full">
            <ROICalculator 
              selectedCapabilities={selectedCapabilities} 
              website={website}
              fullWidth={true}
            />
          </div>
          
          {/* Tips Widget (mobile position) */}
          <div className="w-full lg:hidden">
            <TipsWidget selectedCapabilities={selectedCapabilities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSelection;
