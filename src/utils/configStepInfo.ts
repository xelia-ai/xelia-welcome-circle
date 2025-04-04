
import React from 'react';
import { Bot, Building2, Globe, Zap, Link, Settings } from 'lucide-react';

export type ConfigStep = 'agent-type' | 'industry' | 'website' | 'capabilities' | 'integrations' | 'summary';

export interface StepInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const stepInfo: Record<ConfigStep, StepInfo> = {
  'agent-type': {
    title: 'Elige el tipo de agente',
    description: 'Selecciona el tipo de agente IA que mejor se adapte a tus necesidades.',
    icon: React.createElement(Bot, { className: "w-5 h-5" })
  },
  'industry': {
    title: 'Selecciona tu industria',
    description: 'Personaliza tu agente según tu industria para obtener mejores resultados.',
    icon: React.createElement(Building2, { className: "w-5 h-5" })
  },
  'website': {
    title: 'Ingresa tu sitio web',
    description: 'Xelia analizará tu sitio web para ofrecer mejores respuestas.',
    icon: React.createElement(Globe, { className: "w-5 h-5" })
  },
  'capabilities': {
    title: 'Selecciona las capacidades',
    description: 'Elige las funcionalidades que necesita tu agente de IA.',
    icon: React.createElement(Zap, { className: "w-5 h-5" })
  },
  'integrations': {
    title: 'Configura integraciones',
    description: 'Conecta Xelia con tus herramientas y sistemas existentes.',
    icon: React.createElement(Link, { className: "w-5 h-5" })
  },
  'summary': {
    title: 'Resumen de configuración',
    description: 'Revisa tu configuración antes de finalizar.',
    icon: React.createElement(Settings, { className: "w-5 h-5" })
  }
};
