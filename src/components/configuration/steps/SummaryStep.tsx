
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
import { CalendarDays, PhoneCall, MessageSquare, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  updateConfig?: (key: string, value: any) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ config, onEdit, updateConfig }) => {
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'upcoming'>('summary');
  const [selectedUpcomingFeatures, setSelectedUpcomingFeatures] = useState<string[]>([]);
  const { toast } = useToast();
  
  const capabilityNames = getCapabilityNames(config.capabilities);
  const integrationNames = getIntegrationNames(config.integrations);
  const priceInfo = calculateIndustriesPrice(config.industries.length);
  
  // Updated base price to $75
  const basePrice = 75;
  const capabilitiesPrice = config.capabilities.length * 25;
  const volumePrice = config.callsVolume === '500' ? 0 : 
                     config.callsVolume === '1000' ? 50 : 
                     config.callsVolume === '5000' ? 150 : 300;
  
  const upcomingFeaturesPrice = selectedUpcomingFeatures.length * 35;
  const totalPrice = basePrice + capabilitiesPrice + volumePrice + priceInfo.additionalPrice + upcomingFeaturesPrice;
  
  const handleScheduleCall = () => {
    toast({
      title: "Solicitud enviada",
      description: "Un especialista se pondrá en contacto contigo pronto.",
    });
    setIsCallDialogOpen(false);
  };

  const handleRemoveCapability = (capabilityId: string) => {
    if (updateConfig && config.capabilities.includes(capabilityId)) {
      const updatedCapabilities = config.capabilities.filter(id => id !== capabilityId);
      updateConfig('capabilities', updatedCapabilities);
    }
  };

  const toggleUpcomingFeature = (featureId: string) => {
    setSelectedUpcomingFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };
  
  const upcomingFeatures = [
    { id: 'voice-recognition', name: 'Reconocimiento de voz avanzado', description: 'Transcribe y analiza conversaciones en tiempo real', price: 35 },
    { id: 'crm-automation', name: 'Automatización de CRM', description: 'Actualiza datos de clientes y tareas automáticamente', price: 35 },
    { id: 'sentiment-analysis', name: 'Análisis de sentimiento', description: 'Detecta emociones y actitudes en conversaciones', price: 35 },
    { id: 'prediction-engine', name: 'Motor de predicción', description: 'Anticipa necesidades y comportamientos de clientes', price: 35 }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="p-6 bg-gray-800/60 border border-gray-700 rounded-xl">
          <Tabs defaultValue="summary" value={activeTab} onValueChange={(v) => setActiveTab(v as 'summary' | 'upcoming')}>
            <TabsList className="mb-6 w-full grid grid-cols-2 bg-gray-800/60 rounded-xl overflow-hidden">
              <TabsTrigger 
                value="summary" 
                className="text-base py-3 data-[state=active]:bg-xelia-accent/20 data-[state=active]:border-b-0 data-[state=active]:text-xelia-accent"
              >
                Demo
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming" 
                className="text-base py-3 data-[state=active]:bg-xelia-accent/20 data-[state=active]:border-b-0 data-[state=active]:text-xelia-accent"
              >
                Próximas funciones
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="mt-0">
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
                capabilities={config.capabilities}
                capabilityNames={capabilityNames}
                onRemoveCapability={handleRemoveCapability}
              />
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              <h2 className="text-2xl font-medium text-white mb-6">
                Próximamente: Reserva tus funcionalidades del futuro
              </h2>
              
              <p className="text-gray-300 mb-8">
                Estas capacidades estarán disponibles próximamente. Pre-adquiérelas ahora y obtén acceso prioritario cuando se lancen.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {upcomingFeatures.map(feature => (
                  <div 
                    key={feature.id}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      selectedUpcomingFeatures.includes(feature.id)
                        ? "bg-[#3EF3B0]/10 border-[#3EF3B0]/30"
                        : "bg-gray-800/40 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => toggleUpcomingFeature(feature.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${
                          selectedUpcomingFeatures.includes(feature.id)
                            ? "bg-[#3EF3B0]/20 text-[#3EF3B0]"
                            : "bg-gray-700 text-gray-300"
                        }`}>
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h3 className="font-medium text-white">{feature.name}</h3>
                      </div>
                      <div className="bg-gray-700/50 px-2 py-1 rounded-md text-gray-300 text-sm">
                        +${feature.price} USD
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm ml-12 mb-2">{feature.description}</p>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`mt-2 ${
                          selectedUpcomingFeatures.includes(feature.id)
                            ? "bg-[#3EF3B0]/20 border-[#3EF3B0]/30 text-[#3EF3B0] hover:bg-[#3EF3B0]/30"
                            : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleUpcomingFeature(feature.id);
                        }}
                      >
                        {selectedUpcomingFeatures.includes(feature.id) ? "Reservado" : "Reservar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedUpcomingFeatures.length > 0 && (
                <div className="mb-8 p-4 bg-gray-800/80 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-white">Funciones reservadas</h3>
                    <div className="text-[#3EF3B0] text-xl font-medium">+${upcomingFeaturesPrice} USD</div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Has pre-reservado {selectedUpcomingFeatures.length} funcionalidad(es). Se añadirán a tu factura cuando estén disponibles.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
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
