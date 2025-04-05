
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Database } from 'lucide-react';
import { integrations, premiumFeatures } from './integrationsData';

// Import our new components
import AvailableIntegrations from './personalization/AvailableIntegrations';
import SmartSuggestions from './personalization/SmartSuggestions';
import CustomConfiguration from './personalization/CustomConfiguration';
import AdditionalSupport from './personalization/AdditionalSupport';
import PriceSummary from './personalization/PriceSummary';
import ConsultantDialog from './personalization/ConsultantDialog';

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

  // Get suggested integrations based on industry and selected features
  const suggestedIntegrations = unselectedIntegrations.slice(0, 3);

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

  // Volume pricing map for easy lookup
  const volumePricing: Record<string, number> = {
    '500': 0,
    '1000': 30,
    '5000': 100,
    'unlimited': 300
  };

  // Calculate estimated price
  const calculateEstimatedPrice = () => {
    let price = 149; // Base price
    
    // Add price for premium features
    price += selectedPremiumFeatures.length * 30;
    
    // Add price for volume
    if (selectedVolumeOption && selectedVolumeOption !== '500') {
      price += volumePricing[selectedVolumeOption] || 0;
    }
    
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
            <AvailableIntegrations 
              unselectedIntegrations={unselectedIntegrations}
              selectedIntegrations={selectedIntegrations}
              onIntegrationToggle={onIntegrationToggle}
            />

            <Separator />

            {/* Smart Suggestions */}
            <SmartSuggestions 
              suggestedIntegrations={suggestedIntegrations}
              selectedIntegrations={selectedIntegrations}
              onIntegrationToggle={onIntegrationToggle}
            />

            <Separator />

            {/* Configure to your needs */}
            <CustomConfiguration 
              dbOptions={dbOptions}
              volumeOptions={volumeOptions}
              voiceStyles={voiceStyles}
              selectedDbOption={selectedDbOption}
              selectedVolumeOption={selectedVolumeOption}
              selectedVoiceStyle={selectedVoiceStyle}
              setSelectedDbOption={setSelectedDbOption}
              setSelectedVolumeOption={setSelectedVolumeOption}
              setSelectedVoiceStyle={setSelectedVoiceStyle}
            />

            <Separator />

            {/* Additional Support */}
            <AdditionalSupport 
              onConsultantClick={() => setConsultantDialogOpen(true)}
            />
          </div>

          {/* Price Summary */}
          <PriceSummary 
            basePrice={149}
            premiumFeaturesCount={selectedPremiumFeatures.length}
            pricePerPremiumFeature={30}
            selectedVolumeOption={selectedVolumeOption}
            volumePricing={volumePricing}
            calculateEstimatedPrice={calculateEstimatedPrice}
          />

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
      <ConsultantDialog 
        open={consultantDialogOpen}
        onOpenChange={setConsultantDialogOpen}
      />
    </>
  );
};

export default PersonalizationSheet;
