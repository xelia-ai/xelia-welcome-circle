
import React from 'react';
import { Bot, Building2, FileText, Zap, Link, Settings, Sparkles } from 'lucide-react';

export type ConfigStep = 'agent-type' | 'industry' | 'website' | 'capabilities' | 'summary';

export interface StepInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const stepInfo: Record<ConfigStep, StepInfo> = {
  'agent-type': {
    title: 'Agente',
    description: 'Selecciona el tipo de Xelia que mejor se adapte a las necesidades de tu empresa.',
    icon: React.createElement(Sparkles, { className: "w-5 h-5" })
  },
  'industry': {
    title: 'Selecciona tu industria',
    description: 'Personaliza tu Xelia según tu industria para obtener mejores resultados.',
    icon: React.createElement(Building2, { className: "w-5 h-5" })
  },
  'website': {
    title: 'Entrenar a Xelia',
    description: 'Sube documentos o ingresa tu sitio web para entrenar a Xelia con tu información.',
    icon: React.createElement(FileText, { className: "w-5 h-5" })
  },
  'capabilities': {
    title: 'Selecciona las capacidades',
    description: 'Elige las funcionalidades que necesita tu Xelia para potenciar tu negocio.',
    icon: React.createElement(Zap, { className: "w-5 h-5" })
  },
  'summary': {
    title: 'Demo',
    description: 'Revisa tu configuración antes de finalizar.',
    icon: React.createElement(Settings, { className: "w-5 h-5" })
  }
};
