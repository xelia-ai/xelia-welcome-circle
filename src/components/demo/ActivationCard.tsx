
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivationCardProps {
  onActivate: () => void;
}

const ActivationCard: React.FC<ActivationCardProps> = ({ onActivate }) => {
  return (
    <div className="bg-xelia-accent/10 border border-xelia-accent/30 rounded-lg p-6 mb-8">
      <div className="flex items-start">
        <CreditCard className="w-6 h-6 text-xelia-accent mr-3 mt-1" />
        <div>
          <h3 className="text-lg font-medium text-white mb-2">
            Activa tu agente ahora
          </h3>
          <p className="text-gray-300 mb-4">
            Tu agente está configurado y listo para ser activado. Procede al pago para comenzar a utilizarlo en tu negocio.
          </p>
          <Button 
            className="bg-xelia-accent hover:bg-xelia-accent/90"
            onClick={onActivate}
          >
            Continuar a pago
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivationCard;
