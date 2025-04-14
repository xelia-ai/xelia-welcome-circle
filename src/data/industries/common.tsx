
import { ReactNode } from 'react';

export interface Industry {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  valuePoints: string[];
  detailedDescription: string;
}

// Special industry that will appear in all tabs when needed
export const CUSTOM_INDUSTRY_ID = 'custom';
