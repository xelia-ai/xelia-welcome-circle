
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import SectionContainer from './SectionContainer';

interface IntegrationsSectionProps {
  integrations: string[];
  integrationNames: Record<string, string>;
  onEdit: () => void;
}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  integrations,
  integrationNames,
  onEdit,
}) => {
  const [selectedIntegrations, setSelectedIntegrations] = React.useState<string[]>(integrations);
  const hasChanges = JSON.stringify(selectedIntegrations) !== JSON.stringify(integrations);

  const handleIntegrationToggle = (integrationId: string) => {
    setSelectedIntegrations(prev => 
      prev.includes(integrationId) 
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  const handleSaveChanges = () => {
    onEdit();
  };

  return (
    <SectionContainer 
      title="Integraciones" 
      onEdit={onEdit}
    >
      <div className="space-y-4">
        {integrations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {integrations.map((integrationId) => (
              <div 
                key={integrationId}
                className="flex items-center p-3 rounded-lg bg-gray-800/40 border border-gray-700 hover:border-[#3EF3B0]/30 hover:bg-[#3EF3B0]/5 transition-all duration-300"
              >
                <div className="w-8 h-8 mr-3 flex items-center justify-center text-[#3EF3B0] bg-[#3EF3B0]/10 rounded-full border border-[#3EF3B0]/30">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <span className="text-gray-300">{integrationNames[integrationId]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-gray-800/40 border border-gray-700">
            <PlusCircle className="w-12 h-12 text-[#3EF3B0] mb-4" />
            <p className="text-gray-400 text-center mb-4">
              Potencia tu agente conectando integraciones
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-[#3EF3B0]/10 border-[#3EF3B0]/30 text-[#3EF3B0] hover:bg-[#3EF3B0]/20"
                >
                  Añadir integración
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Añadir integraciones</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {Object.entries(integrationNames).map(([id, name]) => (
                    <div key={id} className="flex items-center justify-between p-3 rounded-lg border border-gray-700">
                      <span className="text-gray-300">{name}</span>
                      <Switch 
                        checked={selectedIntegrations.includes(id)}
                        onCheckedChange={() => handleIntegrationToggle(id)}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="text-gray-400 hover:text-white">
                      Cancelar
                    </Button>
                  </DialogTrigger>
                  <Button 
                    className="bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30"
                    disabled={!hasChanges}
                    onClick={handleSaveChanges}
                  >
                    Guardar cambios
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default IntegrationsSection;
