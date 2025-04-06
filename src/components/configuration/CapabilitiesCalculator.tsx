
import React, { useState, useEffect } from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CapabilitiesCalculatorProps {
  selectedCapabilities: string[];
}

interface CapabilityPrice {
  id: string;
  price: number;
}

const CapabilitiesCalculator: React.FC<CapabilitiesCalculatorProps> = ({ 
  selectedCapabilities 
}) => {
  const [calculatedPrice, setCalculatedPrice] = useState({
    basePrice: 499,
    capabilitiesPrice: 0,
    totalPrice: 499
  });
  
  const [addedCapability, setAddedCapability] = useState<string | null>(null);
  const [removedCapability, setRemovedCapability] = useState<string | null>(null);

  // Define capability prices
  const capabilityPrices: CapabilityPrice[] = [
    { id: 'multi-language', price: 60 },
    { id: 'conversation-memory', price: 55 },
    { id: 'appointment-scheduling', price: 65 },
    { id: 'real-time-data', price: 70 },
    { id: 'whatsapp-integration', price: 75 },
    { id: 'follow-ups', price: 60 },
    { id: 'rescheduling', price: 65 },
    { id: 'database-search', price: 50 }
  ];

  // Calculate prices based on selected capabilities
  useEffect(() => {
    const basePrice = 499; // Base platform fee
    const maxTotalPrice = 999; // Maximum price cap
    
    // Calculate capability price through individual pricing
    let capabilitiesPrice = 0;
    selectedCapabilities.forEach(capId => {
      const capability = capabilityPrices.find(c => c.id === capId);
      if (capability) {
        capabilitiesPrice += capability.price;
      }
    });
    
    // Ensure the total price doesn't exceed the max
    const totalPrice = Math.min(basePrice + capabilitiesPrice, maxTotalPrice);
    
    setCalculatedPrice({
      basePrice,
      capabilitiesPrice,
      totalPrice
    });
    
  }, [selectedCapabilities]);

  // Track capability changes for animations
  useEffect(() => {
    const handleCapabilityChange = () => {
      const currentSet = new Set(selectedCapabilities);
      
      // Check for previous values to detect what changed
      if (addedCapability !== null || removedCapability !== null) {
        if (addedCapability && !currentSet.has(addedCapability)) {
          setRemovedCapability(addedCapability);
          setAddedCapability(null);
        } else if (removedCapability && currentSet.has(removedCapability)) {
          setAddedCapability(removedCapability);
          setRemovedCapability(null);
        }
      }
    };
    
    handleCapabilityChange();
  }, [selectedCapabilities]);

  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-6 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg bg-xelia-accent/20 text-xelia-accent mr-3">
          <CreditCard className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-medium text-white">Personaliza tu inversión</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 flex items-center">
              Tarifa base
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="w-3.5 h-3.5 ml-1 text-gray-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px] text-xs">
                  Tarifa mensual base que incluye las funcionalidades esenciales de Xelia
                </TooltipContent>
              </Tooltip>
            </span>
            <span className="text-white font-medium">${calculatedPrice.basePrice} USD</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 flex items-center">
              Capacidades adicionales ({selectedCapabilities.length})
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="w-3.5 h-3.5 ml-1 text-gray-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px] text-xs">
                  Costo adicional según las capacidades seleccionadas, con un máximo de $999 USD
                </TooltipContent>
              </Tooltip>
            </span>
            
            <div className="flex items-center">
              <AnimatePresence mode="wait">
                {addedCapability && (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xelia-accent font-medium text-xs absolute mr-12"
                  >
                    +${capabilityPrices.find(c => c.id === addedCapability)?.price || 0}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="text-white font-medium">${calculatedPrice.capabilitiesPrice} USD</span>
            </div>
          </div>
          
          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-300 font-medium">Precio mensual</span>
            <span className="text-white font-semibold text-xl">${calculatedPrice.totalPrice} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesCalculator;
