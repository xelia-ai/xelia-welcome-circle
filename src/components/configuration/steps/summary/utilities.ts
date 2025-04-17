
import { CAPABILITIES } from '@/data/industries/common';
import { getCommunicationCapabilities } from '../../capabilities/CommunicationCards';

// Get capability names with correct typing for SummaryStep
export const getCapabilityNames = (capabilityIds: string[]): Record<string, string> => {
  const capabilityMap: Record<string, string> = {};
  
  // Get all communication capabilities
  const communicationCapabilities = getCommunicationCapabilities();
  
  // Combine all capabilities
  const allCapabilities = [...CAPABILITIES, ...communicationCapabilities];
  
  // Create a map of capability IDs to names
  capabilityIds.forEach(id => {
    const capability = allCapabilities.find(cap => cap.id === id);
    if (capability) {
      capabilityMap[id] = capability.name;
    }
  });
  
  return capabilityMap;
};

// Get integration names with correct typing for SummaryStep
export const getIntegrationNames = (integrationIds: string[]): Record<string, string> => {
  const integrationMap: Record<string, string> = {};
  
  // Create a predefined map of integration IDs to names
  const integrationNameMap: Record<string, string> = {
    'whatsapp': 'WhatsApp',
    'calendly': 'Calendly',
    'google-calendar': 'Google Calendar',
    'zapier': 'Zapier',
    'make': 'Make',
    'hubspot': 'HubSpot',
    'salesforce': 'Salesforce',
    'zendesk': 'Zendesk',
    'shopify': 'Shopify',
    'woocommerce': 'WooCommerce'
  };
  
  // Map integration IDs to their names
  integrationIds.forEach(id => {
    if (integrationNameMap[id]) {
      integrationMap[id] = integrationNameMap[id];
    } else {
      // Fallback for unknown integrations
      integrationMap[id] = id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');
    }
  });
  
  return integrationMap;
};

// Calculate additional price based on industry count
export const calculateIndustriesPrice = (industryCount: number) => {
  let additionalPrice = 0;
  let description = "Industria principal";
  
  if (industryCount > 1) {
    additionalPrice = (industryCount - 1) * 15;
    description = `Industria principal + ${industryCount - 1} industria${industryCount > 2 ? 's' : ''} adicional${industryCount > 2 ? 'es' : ''}`;
  }
  
  return {
    additionalPrice,
    description
  };
};
