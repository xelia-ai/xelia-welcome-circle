
import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntegrationCardProps {
  id: string;
  name: string;
  logo: React.ReactNode;
  description: string;
  status: 'connected' | 'connecting' | 'not-connected';
  onConnect: (id: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  id,
  name,
  logo,
  description,
  status,
  onConnect,
}) => {
  return (
    <div 
      className="bg-[#1F1F2B] border border-gray-700 rounded-lg p-5 transition-all duration-300 hover:bg-gray-700/50 cursor-pointer"
      onClick={() => onConnect(id)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center mr-3">{logo}</div>
          <h3 className="text-lg font-medium text-white">{name}</h3>
        </div>
        {status === 'connected' && (
          <span className="text-[#3EF3B0] text-sm flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Conectado
          </span>
        )}
      </div>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <Button 
        variant={status === 'connected' ? 'outline' : 'default'}
        size="sm" 
        className={status === 'connected' 
          ? 'border-[#3EF3B0]/50 text-[#3EF3B0] hover:text-[#3EF3B0]/80' 
          : 'bg-xelia-accent hover:bg-xelia-accent/90'
        }
        disabled={status === 'connecting'}
      >
        {status === 'connecting' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {status === 'connected' ? 'Desconectar' : status === 'connecting' ? 'Conectando...' : 'Conectar'}
      </Button>
    </div>
  );
};

export default IntegrationCard;
