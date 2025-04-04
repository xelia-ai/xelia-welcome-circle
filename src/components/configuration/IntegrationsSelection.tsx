
import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface IntegrationsSelectionProps {
  selectedIntegrations: string[];
  onChange: (integrations: string[]) => void;
}

interface Integration {
  id: string;
  name: string;
  logo: React.ReactNode;
  description: string;
}

const IntegrationsSelection: React.FC<IntegrationsSelectionProps> = ({ 
  selectedIntegrations, 
  onChange 
}) => {
  const [connectingIntegration, setConnectingIntegration] = useState<string | null>(null);

  const integrations: Integration[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      logo: <IconBrandWhatsapp size={24} className="text-green-500" />,
      description: 'Integra Xelia con WhatsApp para comunicación directa con tus clientes.'
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      logo: <span className="text-2xl">📅</span>,
      description: 'Conecta con Google Calendar para gestionar citas y eventos.'
    },
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      logo: <span className="text-2xl">🔶</span>,
      description: 'Integra con HubSpot para gestionar contactos y seguimientos.'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      logo: <span className="text-2xl">⚡</span>,
      description: 'Conecta con miles de aplicaciones a través de Zapier.'
    },
    {
      id: 'slack',
      name: 'Slack',
      logo: <span className="text-2xl">💬</span>,
      description: 'Integra con Slack para notificaciones y comunicación interna.'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      logo: <span className="text-2xl">☁️</span>,
      description: 'Conecta con Salesforce para gestión de clientes y ventas.'
    },
  ];

  const simulateConnection = (integrationId: string) => {
    if (selectedIntegrations.includes(integrationId)) {
      // Remove integration
      onChange(selectedIntegrations.filter(id => id !== integrationId));
      return;
    }

    // Simulate connection process
    setConnectingIntegration(integrationId);
    setTimeout(() => {
      onChange([...selectedIntegrations, integrationId]);
      setConnectingIntegration(null);
    }, 1500);
  };

  const getIntegrationStatus = (integrationId: string) => {
    if (connectingIntegration === integrationId) {
      return 'connecting';
    }
    if (selectedIntegrations.includes(integrationId)) {
      return 'connected';
    }
    return 'not-connected';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {integrations.map((integration) => {
          const status = getIntegrationStatus(integration.id);
          return (
            <div 
              key={integration.id}
              className="bg-gray-800/60 border border-gray-700 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="mr-3">{integration.logo}</div>
                  <h3 className="text-lg font-medium text-white">{integration.name}</h3>
                </div>
                {status === 'connected' && (
                  <span className="text-green-400 text-sm flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Conectado
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-4">{integration.description}</p>
              <Button 
                variant={status === 'connected' ? 'outline' : 'default'}
                size="sm" 
                className={status === 'connected' 
                  ? 'border-green-600 text-green-400 hover:text-green-500' 
                  : 'bg-xelia-accent hover:bg-xelia-accent/90'
                }
                onClick={() => simulateConnection(integration.id)}
                disabled={status === 'connecting'}
              >
                {status === 'connecting' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {status === 'connected' ? 'Desconectar' : status === 'connecting' ? 'Conectando...' : 'Conectar'}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4 text-white flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-xelia-accent" />
          Resumen de integraciones
        </h3>
        
        {selectedIntegrations.length > 0 ? (
          <div>
            <p className="text-gray-300 mb-3">
              Has conectado las siguientes integraciones:
            </p>
            <ul className="list-disc list-inside text-white space-y-1">
              {selectedIntegrations.map((integrationId) => {
                const integration = integrations.find(i => i.id === integrationId);
                return <li key={integrationId}>{integration?.name}</li>;
              })}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400 italic">
            No tienes ninguna integración conectada. Las integraciones son opcionales y puedes configurarlas más tarde.
          </p>
        )}
      </div>
    </div>
  );
};

export default IntegrationsSelection;
