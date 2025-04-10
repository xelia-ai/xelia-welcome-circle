
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onAddMore?: () => void;
  onProceed?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onAddMore, 
  onProceed 
}) => {
  return (
    <>
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          size="lg"
          className="text-gray-300 border border-gray-600 hover:bg-gray-700 font-medium"
          onClick={onAddMore}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Agregar más
        </Button>
      </div>
      
      <div className="mt-10 text-center">
        <Button
          size="lg"
          className="bg-xelia-accent hover:bg-xelia-accent/90 text-black font-medium text-base px-8 py-6 h-auto"
          onClick={onProceed}
        >
          Confirmar y proceder al pago
        </Button>
      </div>
    </>
  );
};

export default ActionButtons;
