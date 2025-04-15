
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Loader2, Link, Calendar } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

export interface Capability {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  hasConnection?: boolean;
  connectionType?: 'whatsapp' | 'calendar' | 'other';
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
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>([]);

  const handleConnect = (capabilityId: string, connectionType: string) => {
    if (connected.includes(capabilityId)) {
      setConnected(prev => prev.filter(id => id !== capabilityId));
      return;
    }
    
    setConnecting(capabilityId);
    
    // Simular conexión
    setTimeout(() => {
      setConnected(prev => [...prev, capabilityId]);
      setConnecting(null);
    }, 1500);
  };

  const getConnectionButton = (capability: Capability) => {
    if (!capability.hasConnection) return null;
    
    const isConnecting = connecting === capability.id;
    const isConnected = connected.includes(capability.id);
    
    let icon = <Link className="w-4 h-4" />;
    let text = "Conectar";
    
    if (capability.connectionType === 'whatsapp') {
      icon = <IconBrandWhatsapp size={16} />;
      text = isConnected ? "Conectado a WhatsApp" : "Conectar WhatsApp";
    } else if (capability.connectionType === 'calendar') {
      icon = <Calendar className="w-4 h-4" />;
      text = isConnected ? "Calendario conectado" : "Conectar calendario";
    }
    
    return (
      <Button 
        size="sm" 
        variant={isConnected ? "outline" : "default"}
        onClick={() => handleConnect(capability.id, capability.connectionType || 'other')}
        disabled={isConnecting}
        className={cn(
          "mt-2",
          isConnected 
            ? "bg-transparent border-[#3EF3B0] text-[#3EF3B0] hover:text-[#3EF3B0]/80 hover:bg-[#3EF3B0]/10" 
            : "bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-transparent"
        )}
      >
        {isConnecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : icon}
        {isConnecting ? "Conectando..." : text}
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-md bg-gray-700/50 border border-gray-600/50 text-gray-300">{icon}</div>
        <h4 className="text-lg font-medium text-white">{title}</h4>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {capabilities.map((capability) => {
          const isSelected = selectedCapabilities.includes(capability.id);
          
          return (
            <div 
              key={capability.id}
              className={cn(
                "bg-gray-800/80 rounded-lg p-4 flex flex-col transition-all duration-300 cursor-pointer hover:shadow-[0_0_10px_rgba(62,243,176,0.1)]",
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
                    {isSelected && getConnectionButton(capability)}
                    
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CapabilityGroup;
