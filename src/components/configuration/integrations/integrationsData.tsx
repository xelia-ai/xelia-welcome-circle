
import React from 'react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

export interface Integration {
  id: string;
  name: string;
  logo: React.ReactNode;
  description: string;
}

export const integrations: Integration[] = [
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

export const getPremiumFeatureName = (featureId: string): string => {
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

export const getIntegrationNameMap = (): Record<string, string> => {
  return integrations.reduce((acc, integration) => {
    acc[integration.id] = integration.name;
    return acc;
  }, {} as Record<string, string>);
};
