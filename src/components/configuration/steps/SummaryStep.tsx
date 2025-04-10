
import React from 'react';
import { ArrowLeft, Check, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfigStep } from '@/utils/configStepInfo';
import AgentPreview from '@/components/configuration/AgentPreview';

interface SummaryStepProps {
  config: {
    agentType: string;
    industries: string[];
    industryNames: string[];
    website: string;
    capabilities: string[];
    integrations: string[];
  };
  onEdit: (step: ConfigStep) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ config, onEdit }) => {
  const getCapabilityNames = (): string[] => {
    const capabilityMap: Record<string, string> = {
      'multi-language': 'Multilingüe',
      'conversation-memory': 'Memoria de conversaciones',
      'appointment-scheduling': 'Programación de citas',
      'real-time-data': 'Datos en tiempo real',
      'whatsapp-integration': 'Integración con WhatsApp',
      'follow-ups': 'Seguimiento automático',
      'rescheduling': 'Reprogramación inteligente',
      'database-search': 'Búsqueda en base de datos'
    };
    
    return config.capabilities.map(id => capabilityMap[id] || id);
  };
  
  const getIntegrationNames = (): string[] => {
    const integrationMap: Record<string, string> = {
      'whatsapp': 'WhatsApp',
      'google-calendar': 'Google Calendar',
      'hubspot': 'HubSpot CRM',
      'zapier': 'Zapier',
      'slack': 'Slack',
      'salesforce': 'Salesforce'
    };
    
    return config.integrations.map(id => integrationMap[id] || id);
  };

  // Cálculo del costo adicional por múltiples industrias
  const calculateIndustriesPrice = () => {
    const basePrice = 499;
    const industryCount = config.industries.length;
    
    // Precios adicionales por cada industria después de la primera
    let additionalPrice = 0;
    if (industryCount > 1) {
      additionalPrice = (industryCount - 1) * 50; // $50 por cada industria adicional
    }
    
    return {
      basePrice,
      additionalPrice,
      totalPrice: basePrice + additionalPrice
    };
  };
  
  const priceInfo = calculateIndustriesPrice();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="p-6 bg-gray-800/60 border border-gray-700 rounded-xl">
          <h2 className="text-2xl font-medium text-white mb-6">
            Tu agente está listo. Aquí tienes todo lo que Xelia puede hacer por ti.
          </h2>
          
          {/* Industria */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-white">Industria</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs bg-transparent border-gray-600 hover:bg-gray-700"
                onClick={() => onEdit('industry')}
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Editar
              </Button>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <ul className="space-y-2">
                {config.industryNames.map((name, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-xelia-accent mr-2" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Sitio Web */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-white">Información de Entrenamiento</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs bg-transparent border-gray-600 hover:bg-gray-700"
                onClick={() => onEdit('website')}
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Editar
              </Button>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="text-gray-300">
                {config.website ? (
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-xelia-accent mr-2" />
                    {config.website}
                  </div>
                ) : (
                  <span className="text-gray-400 italic">No has proporcionado información de entrenamiento</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Capacidades */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-white">Capacidades</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs bg-transparent border-gray-600 hover:bg-gray-700"
                onClick={() => onEdit('capabilities')}
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Editar
              </Button>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              {config.capabilities.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getCapabilityNames().map((name, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-xelia-accent mr-2 flex-shrink-0" />
                      {name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-400 italic">No has seleccionado capacidades</span>
              )}
            </div>
          </div>
          
          {/* Integraciones */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-white">Integraciones</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs bg-transparent border-gray-600 hover:bg-gray-700"
                onClick={() => onEdit('integrations')}
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Editar
              </Button>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              {config.integrations.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getIntegrationNames().map((name, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-xelia-accent mr-2 flex-shrink-0" />
                      {name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-400 italic">No has seleccionado integraciones</span>
              )}
            </div>
          </div>
          
          {/* Resumen de precio */}
          <div className="mb-8 bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">Resumen de precios</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Plan base</span>
                <span>${priceInfo.basePrice}</span>
              </div>
              {config.industries.length > 1 && (
                <div className="flex justify-between">
                  <span>Industrias adicionales ({config.industries.length - 1})</span>
                  <span>+${priceInfo.additionalPrice}</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t border-gray-600">
                <span>Total base</span>
                <span>${priceInfo.totalPrice}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                *Las capacidades adicionales se calculan en el siguiente paso
              </div>
            </div>
          </div>
          
          {/* Agregar más */}
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
          
          {/* CTA Principal */}
          <div className="mt-10 text-center">
            <Button
              size="lg"
              className="bg-xelia-accent hover:bg-xelia-accent/90 text-black font-medium text-base px-8 py-6 h-auto"
            >
              Confirmar y proceder al pago
            </Button>
          </div>
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
