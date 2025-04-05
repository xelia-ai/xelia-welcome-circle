
import React from 'react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Brain, BarChart2, Share2, FileText, Mic, Database } from 'lucide-react';

export interface Integration {
  id: string;
  name: string;
  logo: React.ReactNode;
  description: string;
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
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

export const premiumFeatures: PremiumFeature[] = [
  {
    id: 'elite-memory',
    name: 'Elite Memory',
    description: 'Memoria inteligente que guarda todo el historial conversacional y recuerda contexto automáticamente.',
    icon: <Brain className="h-5 w-5" />
  },
  {
    id: 'dashboard-pro',
    name: 'Dashboard Pro',
    description: 'Visualización avanzada de KPIs, comparativas por canal y análisis predictivo.',
    icon: <BarChart2 className="h-5 w-5" />
  },
  {
    id: 'omnichannel-layer',
    name: 'Omnichannel Layer',
    description: 'Integra Instagram DM, Messenger, Telegram, Email y SMS.',
    icon: <Share2 className="h-5 w-5" />
  },
  {
    id: 'notion-sync',
    name: 'Notion Sync',
    description: 'Sincronización bidireccional de tu base de datos en Notion con el agente.',
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: 'voice-to-action',
    name: 'Voice-to-Action API',
    description: 'Convierte comandos de voz en acciones directas dentro de tu CRM, calendario o integraciones.',
    icon: <Mic className="h-5 w-5" />
  },
  {
    id: 'smart-analytics',
    name: 'Smart Analytics',
    description: 'Análisis de datos avanzado con insights de comportamiento y predicción de necesidades de clientes.',
    icon: <Database className="h-5 w-5" />
  }
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
