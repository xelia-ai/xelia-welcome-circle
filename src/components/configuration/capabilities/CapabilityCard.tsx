
import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { InfoIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConnectionInterface from './connection/ConnectionInterface';
import { Capability } from './types';

interface CapabilityCardProps {
  capability: Capability;
  isSelected: boolean;
  selectedIntegrations: string[];
  onToggle: (capabilityId: string) => void;
  onIntegrationSelect: (integrationId: string) => void;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  capability,
  isSelected,
  selectedIntegrations,
  onToggle,
  onIntegrationSelect
}) => {
  return (
    <div 
      className={cn(
        "backdrop-blur-sm bg-gray-800/70 rounded-xl p-4 flex flex-col transition-all duration-300 h-full w-full",
        isSelected 
          ? "border-2 border-[#3EF3B0] shadow-[0_0_15px_rgba(62,243,176,0.15)]" 
          : "border border-gray-700 hover:border-gray-600"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors",
            isSelected 
              ? "bg-[#3EF3B0]/20 text-[#3EF3B0] border border-[#3EF3B0]/50" 
              : "bg-gray-700/50 text-gray-300 border border-gray-600"
          )}>
            {capability.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-medium">
                {capability.name}
              </h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px] bg-gray-700 border-gray-600">
                  {capability.description}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">
        {capability.description}
      </p>
      
      <div className="mt-auto flex items-center justify-between">
        {capability.price > 0 && (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs font-medium",
              isSelected 
                ? "bg-[#3EF3B0]/10 text-[#3EF3B0] border-[#3EF3B0]/30" 
                : "bg-gray-700/50 text-gray-400 border-gray-600"
            )}
          >
            +${capability.price} USD
          </Badge>
        )}
        
        <Button
          size="sm"
          onClick={() => onToggle(capability.id)}
          variant={isSelected ? "outline" : "default"}
          className={cn(
            "ml-auto min-w-[100px] transition-all duration-300",
            isSelected 
              ? "bg-[#3EF3B0]/20 border-[#3EF3B0]/50 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 hover:text-[#3EF3B0]" 
              : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
          )}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-1" /> Activado
            </>
          ) : "Activar"}
        </Button>
      </div>
      
      {/* Connection interface - only show when capability is selected */}
      {isSelected && capability.hasConnection && (
        <div 
          className="mt-4 pt-4 border-t border-gray-700"
        >
          <ConnectionInterface
            capability={capability}
            onIntegrationSelect={onIntegrationSelect}
            selectedIntegrations={selectedIntegrations}
          />
        </div>
      )}
    </div>
  );
};

export default CapabilityCard;
