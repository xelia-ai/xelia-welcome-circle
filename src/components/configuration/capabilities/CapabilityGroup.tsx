
import React from 'react';
import { Globe, Brain, Calendar, Database, Clock, RefreshCw, FileSearch, Mail } from 'lucide-react';
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
        <div className="p-1.5 rounded-md bg-white border border-xelia-gray-light text-xelia-gray-dark">{icon}</div>
        <h4 className="text-lg font-medium text-xelia-gray-dark">{title}</h4>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {capabilities.map((capability) => {
          const isSelected = selectedCapabilities.includes(capability.id);
          
          return (
            <div 
              key={capability.id}
              className={cn(
                "bg-white rounded-lg p-4 flex items-start transition-all duration-300 cursor-pointer hover:shadow-md border",
                isSelected ? "border-xelia-accent" : "border-xelia-gray-light"
              )}
              onClick={() => onToggle(capability.id)}
            >
              <div className="mr-4 mt-0.5">
                <div className={cn(
                  "p-2 rounded-full w-10 h-10 flex items-center justify-center",
                  isSelected ? "bg-xelia-accent text-white" : "bg-white border border-xelia-gray-light text-xelia-gray-medium"
                )}>
                  {capability.icon}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Label 
                      htmlFor={`capability-${capability.id}`}
                      className="text-xelia-gray-dark font-medium cursor-pointer"
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
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {isSelected ? 'Desactivar capacidad' : 'Activar capacidad'}
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <p className="text-sm text-xelia-gray-dark">{capability.description}</p>
                
                {capability.price > 0 && (
                  <div className="mt-2 flex justify-between items-center">
                    <div></div>
                    {isSelected && (
                      <Badge variant="outline" className="bg-white text-xelia-gray-dark border-xelia-gray-light text-xs">
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
