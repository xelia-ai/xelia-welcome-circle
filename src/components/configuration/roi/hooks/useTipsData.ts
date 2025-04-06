
import { useState, useEffect } from 'react';
import { Tip } from '../types';

export const useTipsData = (selectedCapabilities: string[]) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  
  // Define all available tips (limited to 3 as requested)
  const allTips: Tip[] = [
    {
      id: 'tip-1',
      text: 'La capacidad "Multilingüe" te permite duplicar tu alcance internacional y atender clientes globales sin barreras.',
      iconName: 'Zap',
      capabilities: ['multi-language']
    },
    {
      id: 'tip-2',
      text: 'Las empresas que integran WhatsApp con Xelia logran tasas de respuesta 5 veces más rápidas que la competencia.',
      iconName: 'TrendingUp',
      capabilities: ['whatsapp-integration']
    },
    {
      id: 'tip-3',
      text: 'La programación de citas automatizada reduce hasta un 80% el tiempo administrativo dedicado a esta tarea.',
      iconName: 'Zap',
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

  return {
    currentTipIndex,
    setCurrentTipIndex, // Explicitly return the setter function
    filteredTips,
    currentTip: filteredTips[currentTipIndex] || allTips[0] // Add fallback for empty state
  };
};
