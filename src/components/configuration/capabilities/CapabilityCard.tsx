import React from 'react';
import { Button } from '@/components/ui/button';

interface CapabilityCardProps {
  capability: {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: React.ReactNode;
  };
  isActive: boolean;
  onToggle: () => void;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  capability,
  isActive,
  onToggle,
}) => {
  return (
    <div 
      className={`relative p-6 rounded-lg border transition-all duration-200 ${
        isActive 
          ? 'bg-[#3EF3B0]/10 border-[#3EF3B0]/30' 
          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {capability.icon}
          <h3 className="text-lg font-medium text-white">{capability.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#3EF3B0] text-sm">+${capability.price} USD</span>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4">{capability.description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <Button
          variant="outline"
          size="sm"
          className={`transition-all duration-200 ${
            isActive
              ? 'bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-[#3EF3B0]/30'
              : 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={onToggle}
        >
          {isActive ? 'Desactivar' : 'Activar'}
        </Button>
      </div>
    </div>
  );
};

export default CapabilityCard;
