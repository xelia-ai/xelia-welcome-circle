
import React from 'react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface WhatsappConnectionProps {
  isConnected: boolean;
  phoneNumber: string;
  connecting: boolean;
  onPhoneNumberChange: (value: string) => void;
  onConnect: () => void;
}

export const WhatsappConnection: React.FC<WhatsappConnectionProps> = ({
  isConnected,
  phoneNumber,
  connecting,
  onPhoneNumberChange,
  onConnect
}) => {
  if (isConnected) {
    return (
      <div className="flex items-center text-[#3EF3B0] text-sm">
        <IconBrandWhatsapp size={16} className="mr-2" />
        <span>WhatsApp Business conectado{phoneNumber ? `: ${phoneNumber}` : ''}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Número WhatsApp (+52...)"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          className="flex-1 bg-gray-700/70 border-gray-600 text-sm"
        />
        <Button 
          size="sm" 
          disabled={connecting || !phoneNumber}
          onClick={onConnect}
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
            className="text-xs text-gray-400 hover:text-gray-300 p-0 h-auto"
          >
            ¿Comprar línea de WhatsApp Business?
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-gray-700 border-gray-600">
          Te ayudamos a configurar tu línea oficial de WhatsApp Business
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
