
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Database, MessageSquare, Settings, Sparkles, Zap } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { integrations, premiumFeatures, getIntegrationNameMap, getPremiumFeatureName } from './integrationsData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";

interface PersonalizationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIntegrations: string[];
  premiumFeatures: string[];
  onIntegrationToggle: (id: string) => void;
  onPremiumToggle: (id: string) => void;
}

const PersonalizationSheet: React.FC<PersonalizationSheetProps> = ({
  open,
  onOpenChange,
  selectedIntegrations,
  premiumFeatures: selectedPremiumFeatures,
  onIntegrationToggle,
  onPremiumToggle
}) => {
  const [selectedDbOption, setSelectedDbOption] = useState<string | null>(null);
  const [selectedVolumeOption, setSelectedVolumeOption] = useState<string | null>(null);
  const [selectedVoiceStyle, setSelectedVoiceStyle] = useState<string | null>(null);
  const [consultantDialogOpen, setConsultantDialogOpen] = useState(false);

  // Filter out already selected integrations
  const unselectedIntegrations = integrations.filter(
    integration => !selectedIntegrations.includes(integration.id)
  );

  // Filter out already selected premium features
  const unselectedPremiumFeatures = premiumFeatures.filter(
    feature => !selectedPremiumFeatures.includes(feature.id)
  );

  // Get suggested integrations based on industry and selected features
  const suggestedIntegrations = unselectedIntegrations.slice(0, 3); // Just a simple example, in reality this would use a more complex algorithm

  // Database options
  const dbOptions = [
    { id: 'api', name: 'API externa', icon: <Database className="h-4 w-4" /> },
    { id: 'file', name: 'Archivo', icon: <Database className="h-4 w-4" /> },
    { id: 'client-crm', name: 'CRM del cliente', icon: <Database className="h-4 w-4" /> },
    { id: 'xelia-crm', name: 'CRM nativo de Xelia', icon: <Database className="h-4 w-4" /> },
  ];

  // Volume options
  const volumeOptions = [
    { id: '500', name: '500 llamadas', price: '+$0/mes' },
    { id: '1000', name: '1,000 llamadas', price: '+$30/mes' },
    { id: '5000', name: '5,000 llamadas', price: '+$100/mes' },
    { id: 'unlimited', name: 'Ilimitado', price: '+$300/mes' },
  ];

  // Voice style options
  const voiceStyles = [
    { id: 'professional', name: 'Profesional' },
    { id: 'friendly', name: 'Amigable' },
    { id: 'formal', name: 'Formal' },
    { id: 'casual', name: 'Casual' },
  ];

  // Calculate estimated price
  const calculateEstimatedPrice = () => {
    let price = 149; // Base price
    
    // Add price for premium features
    price += selectedPremiumFeatures.length * 30;
    
    // Add price for volume
    if (selectedVolumeOption === '1000') price += 30;
    if (selectedVolumeOption === '5000') price += 100;
    if (selectedVolumeOption === 'unlimited') price += 300;
    
    return price;
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full md:min-w-[550px] md:max-w-[550px] bg-white border-l border-gray-300 overflow-y-auto">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-xelia-accent" />
              Personalización Inteligente
            </SheetTitle>
            <SheetDescription>
              Diseña un agente hecho a tu medida y maximiza el impacto desde el primer día.
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-8">
            {/* Available Integrations */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-xelia-accent" />
                Integraciones disponibles
              </h3>
              <div className="space-y-3">
                {unselectedIntegrations.slice(0, 4).map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">{integration.logo}</div>
                      <div>
                        <p className="font-medium text-gray-900">{integration.name}</p>
                        <p className="text-sm text-gray-500">{integration.description.slice(0, 60)}...</p>
                      </div>
                    </div>
                    <Switch 
                      id={`integration-${integration.id}`}
                      className="data-[state=checked]:bg-xelia-accent"
                      checked={selectedIntegrations.includes(integration.id)}
                      onCheckedChange={() => onIntegrationToggle(integration.id)}
                    />
                  </div>
                ))}
                {unselectedIntegrations.length > 4 && (
                  <Button variant="outline" className="w-full">
                    Ver todas ({unselectedIntegrations.length})
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Smart Suggestions */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-xelia-accent" />
                Sugerencias inteligentes
              </h3>
              <div className="space-y-3">
                {suggestedIntegrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-xelia-accent/20">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">{integration.logo}</div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-gray-900">{integration.name}</p>
                          <span className="ml-2 px-2 py-0.5 bg-xelia-accent/20 text-xelia-accent text-xs rounded-full">Recomendado</span>
                        </div>
                        <p className="text-sm text-gray-500">Ideal para tu industria</p>
                      </div>
                    </div>
                    <Switch 
                      id={`suggestion-${integration.id}`}
                      className="data-[state=checked]:bg-xelia-accent"
                      checked={selectedIntegrations.includes(integration.id)}
                      onCheckedChange={() => onIntegrationToggle(integration.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Configure to your needs */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-xelia-accent" />
                Configura a tu medida
              </h3>
              
              <div className="space-y-6">
                {/* Database selection */}
                <div>
                  <Label className="block mb-2 text-sm font-medium">Base de datos a usar</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {dbOptions.map(option => (
                      <Toggle
                        key={option.id}
                        pressed={selectedDbOption === option.id}
                        onPressedChange={() => setSelectedDbOption(option.id)}
                        className="flex justify-start gap-2 h-auto py-2"
                      >
                        {option.icon}
                        <span>{option.name}</span>
                      </Toggle>
                    ))}
                  </div>
                </div>
                
                {/* Volume selection */}
                <div>
                  <Label className="block mb-2 text-sm font-medium">Volumen estimado de llamadas</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {volumeOptions.map(option => (
                      <Toggle
                        key={option.id}
                        pressed={selectedVolumeOption === option.id}
                        onPressedChange={() => setSelectedVolumeOption(option.id)}
                        className="flex flex-col items-start gap-1 h-auto py-2"
                      >
                        <span>{option.name}</span>
                        <span className="text-xs text-gray-500">{option.price}</span>
                      </Toggle>
                    ))}
                  </div>
                </div>
                
                {/* Voice style selection */}
                <div>
                  <Label className="block mb-2 text-sm font-medium">Estilo de voz del agente</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {voiceStyles.map(style => (
                      <Toggle
                        key={style.id}
                        pressed={selectedVoiceStyle === style.id}
                        onPressedChange={() => setSelectedVoiceStyle(style.id)}
                        className="flex justify-start gap-2 h-auto py-2"
                      >
                        <span>{style.name}</span>
                      </Toggle>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Additional Support */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-xelia-accent" />
                Soporte adicional o desarrollo a medida
              </h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2" 
                  onClick={() => setConsultantDialogOpen(true)}
                >
                  <Calendar className="h-4 w-4" />
                  Agendar llamada con un consultor
                </Button>
                <Button variant="outline" className="w-full">
                  Solicitar desarrollo personalizado
                </Button>
              </div>
            </div>
          </div>

          {/* Summary and price calculation */}
          <div className="py-4 mt-4 bg-gray-50 rounded-lg px-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Precio base</span>
              <span className="font-medium">$149/mes</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Funciones premium ({selectedPremiumFeatures.length})</span>
              <span className="font-medium">+${selectedPremiumFeatures.length * 30}/mes</span>
            </div>
            {selectedVolumeOption && selectedVolumeOption !== '500' && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">
                  Volumen adicional
                </span>
                <span className="font-medium">
                  {selectedVolumeOption === '1000' && '+$30/mes'}
                  {selectedVolumeOption === '5000' && '+$100/mes'}
                  {selectedVolumeOption === 'unlimited' && '+$300/mes'}
                </span>
              </div>
            )}
            <Separator className="my-3" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total estimado</span>
              <span className="text-xelia-accent">${calculateEstimatedPrice()}/mes</span>
            </div>
          </div>

          <SheetFooter className="mt-6">
            <div className="w-full">
              <p className="mb-4 text-sm text-gray-600 italic">
                Entre más personalizas tu Xelia, más impacto notarás desde el primer día. Diseña un agente hecho a tu medida.
              </p>
              <SheetClose asChild>
                <Button className="w-full bg-xelia-accent hover:bg-xelia-accent/90 text-black font-medium">
                  Guardar y continuar
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Consultant Dialog */}
      <Dialog open={consultantDialogOpen} onOpenChange={setConsultantDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agendar llamada con un consultor</DialogTitle>
            <DialogDescription>
              Nuestro equipo de expertos te ayudará a configurar tu Xelia personalizada.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <input 
                id="name" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tu nombre completo" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input 
                id="email" 
                type="email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="tu@email.com" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono</Label>
              <input 
                id="phone" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="+52 123 456 7890" 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-xelia-accent hover:bg-xelia-accent/90 text-black"
              onClick={() => setConsultantDialogOpen(false)}
            >
              Agendar llamada
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonalizationSheet;
