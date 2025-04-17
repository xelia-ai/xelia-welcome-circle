
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ActionButtonsProps {
  onAddMore?: () => void;
  onProceed?: () => void;
  demoLabel?: string;
  confirmationLabel?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onAddMore, 
  onProceed,
  demoLabel = "Ver Demo",
  confirmationLabel = "Activar Agente"
}) => {
  const navigate = useNavigate();
  
  const handleDemoClick = () => {
    navigate('/demo');
  };
  
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
      
      <div className="mt-10 text-center flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium text-base px-8 py-6 h-auto"
          onClick={handleDemoClick}
        >
          {demoLabel}
        </Button>
        
        <Button
          size="lg"
          className="bg-xelia-accent hover:bg-xelia-accent/90 text-black font-medium text-base px-8 py-6 h-auto"
          onClick={onProceed}
        >
          {confirmationLabel}
        </Button>
      </div>
    </>
  );
};

export default ActionButtons;
