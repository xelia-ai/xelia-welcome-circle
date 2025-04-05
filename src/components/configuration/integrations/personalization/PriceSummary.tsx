
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface PriceSummaryProps {
  basePrice: number;
  premiumFeaturesCount: number;
  pricePerPremiumFeature: number;
  selectedVolumeOption: string | null;
  volumePricing: Record<string, number>;
  calculateEstimatedPrice: () => number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  basePrice,
  premiumFeaturesCount,
  pricePerPremiumFeature,
  selectedVolumeOption,
  volumePricing,
  calculateEstimatedPrice
}) => {
  return (
    <div className="py-4 mt-4 bg-gray-50 rounded-lg px-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Precio base</span>
        <span className="font-medium">${basePrice}/mes</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Funciones premium ({premiumFeaturesCount})</span>
        <span className="font-medium">+${premiumFeaturesCount * pricePerPremiumFeature}/mes</span>
      </div>
      {selectedVolumeOption && selectedVolumeOption !== '500' && (
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">
            Volumen adicional
          </span>
          <span className="font-medium">
            +${volumePricing[selectedVolumeOption] || 0}/mes
          </span>
        </div>
      )}
      <Separator className="my-3" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total estimado</span>
        <span className="text-xelia-accent">${calculateEstimatedPrice()}/mes</span>
      </div>
    </div>
  );
};

export default PriceSummary;
