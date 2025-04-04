
import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';

interface CapabilitiesCalculatorProps {
  selectedCapabilities: string[];
}

const CapabilitiesCalculator: React.FC<CapabilitiesCalculatorProps> = ({ 
  selectedCapabilities 
}) => {
  const [calculatedPrice, setCalculatedPrice] = useState({
    basePrice: 499,
    capabilitiesPrice: 0,
    totalPrice: 499
  });

  // Calculate prices based on selected capabilities
  useEffect(() => {
    // Each capability adds some price to the base
    const capabilityPrice = 83; // Each capability costs approximately $83 to reach $999 max with 6 capabilities
    const maxCapabilitiesPrice = 500; // Maximum additional cost for all capabilities
    
    const capabilitiesCount = selectedCapabilities.length;
    const calculatedCapabilitiesPrice = Math.min(capabilityPrice * capabilitiesCount, maxCapabilitiesPrice);
    
    // Round prices to whole numbers
    const capabilitiesPriceRounded = Math.round(calculatedCapabilitiesPrice);
    const basePrice = 499; // Base platform fee
    const totalPrice = Math.min(basePrice + capabilitiesPriceRounded, 999); // Cap at $999
    
    setCalculatedPrice({
      basePrice,
      capabilitiesPrice: capabilitiesPriceRounded,
      totalPrice
    });
    
  }, [selectedCapabilities]);

  return (
    <div className="frosted-glass rounded-xl p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-lg bg-xelia-accent/20 text-xelia-accent mr-3">
          <CreditCard className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-medium text-white">Calculadora de precio</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-xelia-light/30 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Tarifa base</span>
            <span className="text-white font-medium">${calculatedPrice.basePrice} USD</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">
              Capacidades adicionales ({selectedCapabilities.length})
            </span>
            <span className="text-white font-medium">${calculatedPrice.capabilitiesPrice} USD</span>
          </div>
          
          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-300 font-medium">Precio mensual</span>
            <span className="text-white font-semibold">${calculatedPrice.totalPrice} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesCalculator;
