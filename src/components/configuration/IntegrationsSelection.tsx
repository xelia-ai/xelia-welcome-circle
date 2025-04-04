
import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PremiumFeatures from './integrations/PremiumFeatures';
import ComingSoonFeatures from './integrations/ComingSoonFeatures';
import IntegrationSearch from './integrations/IntegrationSearch';

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
  const [premiumFeatures, setPremiumFeatures] = useState<string[]>([]);

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

  const handlePremiumToggle = (featureId: string) => {
    setPremiumFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="basic" className="mb-8">
        <TabsList className="mb-6 w-full grid grid-cols-2">
          <TabsTrigger value="basic" className="text-base py-3">Integraciones Básicas</TabsTrigger>
          <TabsTrigger value="premium" className="text-base py-3">Potencia tu Xelia</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
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

          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-medium mb-4 text-white flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-xelia-accent" />
              Resumen de integraciones
            </h3>
            
            {selectedIntegrations.length > 0 || premiumFeatures.length > 0 ? (
              <div>
                <p className="text-gray-300 mb-3">
                  Has conectado las siguientes integraciones:
                </p>
                <ul className="list-disc list-inside text-white space-y-1">
                  {selectedIntegrations.map((integrationId) => {
                    const integration = integrations.find(i => i.id === integrationId);
                    return <li key={integrationId}>{integration?.name}</li>;
                  })}
                  
                  {premiumFeatures.length > 0 && (
                    <>
                      <li className="text-xelia-accent font-semibold pt-2">Integraciones Premium:</li>
                      {premiumFeatures.map((featureId) => {
                        return <li key={featureId} className="ml-4 text-xelia-accent/90">{getPremiumFeatureName(featureId)}</li>;
                      })}
                    </>
                  )}
                </ul>
              </div>
            ) : (
              <p className="text-gray-400 italic">
                No tienes ninguna integración conectada. Las integraciones son opcionales y puedes configurarlas más tarde.
              </p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="p-1 rounded-md bg-xelia-accent/20 mr-2 text-xelia-accent">🔍</span>
              Buscador de Integraciones
            </h2>
            <IntegrationSearch />
          </div>
        </TabsContent>
        
        <TabsContent value="premium" className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="p-1 rounded-md bg-xelia-accent/20 mr-2 text-xelia-accent">🔹</span>
              Integraciones Avanzadas
            </h2>
            <PremiumFeatures 
              selectedFeatures={premiumFeatures} 
              onToggle={handlePremiumToggle} 
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="p-1 rounded-md bg-xelia-accent/20 mr-2 text-xelia-accent">🔹</span>
              Próximamente
            </h2>
            <ComingSoonFeatures />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
              <span className="p-1 rounded-md bg-xelia-accent/20 mr-2 text-xelia-accent">🔹</span>
              Personaliza tus Integraciones
            </h2>
            <IntegrationSearch />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const getPremiumFeatureName = (featureId: string): string => {
  const nameMap: Record<string, string> = {
    'elite-memory': 'Elite Memory',
    'dashboard-pro': 'Dashboard Pro',
    'omnichannel-layer': 'Omnichannel Layer',
    'notion-sync': 'Notion Sync',
    'voice-to-action': 'Voice-to-Action API',
    'smart-analytics': 'Smart Analytics'
  };
  return nameMap[featureId] || featureId;
};

export default IntegrationsSelection;
