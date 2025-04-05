
import React from 'react';
import { CheckCircle2, Clock, Globe, Brain, Calendar, Database, RefreshCw, FileSearch } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import CapabilitiesCalculator from './CapabilitiesCalculator';
import ROICalculator from './ROICalculator';

interface CapabilitiesSelectionProps {
  selectedCapabilities: string[];
  onChange: (capabilities: string[]) => void;
  website?: string;
}

interface Capability {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const CapabilitiesSelection: React.FC<CapabilitiesSelectionProps> = ({ 
  selectedCapabilities, 
  onChange,
  website = ''
}) => {
  const capabilities: Capability[] = [
    {
      id: 'multi-language',
      name: 'Multilingüe',
      description: 'Responde a tus clientes en varios idiomas (español, inglés, etc.)',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'conversation-memory',
      name: 'Memoria de conversaciones',
      description: 'Recuerda detalles de conversaciones anteriores con tus clientes',
      icon: <Brain className="w-5 h-5" />
    },
    {
      id: 'appointment-scheduling',
      name: 'Programación de citas',
      description: 'Gestiona automáticamente la programación de citas y reuniones',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 'real-time-data',
      name: 'Datos en tiempo real',
      description: 'Accede a información actualizada para respuestas más precisas',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'whatsapp-integration',
      name: 'Integración con WhatsApp',
      description: 'Interactúa con tus clientes a través de WhatsApp',
      icon: <IconBrandWhatsapp size={20} />
    },
    {
      id: 'follow-ups',
      name: 'Seguimiento automático',
      description: 'Envía recordatorios y seguimientos automáticos a tus clientes',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'rescheduling',
      name: 'Reprogramación inteligente',
      description: 'Permite a los usuarios reprogramar citas, añadir notas o cancelar fácilmente',
      icon: <RefreshCw className="w-5 h-5" />
    },
    {
      id: 'database-search',
      name: 'Búsqueda en base de datos',
      description: 'Genera passkeys para que tus clientes accedan y editen su información',
      icon: <FileSearch className="w-5 h-5" />
    }
  ];

  const toggleCapability = (capabilityId: string) => {
    if (selectedCapabilities.includes(capabilityId)) {
      onChange(selectedCapabilities.filter(id => id !== capabilityId));
    } else {
      onChange([...selectedCapabilities, capabilityId]);
    }
  };

  const getCapabilityNames = () => {
    return capabilities
      .filter(capability => selectedCapabilities.includes(capability.id))
      .map(capability => capability.name);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Columna de opciones */}
        <div className="md:col-span-7 space-y-6">
          <h3 className="text-2xl font-medium text-white mb-4">Selecciona las capacidades</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((capability) => (
              <div 
                key={capability.id}
                className="bg-gray-800/80 border border-gray-700 rounded-lg p-4 flex items-start hover:border-gray-500 transition-colors"
              >
                <div className="mr-4 mt-0.5">
                  <div className="p-2 rounded-full bg-gray-700 text-gray-300">
                    {capability.icon}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <Label 
                      htmlFor={`capability-${capability.id}`}
                      className="text-white font-medium cursor-pointer"
                    >
                      {capability.name}
                    </Label>
                    <Switch
                      id={`capability-${capability.id}`}
                      checked={selectedCapabilities.includes(capability.id)}
                      onCheckedChange={() => toggleCapability(capability.id)}
                      className="data-[state=checked]:bg-xelia-accent"
                    />
                  </div>
                  <p className="text-sm text-gray-400">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna de calculadora y resumen */}
        <div className="md:col-span-5 space-y-6">
          <CapabilitiesCalculator selectedCapabilities={selectedCapabilities} />
          
          <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4 text-white flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-xelia-accent" />
              Resumen de capacidades
            </h3>
            
            {selectedCapabilities.length > 0 ? (
              <div>
                <p className="text-gray-300 mb-3">
                  Has activado las siguientes capacidades:
                </p>
                <ul className="list-disc list-inside text-white space-y-1.5">
                  {getCapabilityNames().map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-400 italic">
                Selecciona al menos una capacidad para Xelia
              </p>
            )}
          </div>
          
          <ROICalculator 
            selectedCapabilities={selectedCapabilities} 
            website={website}
          />
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSelection;
