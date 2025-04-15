
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import ConnectionInterface from './connection/ConnectionInterface';
import { Capability } from './types';

interface CapabilityCardProps {
  capability: Capability;
  isSelected: boolean;
  onToggle: (capabilityId: string) => void;
  onIntegrationSelect: (integrationId: string) => void;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  capability,
  isSelected,
  onToggle,
  onIntegrationSelect
}) => {
  return (
    <div 
      key={capability.id}
      className={cn(
        "bg-gray-800/80 rounded-lg p-4 flex flex-col transition-all duration-300 h-full",
        isSelected 
          ? "border border-[#3EF3B0]" 
          : "border border-gray-700 hover:border-gray-600"
      )}
    >
      <div className="flex items-start">
        <div className="mr-4 mt-0.5">
          <div className={cn(
            "p-2 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300",
            isSelected 
              ? "bg-[#3EF3B0] text-gray-900 shadow-[0_0_10px_rgba(62,243,176,0.3)]" 
              : "bg-gray-700/50 border border-gray-600 text-gray-300"
          )}>
            {capability.icon}
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Label 
                htmlFor={`capability-${capability.id}`}
                className="text-white font-medium cursor-pointer"
                onClick={() => onToggle(capability.id)}
              >
                {capability.name}
              </Label>
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  id={`capability-${capability.id}`}
                  checked={isSelected}
                  onCheckedChange={() => onToggle(capability.id)}
                  className="data-[state=checked]:bg-[#3EF3B0] data-[state=checked]:text-black"
                />
              </TooltipTrigger>
              <TooltipContent side="top">
                {isSelected ? 'Desactivar capacidad' : 'Activar capacidad'}
              </TooltipContent>
            </Tooltip>
          </div>
          
          <p className="text-sm text-gray-300">{capability.description}</p>
          
          <div className="mt-2 flex justify-between items-center">
            {capability.price > 0 && (
              <Badge variant="outline" className={cn(
                "text-xs transition-all duration-300 ml-auto",
                isSelected 
                  ? "bg-[#3EF3B0]/10 text-[#3EF3B0] border-[#3EF3B0]/30" 
                  : "bg-gray-700/50 text-gray-400 border-gray-600"
              )}>
                +${capability.price} USD
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Connection interface - only show when capability is selected */}
      {isSelected && (
        <ConnectionInterface
          capability={capability}
          onIntegrationSelect={onIntegrationSelect}
        />
      )}
    </div>
  );
};

export default CapabilityCard;
