
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
  // Calculate total price for premium features
  const premiumFeatureTotal = premiumFeaturesCount * pricePerPremiumFeature;
  
  // Calculate volume pricing
  const volumePrice = selectedVolumeOption && selectedVolumeOption !== '500' 
    ? volumePricing[selectedVolumeOption] || 0 
    : 0;
  
  // Ensure total doesn't exceed $999
  const totalPrice = calculateEstimatedPrice();
  const maxPrice = 999;
  const finalPrice = Math.min(totalPrice, maxPrice);

  return (
    <div className="py-4 mt-4 bg-gray-50 rounded-lg px-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Precio base</span>
        <span className="font-medium">${basePrice}/mes</span>
      </div>
      
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Funciones premium ({premiumFeaturesCount})</span>
        <span className="font-medium">+${premiumFeatureTotal}/mes</span>
      </div>
      
      {selectedVolumeOption && selectedVolumeOption !== '500' && (
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">
            Volumen adicional
          </span>
          <span className="font-medium">
            +${volumePrice}/mes
          </span>
        </div>
      )}
      
      <Separator className="my-3" />
      
      <div className="flex justify-between font-bold text-lg">
        <span>Total estimado</span>
        <span className="text-xelia-accent">${finalPrice}/mes</span>
      </div>
      
      {totalPrice > maxPrice && (
        <div className="mt-2 text-xs text-gray-500 italic text-right">
          *Precio máximo limitado a $999/mes
        </div>
      )}
    </div>
  );
};

export default PriceSummary;
