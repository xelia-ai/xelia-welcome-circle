
import React from 'react';

interface PricingSummaryProps {
  basePrice: number;
  industryCount: number;
  industryPrice: number;
  capabilitiesPrice: number;
  totalPrice: number;
}

const PricingSummary: React.FC<PricingSummaryProps> = ({
  basePrice,
  industryCount,
  industryPrice,
  capabilitiesPrice,
  totalPrice
}) => {
  return (
    <div className="bg-xelia-dark/50 p-4 rounded-lg">
      <h4 className="font-medium text-white mb-2">Resumen de tu plan:</h4>
      <div className="flex justify-between mb-2">
        <span className="text-gray-300">Plan base</span>
        <span className="text-white">${basePrice} USD</span>
      </div>
      {industryCount > 1 && (
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Industrias adicionales ({industryCount - 1})</span>
          <span className="text-white">${industryPrice} USD</span>
        </div>
      )}
      <div className="flex justify-between mb-2">
        <span className="text-gray-300">Capacidades adicionales</span>
        <span className="text-white">${capabilitiesPrice} USD</span>
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-700">
        <span className="font-medium text-white">Total mensual</span>
        <span className="font-bold text-white">${totalPrice} USD</span>
      </div>
    </div>
  );
};

export default PricingSummary;
