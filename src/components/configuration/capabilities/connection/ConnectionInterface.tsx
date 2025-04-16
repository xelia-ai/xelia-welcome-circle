
import React, { useState } from 'react';
import { Loader2, Link, Calendar, Phone, Check, AlertCircle } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Capability } from '../types';
import { Badge } from '@/components/ui/badge';

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
  const [selectedIntegration, setSelectedIntegration] = useState<string>('');

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
      
      if (selectedIntegration) {
        onIntegrationSelect(selectedIntegration);
      }
    }, 1500);
  };

  const handleSelectIntegration = (value: string) => {
    setSelectedIntegration(value);
    onIntegrationSelect(value);
  };

  if (!capability.hasConnection) return null;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">INTEGRACIÓN</h4>
        {connected ? (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/30">
            <Check className="w-3 h-3 mr-1" /> Conectado
          </Badge>
        ) : (
          <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-600">
            <AlertCircle className="w-3 h-3 mr-1" /> No conectado
          </Badge>
        )}
      </div>

      {capability.connectionType === 'whatsapp' && (
        <div className="space-y-2">
          {connected ? (
            <div className="flex items-center text-emerald-600 dark:text-[#3EF3B0] text-sm">
              <IconBrandWhatsapp size={16} className="mr-2" />
              <span>WhatsApp Business conectado: {phoneNumber}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Número WhatsApp (+52...)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 bg-white dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 text-sm"
                />
                <Button 
                  size="sm" 
                  disabled={connecting || !phoneNumber}
                  onClick={handleConnect}
                  className="bg-[#25D366] hover:bg-[#22c35f] text-white"
                >
                  {connecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <IconBrandWhatsapp size={16} className="mr-2" />}
                  {connecting ? "Conectando..." : "Conectar"}
                </Button>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-0 h-auto"
                  >
                    ¿Comprar línea de WhatsApp Business?
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Te ayudamos a configurar tu línea oficial de WhatsApp Business
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      )}
      
      {capability.connectionType === 'calendar' && (
        <div className="space-y-2">
          <Select 
            onValueChange={handleSelectIntegration}
            value={selectedIntegration}
          >
            <SelectTrigger className="bg-white dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 text-sm">
              <SelectValue placeholder="Seleccionar calendario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google-calendar">Google Calendar</SelectItem>
              <SelectItem value="outlook">Outlook</SelectItem>
              <SelectItem value="calendly">Calendly</SelectItem>
              <SelectItem value="flireo">Flireo</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedIntegration && !connected && (
            <Button 
              size="sm" 
              onClick={handleConnect}
              disabled={connecting}
              className="w-full bg-[#3EF3B0]/20 text-emerald-600 dark:text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-transparent"
            >
              {connecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Calendar className="w-4 h-4 mr-2" />}
              {connecting ? "Conectando..." : "Conectar calendario"}
            </Button>
          )}
        </div>
      )}
      
      {capability.connectionType === 'other' && (
        <Button 
          size="sm" 
          variant={connected ? "outline" : "default"}
          onClick={handleConnect}
          disabled={connecting}
          className={cn(
            "w-full",
            connected 
              ? "bg-transparent border-[#3EF3B0] text-emerald-600 dark:text-[#3EF3B0] hover:text-emerald-700 dark:hover:text-[#3EF3B0]/80 hover:bg-[#3EF3B0]/10" 
              : "bg-[#3EF3B0]/20 text-emerald-600 dark:text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-transparent"
          )}
        >
          {connecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Link className="w-4 h-4 mr-2" />}
          {connecting ? "Conectando..." : connected ? "Desconectar" : "Conectar"}
        </Button>
      )}
    </div>
  );
};

export default ConnectionInterface;
