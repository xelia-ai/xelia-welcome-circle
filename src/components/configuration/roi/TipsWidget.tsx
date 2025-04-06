
import React, { useState, useEffect } from 'react';
import { Lightbulb, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
  
  // Define all available tips (limited to 3 as requested)
  const allTips: Tip[] = [
    {
      id: 'tip-1',
      text: 'La capacidad "Multilingüe" te permite duplicar tu alcance internacional y atender clientes globales sin barreras.',
      icon: <Zap className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['multi-language']
    },
    {
      id: 'tip-2',
      text: 'Las empresas que integran WhatsApp con Xelia logran tasas de respuesta 5 veces más rápidas que la competencia.',
      icon: <TrendingUp className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['whatsapp-integration']
    },
    {
      id: 'tip-3',
      text: 'La programación de citas automatizada reduce hasta un 80% el tiempo administrativo dedicado a esta tarea.',
      icon: <Zap className="h-8 w-8 text-xelia-accent" />,
      capabilities: ['appointment-scheduling']
    }
  ];

  // Filter tips based on selected capabilities
  useEffect(() => {
    let relevantTips = [];
    
    // Always include generic tips if no capabilities selected
    if (selectedCapabilities.length === 0) {
      relevantTips = allTips.slice(0, 3);
    } else {
      // Find tips relevant to selected capabilities
      const specificTips = allTips.filter(tip => 
        tip.capabilities.length > 0 && 
        tip.capabilities.some(cap => selectedCapabilities.includes(cap))
      );
      
      // If we don't have enough specific tips, add some generic ones
      if (specificTips.length < 3) {
        const genericTips = allTips.filter(tip => !specificTips.includes(tip));
        relevantTips = [...specificTips, ...genericTips].slice(0, 3);
      } else {
        relevantTips = specificTips.slice(0, 3);
      }
    }
    
    // Limit to exactly 3 tips as requested
    setFilteredTips(relevantTips.slice(0, 3));
    
    // Reset the tip index when capabilities change
    setCurrentTipIndex(0);
    
    // Set up automatic tip rotation
    const interval = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % Math.min(relevantTips.length, 3));
    }, 8000);
    
    return () => clearInterval(interval);
  }, [selectedCapabilities]);

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
      </CardContent>
    </Card>
  );
};

export default TipsWidget;
