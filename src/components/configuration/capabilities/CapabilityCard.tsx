
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
import { InfoIcon } from 'lucide-react';
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
      className={cn(
        "bg-white dark:bg-gray-800/80 rounded-xl p-4 flex flex-col transition-all duration-200 h-full w-full md:w-[300px]",
        isSelected 
          ? "border-2 border-[#3EF3B0] shadow-md" 
          : "border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors",
            isSelected 
              ? "bg-[#3EF3B0] text-gray-900" 
              : "bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
          )}>
            {capability.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Label 
                htmlFor={`capability-${capability.id}`}
                className="text-gray-900 dark:text-white font-medium"
              >
                {capability.name}
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px]">
                  {capability.description}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        
        <Switch
          id={`capability-${capability.id}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(capability.id)}
          className="data-[state=checked]:bg-[#3EF3B0] data-[state=checked]:text-black"
        />
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {capability.description}
      </p>
      
      {capability.price > 0 && (
        <div className="mt-auto">
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs font-medium mb-2",
              isSelected 
                ? "bg-[#3EF3B0]/10 text-emerald-600 dark:text-[#3EF3B0] border-[#3EF3B0]/30" 
                : "bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600"
            )}
          >
            +${capability.price} USD
          </Badge>
        </div>
      )}
      
      {/* Connection interface - only show when capability is selected */}
      {isSelected && capability.hasConnection && (
        <div 
          className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 p-3 -mx-3 -mb-3"
        >
          <ConnectionInterface
            capability={capability}
            onIntegrationSelect={onIntegrationSelect}
          />
        </div>
      )}
    </div>
  );
};

export default CapabilityCard;
