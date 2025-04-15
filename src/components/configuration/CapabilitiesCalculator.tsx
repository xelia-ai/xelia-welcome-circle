
import React, { useState, useEffect } from 'react';
import { CreditCard, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CAPABILITIES } from '@/data/industries/common';

interface CapabilitiesCalculatorProps {
  selectedCapabilities: string[];
  industryCount?: number;
  volumePrice?: number;
}

const CapabilitiesCalculator: React.FC<CapabilitiesCalculatorProps> = ({ 
  selectedCapabilities,
  industryCount = 1,
  volumePrice = 0
}) => {
  const MAX_PRICE = 999;
  
  const [calculatedPrice, setCalculatedPrice] = useState({
    capabilitiesPrice: 0,
    industriesPrice: 0,
    volumePrice: 0,
    totalPrice: 0
  });
  
  const [addedCapability, setAddedCapability] = useState<string | null>(null);
  const [removedCapability, setRemovedCapability] = useState<string | null>(null);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  // Calculate prices based on selected capabilities and number of industries
  useEffect(() => {
    // Calculate industry price
    const industriesPrice = industryCount > 1 ? (industryCount - 1) * 50 : 0;
    
    // Calculate capabilities price through individual prices
    let capabilitiesPrice = 0;
    selectedCapabilities.forEach(capId => {
      const capability = CAPABILITIES.find(c => c.id === capId);
      if (capability) {
        capabilitiesPrice += capability.price;
      }
    });
    
    // Ensure total price does not exceed maximum
    const subtotal = capabilitiesPrice + industriesPrice + volumePrice;
    const totalPrice = Math.min(subtotal, MAX_PRICE);
    
    setCalculatedPrice({
      capabilitiesPrice,
      industriesPrice,
      volumePrice,
      totalPrice
    });
    
  }, [selectedCapabilities, industryCount, volumePrice]);

  // Track changes in capabilities for animations
  useEffect(() => {
    const currentSet = new Set(selectedCapabilities);
    
    // Determine which capability was added or removed
    const handleCapabilityChange = () => {
      // For new additions
      if (addedCapability !== null) {
        if (!currentSet.has(addedCapability)) {
          setRemovedCapability(addedCapability);
          setAddedCapability(null);
          setLastAddedName(null);
        }
      } else if (removedCapability !== null) {
        if (currentSet.has(removedCapability)) {
          setAddedCapability(removedCapability);
          
          // Get name to display in animation
          const capability = CAPABILITIES.find(c => c.id === removedCapability);
          if (capability) {
            setLastAddedName(capability.name);
          }
          
          setRemovedCapability(null);
        }
      } else {
        // Detect newly added capability
        const prevCount = selectedCapabilities.length - 1;
        if (prevCount >= 0 && selectedCapabilities.length > prevCount) {
          const lastAddedId = selectedCapabilities[selectedCapabilities.length - 1];
          setAddedCapability(lastAddedId);
          
          // Get name to display in animation
          const capability = CAPABILITIES.find(c => c.id === lastAddedId);
          if (capability) {
            setLastAddedName(capability.name);
          }
        }
      }
    };
    
    handleCapabilityChange();
  }, [selectedCapabilities]);

  // Determine fee status
  const isZeroAmount = calculatedPrice.totalPrice === 0;
  const hasCapabilities = selectedCapabilities.length > 0;

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
          {/* Additional industries section */}
          {industryCount > 1 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 flex items-center">
                Industrias adicionales ({industryCount - 1})
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="w-3.5 h-3.5 ml-1 text-gray-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[220px] text-xs">
                    Costo adicional por cada industria seleccionada después de la primera
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="text-white font-medium">${calculatedPrice.industriesPrice} USD</span>
            </div>
          )}
          
          {/* Selected capabilities section */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 flex items-center">
              Capacidades seleccionadas ({selectedCapabilities.length})
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="w-3.5 h-3.5 ml-1 text-gray-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px] text-xs">
                  Costo según las capacidades seleccionadas
                </TooltipContent>
              </Tooltip>
            </span>
            
            <div className="flex items-center">
              <AnimatePresence mode="wait">
                {addedCapability && (
                  <motion.div 
                    key="added-animation"
                    className="flex flex-col items-end mr-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span className="text-xelia-accent font-medium text-xs whitespace-nowrap">
                      + {lastAddedName}
                    </motion.span>
                    <motion.span className="text-xelia-accent font-medium text-xs">
                      +${CAPABILITIES.find(c => c.id === addedCapability)?.price || 0}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="text-white font-medium">${calculatedPrice.capabilitiesPrice} USD</span>
            </div>
          </div>
          
          {/* Volume calls section */}
          {volumePrice > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 flex items-center">
                Volumen de llamadas
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="w-3.5 h-3.5 ml-1 text-gray-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[220px] text-xs">
                    Costo adicional por el volumen de llamadas seleccionado
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="text-white font-medium">${calculatedPrice.volumePrice} USD</span>
            </div>
          )}
          
          {/* Total */}
          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-300 font-medium">Precio mensual</span>
            <span className="text-white font-semibold text-xl">${calculatedPrice.totalPrice} USD</span>
          </div>
        </div>

        {/* Information message when at $0 */}
        {!hasCapabilities && (
          <div className="mt-3 bg-[#FF5470]/10 rounded-lg p-3 border border-[#FF5470]/30">
            <p className="text-sm text-white/90 flex items-center">
              <AlertCircle className="mr-2 h-4 w-4 text-[#FF5470]" />
              Selecciona al menos una capacidad para continuar
            </p>
          </div>
        )}
        
        {calculatedPrice.totalPrice === MAX_PRICE && (
          <div className="mt-2 text-xs text-gray-400 italic text-right">
            *Precio máximo limitado a $999/mes
          </div>
        )}
      </div>
    </div>
  );
};

export default CapabilitiesCalculator;
