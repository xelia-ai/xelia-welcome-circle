
import React from 'react';
import { Brain, BarChart2, Share2, FileText, Mic, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from '@/components/ui/badge';
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
    },
    {
      id: 'smart-analytics',
      name: 'Smart Analytics',
      description: 'Análisis de datos avanzado con insights de comportamiento y predicción de necesidades de clientes.',
      icon: <Database className="h-5 w-5" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {features.map((feature) => {
        const isActive = selectedFeatures.includes(feature.id);
        return (
          <Card 
            key={feature.id} 
            className={cn(
              "bg-white cursor-pointer transition-all duration-300 flex flex-col h-full border",
              isActive ? "border-[#3EF3B0]" : "border-xelia-gray-light",
              "hover:shadow-md"
            )}
            onClick={() => onToggle(feature.id)}
          >
            <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
              <div className="flex gap-3 items-center">
                <span className={cn(
                  "p-2 rounded-md w-10 h-10 flex items-center justify-center",
                  isActive ? "bg-[#3EF3B0] text-white" : "bg-white text-xelia-gray-medium border border-xelia-gray-light"
                )}>
                  {feature.icon}
                </span>
                <div>
                  <CardTitle className="text-lg font-semibold text-xelia-gray-dark">{feature.name}</CardTitle>
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <Switch 
                  checked={isActive} 
                  onCheckedChange={() => onToggle(feature.id)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-xelia-gray-dark">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PremiumFeatures;
