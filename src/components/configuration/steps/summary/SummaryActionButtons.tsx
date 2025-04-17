
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MessageSquare, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SummaryActionButtonsProps {
  isCallDialogOpen: boolean;
  setIsCallDialogOpen: (isOpen: boolean) => void;
}

const SummaryActionButtons: React.FC<SummaryActionButtonsProps> = ({
  isCallDialogOpen,
  setIsCallDialogOpen
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleScheduleCall = () => {
    toast({
      title: "Solicitud enviada",
      description: "Un especialista se pondrá en contacto contigo pronto.",
    });
    setIsCallDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border border-[#3EF3B0]/30"
              size="lg"
            >
              <PhoneCall className="w-5 h-5 mr-2" />
              Agendar llamada con un especialista
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Agenda una llamada</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <p className="text-gray-300">Selecciona la fecha y hora que mejor te convengan:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Hoy 10:00', 'Hoy 14:00', 'Mañana 09:00', 'Mañana 15:00'].map((slot) => (
                  <Button 
                    key={slot}
                    variant="outline" 
                    className="flex items-center justify-start p-4 h-auto border-gray-600 hover:border-[#3EF3B0] hover:bg-[#3EF3B0]/10"
                    onClick={handleScheduleCall}
                  >
                    <CalendarDays className="h-5 w-5 mr-3 text-[#3EF3B0]" />
                    <span>{slot}</span>
                  </Button>
                ))}
              </div>
              
              <Button 
                className="mt-2 bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border border-[#3EF3B0]/30"
                onClick={handleScheduleCall}
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          size="lg"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Chat con soporte 24/7
        </Button>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          size="lg"
          className="text-gray-300 border border-gray-600 hover:bg-gray-700 font-medium"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Agregar más
        </Button>
      </div>
      
      <div className="mt-10 text-center flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium text-base px-8 py-6 h-auto"
          onClick={() => navigate('/demo')}
        >
          Probar Demo
        </Button>
        
        <Button
          size="lg"
          className="bg-xelia-accent hover:bg-xelia-accent/90 text-black font-medium text-base px-8 py-6 h-auto"
        >
          Activar Agente
        </Button>
      </div>
    </>
  );
};

export default SummaryActionButtons;
