
import React from 'react';
import { 
  Building, CheckCircle2, Globe, Brain, Calendar, 
  Database, Clock, Edit 
} from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface SummaryProps {
  config: {
    industry: string;
    industryName: string;
    industries?: string[];
    industryNames?: string[];
    website: string;
    capabilities: string[];
    integrations: string[];
  };
  onEdit: (step: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

interface CapabilityInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface IntegrationInfo {
  id: string;
  name: string;
  logo: string;
}

interface IndustryInfo {
  id: string;
  name: string;
}

const Summary: React.FC<SummaryProps> = ({ config, onEdit }) => {
  const capabilities: CapabilityInfo[] = [
    { id: 'multi-language', name: 'Multilingüe', icon: <Globe className="w-4 h-4" /> },
    { id: 'conversation-memory', name: 'Memoria de conversaciones', icon: <Brain className="w-4 h-4" /> },
    { id: 'appointment-scheduling', name: 'Programación de citas', icon: <Calendar className="w-4 h-4" /> },
    { id: 'real-time-data', name: 'Datos en tiempo real', icon: <Database className="w-4 h-4" /> },
    { id: 'whatsapp-integration', name: 'Integración con WhatsApp', icon: <IconBrandWhatsapp size={16} /> },
    { id: 'follow-ups', name: 'Seguimiento automático', icon: <Clock className="w-4 h-4" /> }
  ];

  const integrations: IntegrationInfo[] = [
    { id: 'whatsapp', name: 'WhatsApp', logo: '🟢' },
    { id: 'google-calendar', name: 'Google Calendar', logo: '📅' },
    { id: 'hubspot', name: 'HubSpot CRM', logo: '🔶' },
    { id: 'zapier', name: 'Zapier', logo: '⚡' },
    { id: 'slack', name: 'Slack', logo: '💬' },
    { id: 'salesforce', name: 'Salesforce', logo: '☁️' }
  ];

  // Get industry names from either the new or old format
  const getIndustryNames = (): string[] => {
    if (config.industryNames && config.industryNames.length) {
      return config.industryNames;
    } else if (config.industryName) {
      return [config.industryName];
    }
    return [];
  };

  const getSelectedCapabilities = () => {
    return capabilities.filter(cap => config.capabilities.includes(cap.id));
  };

  const getSelectedIntegrations = () => {
    return integrations.filter(int => config.integrations.includes(int.id));
  };

  const SectionHeader = ({ title, onEditClick }: { title: string, onEditClick: () => void }) => (
    <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-8 border-gray-600 text-gray-300"
        onClick={onEditClick}
      >
        <Edit className="h-3 w-3 mr-1" />
        Editar
      </Button>
    </div>
  );

  const industryNames = getIndustryNames();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Industry Section */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
        <SectionHeader title="Industria" onEditClick={() => onEdit('industry')} />
        <div className="flex items-start">
          <div className="p-2 rounded-full bg-xelia-accent/10 text-xelia-accent mr-3 mt-1">
            <Building className="h-5 w-5" />
          </div>
          <div>
            {industryNames.length > 0 ? (
              <>
                {industryNames.length === 1 ? (
                  <p className="text-white font-medium">{industryNames[0]}</p>
                ) : (
                  <>
                    <p className="text-white font-medium mb-2">Múltiples industrias ({industryNames.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {industryNames.map((name, index) => (
                        <span 
                          key={index} 
                          className="inline-block bg-xelia-accent/10 text-gray-200 text-xs px-2 py-1 rounded-md"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-white font-medium">No seleccionada</p>
            )}
            <p className="text-sm text-gray-400 mt-1">Configuración para tu industria específica</p>
          </div>
        </div>
      </div>

      {/* Website Section */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
        <SectionHeader title="Sitio Web" onEditClick={() => onEdit('website')} />
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-xelia-accent/10 text-xelia-accent mr-3">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <p className="text-white font-medium">{config.website || 'No ingresado'}</p>
            <p className="text-sm text-gray-400">Xelia analizará tu sitio web</p>
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
        <SectionHeader title="Capacidades" onEditClick={() => onEdit('capabilities')} />
        {getSelectedCapabilities().length > 0 ? (
          <ul className="space-y-3">
            {getSelectedCapabilities().map(cap => (
              <li key={cap.id} className="flex items-center">
                <div className="p-1 rounded-full bg-xelia-accent/10 text-xelia-accent mr-2">
                  {cap.icon}
                </div>
                <span className="text-gray-300">{cap.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No se seleccionaron capacidades</p>
        )}
      </div>

      {/* Integrations Section */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
        <SectionHeader title="Integraciones" onEditClick={() => onEdit('integrations')} />
        {getSelectedIntegrations().length > 0 ? (
          <ul className="space-y-3">
            {getSelectedIntegrations().map(int => (
              <li key={int.id} className="flex items-center">
                <span className="text-xl mr-2">{int.logo}</span>
                <span className="text-gray-300">{int.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No se conectaron integraciones</p>
        )}
      </div>

      {/* Summary message */}
      <div className="md:col-span-2 bg-xelia-accent/20 border border-xelia-accent/30 rounded-lg p-5">
        <div className="flex items-start">
          <CheckCircle2 className="w-5 h-5 text-xelia-accent mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-white mb-2">¡Tu configuración está completa!</h3>
            <p className="text-gray-300">
              Xelia ha sido configurada según tus preferencias. Haz clic en "Finalizar" para continuar a la demo y ver a Xelia en acción.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
