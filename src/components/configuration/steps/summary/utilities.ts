
// Utility functions for the summary step

export const getCapabilityNames = (capabilities: string[]): string[] => {
  const capabilityMap: Record<string, string> = {
    'multi-language': 'Multilingüe',
    'conversation-memory': 'Memoria de conversaciones',
    'appointment-scheduling': 'Programación de citas',
    'real-time-data': 'Datos en tiempo real',
    'whatsapp-integration': 'Integración con WhatsApp',
    'follow-ups': 'Seguimiento automático',
    'rescheduling': 'Reprogramación inteligente',
    'database-search': 'Búsqueda en base de datos'
  };
  
  return capabilities.map(id => capabilityMap[id] || id);
};

export const getIntegrationNames = (integrations: string[]): string[] => {
  const integrationMap: Record<string, string> = {
    'whatsapp': 'WhatsApp',
    'google-calendar': 'Google Calendar',
    'hubspot': 'HubSpot CRM',
    'zapier': 'Zapier',
    'slack': 'Slack',
    'salesforce': 'Salesforce'
  };
  
  return integrations.map(id => integrationMap[id] || id);
};

export const calculateIndustriesPrice = (industryCount: number) => {
  const basePrice = 499;
  
  // Precios adicionales por cada industria después de la primera
  let additionalPrice = 0;
  if (industryCount > 1) {
    additionalPrice = (industryCount - 1) * 50; // $50 por cada industria adicional
  }
  
  return {
    basePrice,
    additionalPrice,
    totalPrice: basePrice + additionalPrice
  };
};
