
import React from 'react';
import { Brain, BarChart2, Share2, FileText, Mic } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from '@/lib/utils';

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface PremiumFeaturesProps {
  selectedFeatures: string[];
  onToggle: (featureId: string) => void;
}

const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ selectedFeatures, onToggle }) => {
  const features: PremiumFeature[] = [
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
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature) => {
        const isActive = selectedFeatures.includes(feature.id);
        return (
          <Card 
            key={feature.id} 
            className={cn(
              "bg-gray-800/60 border transition-all duration-300 hover:shadow-lg", 
              isActive 
                ? "border-xelia-accent shadow-[0_0_15px_rgba(92,106,255,0.3)]" 
                : "border-gray-700"
            )}
          >
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div className="flex gap-2 items-center">
                <span className={cn(
                  "p-2 rounded-md", 
                  isActive ? "bg-xelia-accent text-white" : "bg-gray-700 text-gray-300"
                )}>
                  {feature.icon}
                </span>
                <CardTitle className="text-lg font-semibold text-white">{feature.name}</CardTitle>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-gray-400">{isActive ? 'Activado' : 'Desactivado'}</span>
                <Switch 
                  checked={isActive} 
                  onCheckedChange={() => onToggle(feature.id)}
                  className={isActive ? "bg-xelia-accent" : ""}
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PremiumFeatures;
