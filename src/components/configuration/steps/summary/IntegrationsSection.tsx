
import React, { useState } from 'react';
import { Check, Search, PlusCircle } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { integrations, getIntegrationNameMap } from '../../integrations/integrationsData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface IntegrationsSectionProps {
  integrations: string[];
  integrationNames: string[];
  onEdit: () => void;
}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  integrations: selectedIntegrations,
  integrationNames,
  onEdit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Get the actual integration data to display icons/logos
  const integrationData = integrations.filter(i => selectedIntegrations.includes(i.id));
  
  // Filter integrations based on search term
  const filteredIntegrations = integrations.filter(integration => 
    integration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddIntegration = (id: string) => {
    if (!selectedIntegrations.includes(id)) {
      // This would call the parent component's method to add the integration
      // For now we'll just show a toast since we can't modify the onEdit function signature
      toast({
        title: "Integración añadida",
        description: `Se ha añadido la integración ${integrations.find(i => i.id === id)?.name}`,
      });
    }
    setIsAddDialogOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // You would call an API or filter the integrations based on the search term
    toast({
      title: "Buscando integraciones",
      description: `Buscando "${searchTerm}"`,
    });
  };
  
  return (
    <SectionContainer 
      title="Integraciones conectadas" 
      onEdit={onEdit}
      customButtons={
        <div className="flex space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs bg-transparent border-[#3EF3B0] text-[#3EF3B0] hover:bg-[#3EF3B0]/10"
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1" />
                Añadir
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Añadir integración</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Buscar integración..."
                  className="mb-4 bg-gray-700 border-gray-600 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-2">
                    {filteredIntegrations.map((integration) => (
                      <div 
                        key={integration.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 border border-gray-700 hover:border-gray-600 cursor-pointer"
                        onClick={() => handleAddIntegration(integration.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-2 flex items-center justify-center text-[#3EF3B0] bg-[#3EF3B0]/10 rounded-full border border-[#3EF3B0]/30">
                            {integration.logo}
                          </div>
                          <span className="text-gray-300">{integration.name}</span>
                        </div>
                        <Switch 
                          checked={selectedIntegrations.includes(integration.id)} 
                          onCheckedChange={() => handleAddIntegration(integration.id)}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs bg-transparent border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-colors"
            onClick={onEdit}
          >
            Editar
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar integración..."
              className="pl-9 bg-gray-700/50 border-gray-600 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            variant="outline" 
            size="sm" 
            className="bg-[#3EF3B0]/10 border-[#3EF3B0]/30 text-[#3EF3B0] hover:bg-[#3EF3B0]/20"
          >
            Buscar
          </Button>
        </form>
        
        {selectedIntegrations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {integrationData.map((integration) => (
              <div key={integration.id} className="flex items-center p-2.5 rounded-lg bg-gray-700/30 border border-gray-700 hover:border-[#3EF3B0]/30 hover:bg-[#3EF3B0]/5 transition-all duration-300">
                <div className="w-8 h-8 mr-2 flex items-center justify-center text-[#3EF3B0] bg-[#3EF3B0]/10 rounded-full border border-[#3EF3B0]/30">
                  {integration.logo}
                </div>
                <span className="text-gray-300">{integration.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 rounded-lg bg-gray-700/20 border border-gray-700">
            <p className="text-gray-400 italic mb-3">No has conectado integraciones</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-[#3EF3B0]/10 border-[#3EF3B0]/30 text-[#3EF3B0] hover:bg-[#3EF3B0]/20"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Añadir integración
            </Button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default IntegrationsSection;
