
import { useState, useEffect } from 'react';
import { CAPABILITIES } from '@/data/industries/common';
import { PriceBreakdown, PriceAnimationState } from './types';

interface UsePriceCalculatorProps {
  selectedCapabilities: string[];
  industryCount?: number;
  volumePrice?: number;
}

export const usePriceCalculator = ({
  selectedCapabilities,
  industryCount = 1,
  volumePrice = 0
}: UsePriceCalculatorProps) => {
  const MAX_PRICE = 999;
  
  const [calculatedPrice, setCalculatedPrice] = useState<PriceBreakdown>({
    capabilitiesPrice: 0,
    industriesPrice: 0,
    volumePrice: 0,
    totalPrice: 0
  });
  
  const [animationState, setAnimationState] = useState<PriceAnimationState>({
    addedCapability: null,
    removedCapability: null,
    lastAddedName: null
  });

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
      const { addedCapability, removedCapability } = animationState;
      
      // For new additions
      if (addedCapability !== null) {
        if (!currentSet.has(addedCapability)) {
          setAnimationState({
            addedCapability: null,
            removedCapability: addedCapability,
            lastAddedName: null
          });
        }
      } else if (removedCapability !== null) {
        if (currentSet.has(removedCapability)) {
          const capability = CAPABILITIES.find(c => c.id === removedCapability);
          setAnimationState({
            addedCapability: removedCapability,
            removedCapability: null,
            lastAddedName: capability?.name || null
          });
        }
      } else {
        // Detect newly added capability
        const prevCount = selectedCapabilities.length - 1;
        if (prevCount >= 0 && selectedCapabilities.length > prevCount) {
          const lastAddedId = selectedCapabilities[selectedCapabilities.length - 1];
          const capability = CAPABILITIES.find(c => c.id === lastAddedId);
          
          setAnimationState({
            addedCapability: lastAddedId,
            removedCapability: null,
            lastAddedName: capability?.name || null
          });
        }
      }
    };
    
    handleCapabilityChange();
  }, [selectedCapabilities, animationState]);

  return {
    calculatedPrice,
    animationState,
    MAX_PRICE
  };
};
