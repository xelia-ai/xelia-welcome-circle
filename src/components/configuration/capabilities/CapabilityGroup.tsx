
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
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
  // Calcular cuántas capacidades están seleccionadas en este grupo
  const selectedCount = capabilities.filter(cap => 
    selectedCapabilities.includes(cap.id)
  ).length;

  return (
    <Collapsible className="mb-6 rounded-lg border border-gray-700 overflow-hidden">
      <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-gray-700/50 border border-gray-600/50 text-gray-300">{icon}</div>
          <h4 className="text-lg font-medium text-white">{title}</h4>
          
          {selectedCount > 0 && (
            <span className="ml-2 bg-[#3EF3B0]/20 text-[#3EF3B0] text-xs font-medium px-2 py-1 rounded-full">
              {selectedCount} seleccionadas
            </span>
          )}
        </div>
        <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200 ui-expanded:rotate-180" />
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CapabilityGroup;
