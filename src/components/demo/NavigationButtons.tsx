
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavigationButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        onClick={() => navigate('/configure')}
        className="flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Volver a la configuración
      </Button>
      <Button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2"
      >
        Volver al inicio
      </Button>
    </div>
  );
};

export default NavigationButtons;
