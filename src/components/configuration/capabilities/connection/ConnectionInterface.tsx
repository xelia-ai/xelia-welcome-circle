
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Capability } from '../types';
import { useConnection } from './hooks/useConnection';
import { WhatsappConnection } from './components/WhatsappConnection';
import { CalendarConnection } from './components/CalendarConnection';
import { DefaultConnection } from './components/DefaultConnection';

interface ConnectionInterfaceProps {
  capability: Capability;
  selectedIntegrations: string[];
  onIntegrationSelect: (integrationId: string) => void;
}

export const ConnectionInterface: React.FC<ConnectionInterfaceProps> = ({
  capability,
  selectedIntegrations,
  onIntegrationSelect
}) => {
  const {
    connecting,
    phoneNumber,
    setPhoneNumber,
    selectedIntegration,
    handleSelectIntegration,
    handleConnect,
    isConnected
  } = useConnection({
    connectionType: capability.connectionType,
    selectedIntegrations,
    onIntegrationSelect
  });

  if (!capability.hasConnection) return null;
  
  const connected = isConnected();
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-medium text-gray-400">INTEGRACIÓN</h4>
        {connected ? (
          <Badge className="bg-[#3EF3B0]/10 text-[#3EF3B0] border-[#3EF3B0]/30">
            <Check className="w-3 h-3 mr-1" /> Conectado
          </Badge>
        ) : (
          <Badge className="bg-gray-700 text-gray-400 border-gray-600">
            <AlertCircle className="w-3 h-3 mr-1" /> No conectado
          </Badge>
        )}
      </div>

      {capability.connectionType === 'whatsapp' && (
        <WhatsappConnection
          isConnected={connected}
          phoneNumber={phoneNumber}
          connecting={connecting}
          onPhoneNumberChange={setPhoneNumber}
          onConnect={handleConnect}
        />
      )}
      
      {capability.connectionType === 'calendar' && (
        <CalendarConnection
          isConnected={connected}
          selectedIntegration={selectedIntegration}
          connecting={connecting}
          onSelectIntegration={handleSelectIntegration}
          onConnect={handleConnect}
        />
      )}
      
      {capability.connectionType === 'other' && (
        <DefaultConnection
          isConnected={connected}
          connecting={connecting}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
};

export default ConnectionInterface;
