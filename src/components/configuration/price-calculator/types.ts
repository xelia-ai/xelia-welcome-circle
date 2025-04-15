
export interface PriceBreakdown {
  capabilitiesPrice: number;
  industriesPrice: number;
  volumePrice: number;
  totalPrice: number;
}

export interface PriceAnimationState {
  addedCapability: string | null;
  removedCapability: string | null;
  lastAddedName: string | null;
}
