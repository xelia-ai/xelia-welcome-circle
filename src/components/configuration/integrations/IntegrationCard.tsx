
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
      className="bg-white border border-xelia-gray-light rounded-lg p-5 transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={() => onConnect(id)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center mr-3">{logo}</div>
          <h3 className="text-lg font-medium text-xelia-gray-dark">{name}</h3>
        </div>
        {status === 'connected' && (
          <span className="text-xelia-accent text-sm flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Conectado
          </span>
        )}
      </div>
      <p className="text-sm text-xelia-gray-dark mb-4">{description}</p>
      <Button 
        variant={status === 'connected' ? 'outline' : 'default'}
        size="sm" 
        className={status === 'connected' 
          ? 'border-xelia-accent text-xelia-accent hover:text-xelia-accent-dark' 
          : 'bg-xelia-accent text-white hover:bg-xelia-accent-dark'
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
