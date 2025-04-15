
import { ReactNode } from 'react';

export interface Capability {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  price: number;
  hasConnection?: boolean;
  connectionType?: 'whatsapp' | 'calendar' | 'other';
  integrationOptions?: Array<{ id: string; name: string; }>;
}
