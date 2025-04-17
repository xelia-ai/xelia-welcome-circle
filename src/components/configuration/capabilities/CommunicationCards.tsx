
import React from 'react';
import { MessageSquare, Radio, Globe, MessageCircle } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Capability } from './types';

export const getCommunicationCapabilities = (): Capability[] => {
  return [
    {
      id: 'multi-language',
      name: 'Multilingüe',
      description: 'Responde a tus clientes en varios idiomas (español, inglés, portugués, etc.)',
      icon: <Globe className="w-5 h-5" />,
      price: 60,
      hasConnection: false
    },
    {
      id: 'whatsapp-integration',
      name: 'Integración WhatsApp',
      description: 'Conecta tu Xelia directamente con WhatsApp para atención automática a clientes',
      icon: <IconBrandWhatsapp size={20} />,
      price: 75,
      hasConnection: true,
      connectionType: 'whatsapp',
      integrationOptions: [{ id: 'whatsapp', name: 'WhatsApp' }]
    },
    {
      id: 'omnichannel',
      name: 'Conectividad Omnicanal',
      description: 'Integra chatbot, WhatsApp y asistente de voz en una sola plataforma',
      icon: <Radio className="w-5 h-5" />,
      price: 85,
      hasConnection: true,
      connectionType: 'other',
      integrationOptions: []
    },
    {
      id: 'smart-responses',
      name: 'Respuestas Inteligentes',
      description: 'Personaliza respuestas automáticas basadas en el historial de conversación y contexto del cliente',
      icon: <MessageCircle className="w-5 h-5" />,
      price: 65,
      hasConnection: false
    }
  ];
};
