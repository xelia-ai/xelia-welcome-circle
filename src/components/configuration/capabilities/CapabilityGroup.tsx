
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import CapabilityCard from './CapabilityCard';
import { Capability } from './types';

interface CapabilityGroupProps {
  title: string;
  icon: React.ReactNode;
  capabilities: Capability[];
  selectedCapabilities: string[];
  selectedIntegrations: string[];
  onToggleCapability: (capabilityId: string) => void;
  onToggleIntegration: (integrationId: string) => void;
}

const CapabilityGroup: React.FC<CapabilityGroupProps> = ({
  title,
  icon,
  capabilities,
  selectedCapabilities,
  selectedIntegrations,
  onToggleCapability,
  onToggleIntegration
}) => {
  return (
    <Accordion type="single" collapsible className="mb-4">
      <AccordionItem value={title} className="border-b border-gray-700">
        <AccordionTrigger className="py-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-gray-700/50 border border-gray-600/50 text-gray-300">{icon}</div>
            <h4 className="text-lg font-medium text-white">{title}</h4>
          </div>
        </AccordionTrigger>
        
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-3">
            {capabilities.map((capability) => (
              <CapabilityCard
                key={capability.id}
                capability={capability}
                isSelected={selectedCapabilities.includes(capability.id)}
                onToggle={onToggleCapability}
                onIntegrationSelect={onToggleIntegration}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CapabilityGroup;
