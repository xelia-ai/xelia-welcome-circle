export interface Capability {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export type CapabilityType = 'communication' | 'automation' | 'intelligence' | 'integrations';

export const capabilities = {
  communication: [
    {
      id: 'multilingual',
      name: 'Multilingüe',
      description: 'Responde a tus clientes en varios idiomas (español, inglés, portugués, etc.)',
      price: 60,
      icon: '🌍'
    },
    {
      id: 'live-chat',
      name: 'Chat en vivo',
      description: 'Permite a tus clientes chatear en tiempo real con un agente',
      price: 45,
      icon: '💬'
    },
    {
      id: 'social-media',
      name: 'Redes sociales',
      description: 'Integra tus redes sociales para responder a tus clientes desde un solo lugar',
      price: 50,
      icon: '📱'
    }
  ],
  automation: [
    {
      id: 'chatbot',
      name: 'Chatbot',
      description: 'Automatiza respuestas a preguntas frecuentes y libera a tus agentes',
      price: 75,
      icon: '🤖'
    },
    {
      id: 'workflows',
      name: 'Workflows',
      description: 'Crea flujos de trabajo automatizados para tareas repetitivas',
      price: 55,
      icon: '⚙️'
    },
    {
      id: 'notifications',
      name: 'Notificaciones',
      description: 'Envía notificaciones automáticas a tus clientes sobre eventos importantes',
      price: 40,
      icon: '🔔'
    }
  ],
  intelligence: [
    {
      id: 'sentiment-analysis',
      name: 'Análisis de sentimiento',
      description: 'Detecta el sentimiento de tus clientes para priorizar conversaciones',
      price: 80,
      icon: '😊'
    },
    {
      id: 'predictive-analysis',
      name: 'Análisis predictivo',
      description: 'Predice el comportamiento de tus clientes para ofrecerles una mejor experiencia',
      price: 90,
      icon: '🔮'
    },
    {
      id: 'personalization',
      name: 'Personalización',
      description: 'Personaliza la experiencia de tus clientes en base a sus datos',
      price: 70,
      icon: '👤'
    }
  ],
  integrations: [
    {
      id: 'crm-integration',
      name: 'Integración con CRM',
      description: 'Conecta Xelia con tu sistema CRM actual para mantener datos sincronizados',
      price: 65,
      icon: '🔄'
    },
    {
      id: 'payment-gateway',
      name: 'Pasarela de Pagos',
      description: 'Procesa pagos directamente desde las conversaciones con clientes',
      price: 70,
      icon: '💳'
    },
    {
      id: 'email-marketing',
      name: 'Email Marketing',
      description: 'Integra con plataformas de email marketing para campañas automatizadas',
      price: 55,
      icon: '📧'
    }
  ]
};

export const integrations = [
  {
    id: 'crm-integration',
    name: 'Integración con CRM',
    description: 'Conecta Xelia con tu sistema CRM actual para mantener datos sincronizados',
    price: 65,
    icon: '🔄'
  },
  {
    id: 'payment-gateway',
    name: 'Pasarela de Pagos',
    description: 'Procesa pagos directamente desde las conversaciones con clientes',
    price: 70,
    icon: '💳'
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Integra con plataformas de email marketing para campañas automatizadas',
    price: 55,
    icon: '📧'
  }
  // Removed Google Calendar integration
];
