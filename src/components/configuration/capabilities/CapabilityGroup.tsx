
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Loader2, Link, Calendar, Phone } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export interface Capability {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  hasConnection?: boolean;
  connectionType?: 'whatsapp' | 'calendar' | 'other';
  integrationOptions?: Array<{ id: string; name: string; }>;
}

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
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleConnect = (capabilityId: string, connectionType: string) => {
    if (connected.includes(capabilityId)) {
      setConnected(prev => prev.filter(id => id !== capabilityId));
      return;
    }
    
    setConnecting(capabilityId);
    
    // Simulate connection
    setTimeout(() => {
      setConnected(prev => [...prev, capabilityId]);
      setConnecting(null);
    }, 1500);
  };

  const handleIntegrationSelect = (integrationId: string) => {
    onToggleIntegration(integrationId);
  };

  const getConnectionInterface = (capability: Capability) => {
    if (!capability.hasConnection) return null;
    
    const isConnecting = connecting === capability.id;
    const isConnected = connected.includes(capability.id);
    
    switch (capability.connectionType) {
      case 'whatsapp':
        return (
          <div className="mt-3 space-y-2">
            {isConnected ? (
              <div className="flex items-center text-[#3EF3B0]">
                <IconBrandWhatsapp size={16} className="mr-2" />
                <span>WhatsApp conectado</span>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <Input
                    placeholder="Número WhatsApp (+52...)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 bg-gray-700/70 border-gray-600"
                  />
                  <Button 
                    size="sm" 
                    disabled={isConnecting || !phoneNumber}
                    onClick={() => handleConnect(capability.id, 'whatsapp')}
                    className="bg-[#25D366] hover:bg-[#22c35f] text-black"
                  >
                    {isConnecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <IconBrandWhatsapp size={16} className="mr-2" />}
                    {isConnecting ? "Conectando..." : "Conectar"}
                  </Button>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs text-gray-400 hover:text-gray-300 p-0 h-auto"
                >
                  ¿Comprar línea de WhatsApp Business?
                </Button>
              </>
            )}
          </div>
        );
        
      case 'calendar':
        return (
          <div className="mt-3">
            <Select onValueChange={handleIntegrationSelect}>
              <SelectTrigger className="bg-gray-700/70 border-gray-600">
                <SelectValue placeholder="Seleccionar calendario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google-calendar">Google Calendar</SelectItem>
                <SelectItem value="outlook">Outlook</SelectItem>
                <SelectItem value="calendly">Calendly</SelectItem>
                <SelectItem value="flireo">Flireo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
        
      default:
        return (
          <Button 
            size="sm" 
            variant={isConnected ? "outline" : "default"}
            onClick={() => handleConnect(capability.id, capability.connectionType || 'other')}
            disabled={isConnecting}
            className={cn(
              "mt-3",
              isConnected 
                ? "bg-transparent border-[#3EF3B0] text-[#3EF3B0] hover:text-[#3EF3B0]/80 hover:bg-[#3EF3B0]/10" 
                : "bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-transparent"
            )}
          >
            {isConnecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Link className="w-4 h-4 mr-2" />}
            {isConnecting ? "Conectando..." : "Conectar"}
          </Button>
        );
    }
  };

  return (
    <AccordionItem value={title} className="border-b border-gray-700 mb-4">
      <AccordionTrigger className="py-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-gray-700/50 border border-gray-600/50 text-gray-300">{icon}</div>
          <h4 className="text-lg font-medium text-white">{title}</h4>
        </div>
      </AccordionTrigger>
      
      <AccordionContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-3">
          {capabilities.map((capability) => {
            const isSelected = selectedCapabilities.includes(capability.id);
            
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
                          onClick={() => onToggleCapability(capability.id)}
                        >
                          {capability.name}
                        </Label>
                      </div>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Switch
                            id={`capability-${capability.id}`}
                            checked={isSelected}
                            onCheckedChange={() => onToggleCapability(capability.id)}
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
                {isSelected && getConnectionInterface(capability)}
              </div>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CapabilityGroup;
