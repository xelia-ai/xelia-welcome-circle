
import React, { useState } from 'react';
import { ConfigStep } from '@/utils/configStepInfo';
import AgentPreview from '@/components/configuration/AgentPreview';
import IndustriesSection from './summary/IndustriesSection';
import WebsiteSection from './summary/WebsiteSection';
import CapabilitiesSection from './summary/CapabilitiesSection';
import IntegrationsSection from './summary/IntegrationsSection';
import SummaryPriceCard from './summary/SummaryPriceCard';
import ActionButtons from './summary/ActionButtons';
import ComingSoonFeatures from '@/components/configuration/integrations/ComingSoonFeatures';
import { Button } from '@/components/ui/button';
import { CalendarDays, PhoneCall, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  getCapabilityNames, 
  getIntegrationNames, 
  calculateIndustriesPrice 
} from './summary/utilities';
import { useToast } from '@/hooks/use-toast';

interface SummaryStepProps {
  config: {
    agentType: string;
    industries: string[];
    industryNames: string[];
    website: string;
    capabilities: string[];
    integrations: string[];
    callsVolume: string;
  };
  onEdit: (step: ConfigStep) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ config, onEdit }) => {
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const { toast } = useToast();
  const capabilityNames = getCapabilityNames(config.capabilities);
  const integrationNames = getIntegrationNames(config.integrations);
  const priceInfo = calculateIndustriesPrice(config.industries.length);
  
  // Updated base price
  const basePrice = 75; // Changed from default price to $75 as requested
  const capabilitiesPrice = config.capabilities.length * 25; // Example calculation
  const volumePrice = config.callsVolume === '500' ? 0 : 
                     config.callsVolume === '1000' ? 50 : 
                     config.callsVolume === '5000' ? 150 : 300;
  
  const totalPrice = basePrice + capabilitiesPrice + volumePrice + priceInfo.additionalPrice;
  
  const handleScheduleCall = () => {
    toast({
      title: "Solicitud enviada",
      description: "Un especialista se pondrá en contacto contigo pronto.",
    });
    setIsCallDialogOpen(false);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="p-6 bg-gray-800/60 border border-gray-700 rounded-xl">
          <h2 className="text-2xl font-medium text-white mb-6">
            Tu Agente está listo. Aquí tienes todo lo que Xelia puede hacer por ti.
          </h2>
          
          <IndustriesSection 
            industryNames={config.industryNames} 
            onEdit={() => onEdit('industry')} 
          />
          
          <WebsiteSection 
            website={config.website} 
            onEdit={() => onEdit('website')} 
          />
          
          <CapabilitiesSection 
            capabilities={config.capabilities} 
            capabilityNames={capabilityNames}
            callsVolume={config.callsVolume}
            onEdit={() => onEdit('capabilities')} 
          />
          
          <IntegrationsSection 
            integrations={config.integrations} 
            integrationNames={integrationNames}
            onEdit={() => onEdit('capabilities')} 
          />
          
          <SummaryPriceCard 
            basePrice={basePrice}
            industryCount={config.industries.length}
            additionalPrice={priceInfo.additionalPrice}
            capabilitiesPrice={capabilitiesPrice}
            volumePrice={volumePrice}
            totalPrice={totalPrice}
          />
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-white mb-4">Próximas funcionalidades</h3>
            <ComingSoonFeatures />
          </div>
          
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
          
          <ActionButtons demoLabel="Probar Demo" confirmationLabel="Activar Agente" />
        </div>
      </div>
      
      <div className="h-full">
        <AgentPreview 
          agentType={config.agentType}
          industry={config.industries[0] || ''}
          capabilities={config.capabilities}
          website={config.website}
        />
      </div>
    </div>
  );
};

export default SummaryStep;
