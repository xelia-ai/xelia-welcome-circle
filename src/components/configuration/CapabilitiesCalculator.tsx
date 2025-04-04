
import React, { useState, useEffect } from 'react';
import { CreditCard, PlusCircle, ListChecks } from 'lucide-react';

interface CapabilitiesCalculatorProps {
  selectedCapabilities: string[];
}

const CapabilitiesCalculator: React.FC<CapabilitiesCalculatorProps> = ({ 
  selectedCapabilities 
}) => {
  const [callsPerMonth, setCallsPerMonth] = useState<100 | 200 | 300 | 400>(100);
  const [calculatedPrice, setCalculatedPrice] = useState({
    basePrice: 70,
    callsPrice: 22.78,
    integrationsPrice: 0,
    totalPrice: 92.78,
    suggestedPrice: 132.55
  });

  // Calculate prices based on selected capabilities and calls per month
  useEffect(() => {
    // Map capability count to integrations count (simplification)
    const integrationsCount = Math.min(Math.ceil(selectedCapabilities.length / 2), 4);
    
    let integrationsPrice = 0;
    if (integrationsCount >= 2) integrationsPrice = 50;
    if (integrationsCount >= 3) integrationsPrice = 149;
    if (integrationsCount >= 4) integrationsPrice = 298;
    
    const callsPriceMap = {
      100: 22.78,
      200: 45.57,
      300: 68.35,
      400: 91.14
    };
    
    const callsPrice = callsPriceMap[callsPerMonth];
    const basePrice = 70; // Base platform fee
    const totalPrice = basePrice + callsPrice + integrationsPrice;
    const suggestedPrice = totalPrice * 1.43; // 30% margin
    
    setCalculatedPrice({
      basePrice,
      callsPrice,
      integrationsPrice,
      totalPrice,
      suggestedPrice
    });
    
  }, [selectedCapabilities, callsPerMonth]);

  return (
    <div className="frosted-glass rounded-xl p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-lg bg-xelia-accent/20 text-xelia-accent mr-3">
          <CreditCard className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-medium text-white">Calculadora de precio</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            Conversaciones / mes
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[100, 200, 300, 400].map((value) => (
              <button
                key={value}
                onClick={() => setCallsPerMonth(value as 100 | 200 | 300 | 400)}
                className={`py-2 text-sm rounded-lg transition-all ${
                  callsPerMonth === value
                    ? 'bg-xelia-accent text-white'
                    : 'bg-xelia-light/60 text-gray-300 hover:bg-xelia-light'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-xelia-light/30 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Tarifa base</span>
            <span className="text-white font-medium">${calculatedPrice.basePrice.toFixed(2)} USD</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Conversaciones ({callsPerMonth}/mes)</span>
            <span className="text-white font-medium">${calculatedPrice.callsPrice.toFixed(2)} USD</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">
              Integraciones ({Math.min(Math.ceil(selectedCapabilities.length / 2), 4)})
            </span>
            <span className="text-white font-medium">${calculatedPrice.integrationsPrice.toFixed(2)} USD</span>
          </div>
          
          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-300 font-medium">Costo total</span>
            <span className="text-white font-semibold">${calculatedPrice.totalPrice.toFixed(2)} USD</span>
          </div>
        </div>
        
        <div className="bg-xelia-accent/10 rounded-lg p-4 border border-xelia-accent/30">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xelia-accent text-sm font-medium block">Precio sugerido de reventa</span>
              <span className="text-xs text-gray-400">(con margen de 30%)</span>
            </div>
            <span className="text-xelia-accent font-bold text-xl">${calculatedPrice.suggestedPrice.toFixed(2)} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesCalculator;
