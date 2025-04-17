
import React, { useState } from 'react';
import { MinusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SummaryPriceCardProps {
  basePrice: number;
  industryCount: number;
  additionalPrice: number;
  capabilitiesPrice: number;
  volumePrice: number;
  totalPrice: number;
}

const SummaryPriceCard: React.FC<SummaryPriceCardProps> = ({
  basePrice,
  industryCount,
  additionalPrice,
  capabilitiesPrice,
  volumePrice,
  totalPrice
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();
  
  const handleRemoveItem = (item: string) => {
    toast({
      title: "Elemento eliminado",
      description: `${item} eliminado del plan. Esta función necesitaría implementación adicional para actualizar precios en tiempo real.`,
    });
  };
  
  return (
    <div className="mb-8 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-lg font-medium text-white flex items-center">
            Resumen de inversión
          </h3>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="p-4 space-y-3">
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700/20">
                <div className="flex items-center">
                  <span>Plan base</span>
                  <div className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#3EF3B0]/10 text-[#3EF3B0]">Esencial</div>
                </div>
                <div className="flex items-center">
                  <span>${basePrice}</span>
                </div>
              </div>
              
              {industryCount > 1 && (
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700/20">
                  <div className="flex items-center">
                    <span>Industrias adicionales ({industryCount - 1})</span>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mr-2 h-6 w-6 p-0 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50"
                      onClick={() => handleRemoveItem('Industria adicional')}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span>+${additionalPrice}</span>
                  </div>
                </div>
              )}
              
              {capabilitiesPrice > 0 && (
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700/20">
                  <div className="flex items-center">
                    <span>Capacidades adicionales</span>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mr-2 h-6 w-6 p-0 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50"
                      onClick={() => handleRemoveItem('Capacidades adicionales')}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span>+${capabilitiesPrice}</span>
                  </div>
                </div>
              )}
              
              {volumePrice > 0 && (
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700/20">
                  <div className="flex items-center">
                    <span>Volumen de llamadas avanzado</span>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mr-2 h-6 w-6 p-0 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50"
                      onClick={() => handleRemoveItem('Volumen de llamadas avanzado')}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span>+${volumePrice}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between font-medium pt-3 mt-2 border-t border-gray-600">
                <span className="text-white">Total mensual</span>
                <span className="text-[#3EF3B0] text-xl">${totalPrice}</span>
              </div>
              
              <div className="text-xs text-gray-400 mt-2 bg-gray-700/30 p-3 rounded-lg">
                <p>Tu inversión incluye:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Soporte técnico 24/7</li>
                  <li>Actualizaciones garantizadas</li>
                  <li>Sin contratos a largo plazo, cancela cuando quieras</li>
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SummaryPriceCard;
