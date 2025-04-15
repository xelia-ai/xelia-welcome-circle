
import { ReactNode } from 'react';

export interface Industry {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  valuePoints: string[];
  detailedDescription: string;
}

// Special industry that will appear in all tabs when needed
export const CUSTOM_INDUSTRY_ID = 'custom';

// Configuración de capacidades y precios
export interface CapabilityOption {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'communication' | 'automation' | 'intelligence' | 'integration';
  hasConnection?: boolean;
  connectionType?: 'whatsapp' | 'calendar' | 'other';
}

export const CAPABILITY_CATEGORIES = {
  communication: 'Comunicación',
  automation: 'Automatización',
  intelligence: 'Inteligencia',
  integration: 'Integraciones'
};

export const CAPABILITIES: CapabilityOption[] = [
  // Comunicación
  {
    id: 'multi-language',
    name: 'Multilingüe',
    description: 'Responde a tus clientes en varios idiomas (español, inglés, portugués, etc.)',
    price: 60,
    category: 'communication'
  },
  {
    id: 'whatsapp-integration',
    name: 'Integración WhatsApp',
    description: 'Conecta tu Xelia directamente con WhatsApp para atención automática a clientes',
    price: 75,
    category: 'communication',
    hasConnection: true,
    connectionType: 'whatsapp'
  },
  {
    id: 'omnichannel',
    name: 'Conectividad Omnicanal',
    description: 'Integra chatbot, WhatsApp y asistente de voz en una sola plataforma',
    price: 85,
    category: 'communication'
  },
  
  // Automatización
  {
    id: 'appointment-scheduling',
    name: 'Programación de citas',
    description: 'Gestiona automáticamente la programación de citas y reuniones',
    price: 65,
    category: 'automation',
    hasConnection: true,
    connectionType: 'calendar'
  },
  {
    id: 'rescheduling',
    name: 'Reagendamiento automático',
    description: 'Permite a tus clientes reprogramar citas sin intervención humana',
    price: 60,
    category: 'automation'
  },
  {
    id: 'follow-ups',
    name: 'Seguimiento automático',
    description: 'Envía recordatorios y seguimientos automáticos a tus clientes',
    price: 60,
    category: 'automation'
  },
  {
    id: 'confirmation-whatsapp',
    name: 'Confirmación por WhatsApp',
    description: 'Envía confirmaciones automáticas de citas por WhatsApp',
    price: 55,
    category: 'automation',
    hasConnection: true,
    connectionType: 'whatsapp'
  },
  {
    id: 'meeting-links',
    name: 'Enlaces de reuniones',
    description: 'Envía automáticamente enlaces de reuniones por correo o agenda',
    price: 50,
    category: 'automation'
  },
  {
    id: 'email-notes',
    name: 'Notas por correo',
    description: 'Envía resúmenes de cada interacción por correo al responsable',
    price: 55,
    category: 'automation'
  },

  // Inteligencia
  {
    id: 'elite-memory',
    name: 'Memoria Elite',
    description: 'Almacena y analiza el historial completo de conversaciones para personalizar respuestas',
    price: 70,
    category: 'intelligence'
  },
  {
    id: 'conversation-memory',
    name: 'Memoria de conversaciones',
    description: 'Recuerda el contexto de las conversaciones anteriores para continuidad',
    price: 55,
    category: 'intelligence'
  },
  {
    id: 'database-search',
    name: 'Búsqueda en base de datos',
    description: 'Accede a información específica de tus bases de datos con autenticación segura',
    price: 65,
    category: 'intelligence'
  },
  {
    id: 'voice-assistant',
    name: 'Asistente de voz inteligente',
    description: 'Interactúa con clientes mediante voz y propone horarios disponibles',
    price: 80,
    category: 'intelligence'
  },
  {
    id: 'real-time-data',
    name: 'Datos en tiempo real',
    description: 'Accede y procesa datos actualizados para tomar decisiones inmediatas',
    price: 70,
    category: 'intelligence'
  },

  // Integraciones
  {
    id: 'dashboard-integration',
    name: 'Integración con Dashboard',
    description: 'Conecta Xelia con tu dashboard para visualización de datos y análisis',
    price: 65,
    category: 'integration',
    hasConnection: true,
    connectionType: 'other'
  },
  {
    id: 'crm-integration',
    name: 'Integración con CRM',
    description: 'Conecta con GoHighLevel, HubSpot y otros CRMs populares',
    price: 75,
    category: 'integration',
    hasConnection: true,
    connectionType: 'other'
  },
  {
    id: 'google-calendar',
    name: 'Integración con Google Calendar',
    description: 'Sincroniza citas y eventos directamente con Google Calendar',
    price: 55,
    category: 'integration',
    hasConnection: true,
    connectionType: 'calendar'
  }
];
