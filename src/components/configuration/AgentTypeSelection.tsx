
import React from 'react';
import { ShoppingCart, HeadphonesIcon, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentTypeSelectionProps {
  selectedType: string;
  onSelect: (id: string) => void;
}

interface AgentType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const AgentTypeSelection: React.FC<AgentTypeSelectionProps> = ({ selectedType, onSelect }) => {
  const agentTypes: AgentType[] = [
    {
      id: 'sales',
      name: 'Ventas',
      icon: <ShoppingCart className="h-6 w-6" />,
      description: 'Especializado en convertir visitantes en clientes, calificar leads y maximizar oportunidades de venta.'
    },
    {
      id: 'customer-service',
      name: 'Atención',
      icon: <HeadphonesIcon className="h-6 w-6" />,
      description: 'Responde consultas, resuelve problemas y ofrece soporte excepcional a tus clientes existentes.'
    },
    {
      id: 'hybrid',
      name: 'Híbrida',
      icon: <Users className="h-6 w-6" />,
      description: 'Combina habilidades de ventas y servicio al cliente para una experiencia completa.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {agentTypes.map((type) => (
        <div
          key={type.id}
          onClick={() => onSelect(type.id)}
          className={cn(
            "frosted-glass rounded-xl p-6 cursor-pointer transition-all duration-300 relative group flex flex-col h-full bg-gray-800/90",
            selectedType === type.id 
              ? "border-xelia-accent bg-xelia-accent/5 shadow-accent" 
              : "hover:border-white/20 hover:shadow-elegant-hover"
          )}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={cn(
              "p-3 rounded-xl transition-all duration-300", 
              selectedType === type.id 
                ? "bg-xelia-accent text-white" 
                : "bg-xelia-light/70 text-gray-300 group-hover:bg-xelia-accent/20 group-hover:text-white"
            )}>
              {type.icon}
            </div>
          </div>
          
          <h3 className={cn(
            "text-xl font-medium mb-2",
            selectedType === type.id ? "text-gradient-accent" : "text-white"
          )}>
            {type.name}
          </h3>
          
          <p className="text-gray-300 text-sm flex-grow">
            {type.description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <button 
              className={cn(
                "w-full py-2 rounded-lg transition-all text-sm font-medium",
                selectedType === type.id
                  ? "bg-xelia-accent text-white shadow-[0_0_10px_rgba(92,106,255,0.25)]"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {selectedType === type.id ? 'Seleccionado' : 'Seleccionar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentTypeSelection;
