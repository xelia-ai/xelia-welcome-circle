
import React from 'react';
import { Globe, Brain, Calendar, Database, Clock, RefreshCw, FileSearch } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface Capability {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
}

interface CapabilityGroupProps {
  title: string;
  icon: React.ReactNode;
  capabilities: Capability[];
  selectedCapabilities: string[];
  onToggle: (capabilityId: string) => void;
}

const CapabilityGroup: React.FC<CapabilityGroupProps> = ({
  title,
  icon,
  capabilities,
  selectedCapabilities,
  onToggle
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-md bg-gray-700/80 text-xelia-accent">{icon}</div>
        <h4 className="text-lg font-medium text-white">{title}</h4>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {capabilities.map((capability) => {
          const isSelected = selectedCapabilities.includes(capability.id);
          
          return (
            <div 
              key={capability.id}
              className={cn(
                "bg-gray-800/80 border rounded-lg p-4 flex items-start transition-all duration-300",
                isSelected 
                  ? 'border-xelia-accent shadow-[0_0_15px_rgba(92,106,255,0.15)] bg-gradient-to-br from-gray-800/90 to-gray-700/70' 
                  : 'border-gray-700 hover:border-gray-500'
              )}
            >
              <div className="mr-4 mt-0.5">
                <div className={cn(
                  "p-2 rounded-full",
                  isSelected ? 'bg-xelia-accent/20 text-xelia-accent' : 'bg-gray-700 text-gray-300'
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
                    >
                      {capability.name}
                    </Label>
                    
                    {isSelected && (
                      <Badge variant="outline" className="ml-2 bg-xelia-accent/10 text-xelia-accent border-xelia-accent/30 text-xs">
                        ✓ Activado
                      </Badge>
                    )}
                  </div>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Switch
                        id={`capability-${capability.id}`}
                        checked={isSelected}
                        onCheckedChange={() => onToggle(capability.id)}
                        className={cn(
                          "data-[state=checked]:bg-xelia-accent",
                          isSelected ? "shadow-[0_0_8px_rgba(92,106,255,0.4)]" : ""
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {isSelected ? 'Desactivar capacidad' : 'Activar capacidad'}
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <p className="text-sm text-gray-400">{capability.description}</p>
                
                {capability.price > 0 && (
                  <div className="mt-2 flex justify-between items-center">
                    <div></div>
                    {isSelected && (
                      <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs animate-fade-in">
                        +${capability.price} USD
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CapabilityGroup;
