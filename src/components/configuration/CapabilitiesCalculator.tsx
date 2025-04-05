
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
    const basePrice = 499; // Base platform fee
    const maxTotalPrice = 999; // Maximum price cap
    
    // Calculate the capabilities price based on number of selected capabilities
    // to reach exactly $999 when all capabilities are selected
    const totalCapabilities = 8; // Total number of capabilities
    const maxCapabilitiesPrice = maxTotalPrice - basePrice; // $500
    
    let capabilitiesPrice = 0;
    if (selectedCapabilities.length > 0) {
      const pricePerCapability = maxCapabilitiesPrice / totalCapabilities;
      capabilitiesPrice = Math.round(pricePerCapability * selectedCapabilities.length);
    }
    
    // Ensure the total price doesn't exceed the max
    const totalPrice = Math.min(basePrice + capabilitiesPrice, maxTotalPrice);
    
    setCalculatedPrice({
      basePrice,
      capabilitiesPrice,
      totalPrice
    });
    
  }, [selectedCapabilities]);

  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg bg-xelia-accent/20 text-xelia-accent mr-3">
          <CreditCard className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-medium text-white">Calculadora de precio</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
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
