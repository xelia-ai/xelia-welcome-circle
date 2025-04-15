
import React from 'react';
import { CreditCard, AlertCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { usePriceCalculator } from './usePriceCalculator';
import PriceBreakdownItem from './PriceBreakdownItem';
import PriceAnimation from './PriceAnimation';

interface PriceCalculatorProps {
  selectedCapabilities: string[];
  industryCount?: number;
  volumePrice?: number;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ 
  selectedCapabilities,
  industryCount = 1,
  volumePrice = 0
}) => {
  const { calculatedPrice, animationState, MAX_PRICE } = usePriceCalculator({
    selectedCapabilities,
    industryCount,
    volumePrice
  });
  
  // Determine capabilities status
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
            <PriceBreakdownItem
              label={`Industrias adicionales (${industryCount - 1})`}
              value={calculatedPrice.industriesPrice}
              tooltip="Costo adicional por cada industria seleccionada después de la primera"
            />
          )}
          
          {/* Selected capabilities section */}
          <PriceBreakdownItem
            label={`Capacidades seleccionadas (${selectedCapabilities.length})`}
            value={calculatedPrice.capabilitiesPrice}
            tooltip="Costo según las capacidades seleccionadas"
            animation={<PriceAnimation animationState={animationState} />}
          />
          
          {/* Volume calls section */}
          {volumePrice > 0 && (
            <PriceBreakdownItem
              label="Volumen de llamadas"
              value={calculatedPrice.volumePrice}
              tooltip="Costo adicional por el volumen de llamadas seleccionado"
            />
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

export default PriceCalculator;
