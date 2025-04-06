
import React, { useState, useEffect } from 'react';
import { Lightbulb, Zap, TrendingUp, RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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
  
  // Define all available tips (added 3 more tips as requested)
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
      id: 'tip-9',
      text: 'Las empresas con múltiples capacidades de Xelia activadas reportan un aumento del 27% en la tasa de cierre de ventas.',
      icon: <CheckCircle className="h-8 w-8 text-xelia-accent" />,
      capabilities: []
    },
    {
      id: 'tip-10',
      text: 'Integrar notas por correo al cliente aumenta la satisfacción y retención en un 45% comparado con seguimiento manual.',
      icon: <TrendingUp className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['email-notes']
    },
    {
      id: 'tip-11',
      text: 'La programación de citas automatizada reduce hasta un 80% el tiempo administrativo dedicado a esta tarea.',
      icon: <Zap className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['appointment-scheduling']
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
    },
    {
      id: 'tip-generic-3',
      text: 'Las empresas que utilizan Xelia para programar citas reportan un aumento del 40% en la puntualidad de los clientes.',
      icon: <CheckCircle className="h-8 w-8 text-xelia-accent" />,
      capabilities: []
    }
  ];

  // Filter tips based on selected capabilities
  useEffect(() => {
    let relevantTips = [];
    
    // Always include at least 3 tips
    if (selectedCapabilities.length === 0) {
      // Show generic tips if no capabilities selected
      relevantTips = allTips.filter(tip => tip.capabilities.length === 0);
    } else {
      // Find tips relevant to selected capabilities
      const specificTips = allTips.filter(tip => 
        tip.capabilities.length > 0 && 
        tip.capabilities.some(cap => selectedCapabilities.includes(cap))
      );
      
      // Add some generic tips
      const genericTips = allTips.filter(tip => tip.capabilities.length === 0);
      
      relevantTips = [...specificTips, ...genericTips];
    }
    
    // Ensure we have at least 3 tips by adding random ones if needed
    if (relevantTips.length < 3) {
      const remainingTips = allTips.filter(tip => !relevantTips.includes(tip));
      const additionalTips = remainingTips.slice(0, 3 - relevantTips.length);
      relevantTips = [...relevantTips, ...additionalTips];
    }
    
    // Limit to 3-5 tips for better UX
    setFilteredTips(relevantTips.slice(0, 5));
    
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTip.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentTip.icon}
                </motion.div>
              </AnimatePresence>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium mb-2">¿Sabías que...?</h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTip.id}
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentTip.text}
                </motion.p>
              </AnimatePresence>
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
            className="text-xs border-gray-600 hover:bg-gray-700 text-gray-300 flex items-center gap-1"
          >
            Siguiente tip
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsWidget;
