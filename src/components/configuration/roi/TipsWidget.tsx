
import React, { useState, useEffect } from 'react';
import { Lightbulb, Zap, TrendingUp, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TipsWidgetProps {
  selectedCapabilities: string[];
}

interface Tip {
  id: string;
  text: string;
  icon: React.ReactNode;
  capabilities: string[];
}

const TipsWidget: React.FC<TipsWidgetProps> = ({ selectedCapabilities }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  
  // Define all available tips
  const allTips: Tip[] = [
    {
      id: 'tip-1',
      text: '¿Sabías que con la función de "Reprogramación Inteligente" puedes reducir un 40% tus ausencias a reuniones?',
      icon: <RefreshCw className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['rescheduling']
    },
    {
      id: 'tip-2',
      text: 'La capacidad "Multilingüe" te permite duplicar tu alcance internacional y atender clientes globales sin barreras.',
      icon: <Zap className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['multi-language']
    },
    {
      id: 'tip-3',
      text: 'Con "Memoria de conversaciones", Xelia recuerda detalles de clientes que vuelven, aumentando la personalización en un 30%.',
      icon: <Lightbulb className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['conversation-memory']
    },
    {
      id: 'tip-4',
      text: 'Las empresas que integran WhatsApp con Xelia logran tasas de respuesta 5 veces más rápidas que la competencia.',
      icon: <TrendingUp className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['whatsapp-integration']
    },
    {
      id: 'tip-5',
      text: 'El "Seguimiento automático" reduce en un 65% las oportunidades perdidas por falta de seguimiento oportuno.',
      icon: <Zap className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['follow-ups']
    },
    {
      id: 'tip-6',
      text: 'Los datos en tiempo real permiten que tu asistente tome decisiones 3 veces más precisas que los chatbots tradicionales.',
      icon: <Lightbulb className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['real-time-data']
    },
    {
      id: 'tip-7',
      text: 'Al integrar WhatsApp y programación de citas, puedes reducir tus tiempos de respuesta en más del 50%.',
      icon: <Zap className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['whatsapp-integration', 'appointment-scheduling']
    },
    {
      id: 'tip-8',
      text: 'Activar memoria de conversaciones mejora la personalización y fidelización en cada interacción.',
      icon: <Lightbulb className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['conversation-memory']
    },
    {
      id: 'tip-generic-1',
      text: 'Combinando 3 o más capacidades de Xelia, obtienes un asistente superior al 90% de soluciones del mercado.',
      icon: <TrendingUp className="h-8 w-8 text-xelia-accent" />,
      capabilities: []
    },
    {
      id: 'tip-generic-2',
      text: 'Activar más capacidades aumenta tu ventaja competitiva y el retorno de inversión estimado.',
      icon: <Zap className="h-8 w-8 text-xelia-accent" />,
      capabilities: []
    }
  ];

  // Filter tips based on selected capabilities
  useEffect(() => {
    // First, find tips that are specifically relevant to selected capabilities
    const relevantTips = allTips.filter(tip => 
      tip.capabilities.length === 0 || // Generic tips
      tip.capabilities.some(cap => selectedCapabilities.includes(cap)) || // Single capability tips
      (tip.capabilities.length > 1 && tip.capabilities.every(cap => selectedCapabilities.includes(cap))) // Multi-capability tips
    );
    
    // If no capabilities are selected, just show generic tips
    if (selectedCapabilities.length === 0) {
      setFilteredTips(allTips.filter(tip => tip.capabilities.length === 0));
    } else {
      setFilteredTips(relevantTips);
    }
    
    // Reset the tip index when capabilities change
    setCurrentTipIndex(0);
  }, [selectedCapabilities]);

  // Function to show the next tip
  const showNextTip = () => {
    if (filteredTips.length > 0) {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % filteredTips.length);
    }
  };

  // If no tips are available, return a default message
  if (filteredTips.length === 0) {
    return (
      <Card className="bg-gray-800/80 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] h-full">
        <CardContent className="p-6 flex flex-col h-full justify-center">
          <div className="text-center">
            <Lightbulb className="h-10 w-10 text-xelia-accent mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">¿Sabías que...?</h3>
            <p className="text-gray-300 text-sm">
              Selecciona capacidades para descubrir consejos y estrategias personalizadas.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentTip = filteredTips[currentTipIndex];

  return (
    <Card className="bg-gray-800/80 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] h-full transition-all duration-300 hover:border-white/15">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-lg bg-xelia-accent/20 mr-4 flex-shrink-0">
              {currentTip.icon}
            </div>
            <div>
              <h3 className="text-white text-lg font-medium mb-2">¿Sabías que...?</h3>
              <p className="text-gray-300 leading-relaxed">{currentTip.text}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-between items-center">
          <div className="text-xs text-gray-400">
            Tip {currentTipIndex + 1} de {filteredTips.length}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={showNextTip} 
            className="text-xs border-gray-600 hover:bg-gray-700 text-gray-300"
          >
            Siguiente tip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsWidget;
