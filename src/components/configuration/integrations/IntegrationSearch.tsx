
import React, { useState } from 'react';
import { Search, Webhook, MessageSquare, Mail, CalendarDays, ShoppingCart, Lightbulb } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SuggestedIntegration {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
}

const IntegrationSearch: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const suggestedIntegrations: SuggestedIntegration[] = [
    { id: 'mailchimp', name: 'Mailchimp', icon: <Mail className="h-4 w-4" />, category: 'Email Marketing' },
    { id: 'shopify', name: 'Shopify', icon: <ShoppingCart className="h-4 w-4" />, category: 'E-commerce' },
    { id: 'zoom', name: 'Zoom', icon: <MessageSquare className="h-4 w-4" />, category: 'Videoconferencia' },
    { id: 'monday', name: 'Monday', icon: <CalendarDays className="h-4 w-4" />, category: 'Gestión de proyectos' },
    { id: 'make', name: 'Make', icon: <Webhook className="h-4 w-4" />, category: 'Automatización' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    
    if (!suggestedIntegrations.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())) && searchTerm.trim() !== '') {
      toast({
        title: "No encontramos esa integración",
        description: "Puedes solicitar que agreguemos esta integración a nuestro catálogo.",
      });
    }
  };

  const handleRequestIntegration = () => {
    toast({
      title: "Solicitud enviada",
      description: `Hemos recibido tu solicitud para la integración con "${searchTerm}". Nuestro equipo la evaluará.`,
    });
    setSearchTerm('');
    setShowResults(false);
  };

  const filteredIntegrations = searchTerm.trim() === '' 
    ? [] 
    : suggestedIntegrations.filter(i => 
        i.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Card className="bg-gray-800/60 border border-gray-700">
      <CardContent className="pt-6">
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar integración..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white pl-10"
            />
          </div>
          <Button type="submit" variant="default" className="bg-xelia-accent hover:bg-xelia-accent/90">
            Buscar
          </Button>
        </form>

        {showResults && (
          <div className="space-y-4">
            {filteredIntegrations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredIntegrations.map((integration) => (
                  <div 
                    key={integration.id}
                    className="bg-gray-700/60 p-4 rounded-lg flex items-center justify-between hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-gray-600">
                        {integration.icon}
                      </div>
                      <div>
                        <p className="text-white font-medium">{integration.name}</p>
                        <p className="text-xs text-gray-400">{integration.category}</p>
                      </div>
                    </div>
                    <Badge className="bg-xelia-accent/20 text-xelia-accent hover:bg-xelia-accent/30">
                      Agregar
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              searchTerm.trim() !== '' && (
                <div className="bg-gray-700/60 p-6 rounded-lg text-center">
                  <Lightbulb className="h-10 w-10 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">No encontramos esa integración</h3>
                  <p className="text-gray-300 mb-4">
                    ¿Quieres que agreguemos la integración con "{searchTerm}" a nuestro catálogo?
                  </p>
                  <Button 
                    onClick={handleRequestIntegration}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Solicitar nueva integración
                  </Button>
                </div>
              )
            )}
          </div>
        )}

        {!showResults && (
          <div className="text-center py-6">
            <Search className="h-10 w-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 mb-1">Busca entre cientos de integraciones disponibles</p>
            <p className="text-xs text-gray-500">O solicita una nueva si no encuentras lo que necesitas</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationSearch;
