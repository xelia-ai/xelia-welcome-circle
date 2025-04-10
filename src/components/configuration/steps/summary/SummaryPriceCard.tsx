
import React from 'react';

interface SummaryPriceCardProps {
  basePrice: number;
  industryCount: number;
  additionalPrice: number;
  totalPrice: number;
}

const SummaryPriceCard: React.FC<SummaryPriceCardProps> = ({
  basePrice,
  industryCount,
  additionalPrice,
  totalPrice
}) => {
  return (
    <div className="mb-8 bg-gray-700/30 rounded-lg p-4">
      <h3 className="text-lg font-medium text-white mb-3">Resumen de precios</h3>
      <div className="space-y-2 text-gray-300">
        <div className="flex justify-between">
          <span>Plan base</span>
          <span>${basePrice}</span>
        </div>
        {industryCount > 1 && (
          <div className="flex justify-between">
            <span>Industrias adicionales ({industryCount - 1})</span>
            <span>+${additionalPrice}</span>
          </div>
        )}
        <div className="flex justify-between font-medium pt-2 border-t border-gray-600">
          <span>Total base</span>
          <span>${totalPrice}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          *Las capacidades adicionales se calculan en el siguiente paso
        </div>
      </div>
    </div>
  );
};

export default SummaryPriceCard;
