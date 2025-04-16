
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import CapabilityCard from './CapabilityCard';
import { Capability } from './types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CapabilityGroupProps {
  title: string;
  icon: React.ReactNode;
  capabilities: Capability[];
  selectedCapabilities: string[];
  selectedIntegrations: string[];
  onToggleCapability: (capabilityId: string) => void;
  onToggleIntegration: (integrationId: string) => void;
  isDefault?: boolean;
}

const CapabilityGroup: React.FC<CapabilityGroupProps> = ({
  title,
  icon,
  capabilities,
  selectedCapabilities,
  selectedIntegrations,
  onToggleCapability,
  onToggleIntegration,
  isDefault = false
}) => {
  // Calculate how many capabilities are selected in this group
  const selectedCount = capabilities.filter(cap => 
    selectedCapabilities.includes(cap.id)
  ).length;

  return (
    <Accordion 
      type="single" 
      collapsible 
      className="mb-4"
      defaultValue={isDefault ? "item-1" : undefined}
    >
      <AccordionItem 
        value="item-1" 
        className="rounded-xl overflow-hidden bg-gray-800/40 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all duration-300"
      >
        <AccordionTrigger 
          className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-md bg-gray-700/50 text-gray-300 border border-gray-600">
              {icon}
            </div>
            <h3 className="text-lg font-medium text-white">{title}</h3>
            
            {selectedCount > 0 && (
              <Badge className="ml-2 bg-[#3EF3B0]/20 text-[#3EF3B0] border-[#3EF3B0]/30">
                {selectedCount} seleccionadas
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        
        <AccordionContent className="transition-all duration-300 ease-in-out">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((capability) => (
              <CapabilityCard
                key={capability.id}
                capability={capability}
                isSelected={selectedCapabilities.includes(capability.id)}
                onToggle={onToggleCapability}
                onIntegrationSelect={onToggleIntegration}
                selectedIntegrations={selectedIntegrations}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CapabilityGroup;
