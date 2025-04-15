
import React, { useState } from 'react';
import { Loader2, Link, Calendar, Phone } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Capability } from '../types';

interface ConnectionInterfaceProps {
  capability: Capability;
  onIntegrationSelect: (integrationId: string) => void;
}

export const ConnectionInterface: React.FC<ConnectionInterfaceProps> = ({
  capability,
  onIntegrationSelect
}) => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleConnect = () => {
    if (connected) {
      setConnected(false);
      return;
    }
    
    setConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      setConnected(true);
      setConnecting(false);
    }, 1500);
  };

  if (!capability.hasConnection) return null;
  
  switch (capability.connectionType) {
    case 'whatsapp':
      return (
        <div className="mt-3 space-y-2">
          {connected ? (
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
                  disabled={connecting || !phoneNumber}
                  onClick={handleConnect}
                  className="bg-[#25D366] hover:bg-[#22c35f] text-black"
                >
                  {connecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <IconBrandWhatsapp size={16} className="mr-2" />}
                  {connecting ? "Conectando..." : "Conectar"}
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
          <Select onValueChange={onIntegrationSelect}>
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
          variant={connected ? "outline" : "default"}
          onClick={handleConnect}
          disabled={connecting}
          className={cn(
            "mt-3",
            connected 
              ? "bg-transparent border-[#3EF3B0] text-[#3EF3B0] hover:text-[#3EF3B0]/80 hover:bg-[#3EF3B0]/10" 
              : "bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-transparent"
          )}
        >
          {connecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Link className="w-4 h-4 mr-2" />}
          {connecting ? "Conectando..." : "Conectar"}
        </Button>
      );
  }
};

export default ConnectionInterface;
