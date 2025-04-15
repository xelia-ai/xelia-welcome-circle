
import React from 'react';
import PriceCalculator from './price-calculator/PriceCalculator';

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
  return (
    <PriceCalculator
      selectedCapabilities={selectedCapabilities}
      industryCount={industryCount}
      volumePrice={volumePrice}
    />
  );
};

export default CapabilitiesCalculator;
