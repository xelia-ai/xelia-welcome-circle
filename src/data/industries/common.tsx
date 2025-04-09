
import { ReactNode } from 'react';

export interface Industry {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  valuePoints: string[];
  detailedDescription: string;
}
