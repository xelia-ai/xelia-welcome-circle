
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
  isSelected: boolean;
  onToggle: () => void;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  capability,
  isSelected,
  onToggle,
}) => {
  return (
    <div 
      className={`relative flex flex-col p-6 rounded-lg border transition-all duration-200 ${
        isSelected 
          ? 'bg-[#3EF3B0]/10 border-[#3EF3B0]/30' 
          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
      }`}
    >
      <div className="flex items-start mb-3">
        <div className="text-xl mr-3">{capability.icon}</div>
        <h3 className="text-lg font-medium text-white">{capability.name}</h3>
      </div>
      
      <p className="text-gray-400 mb-6 flex-grow">{capability.description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-[#3EF3B0] text-sm">+${capability.price} USD</span>
        <Button
          variant="outline"
          size="sm"
          className={`transition-all duration-200 ${
            isSelected
              ? 'bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-[#3EF3B0]/30'
              : 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={onToggle}
        >
          {isSelected ? 'Desactivar' : 'Activar'}
        </Button>
      </div>
    </div>
  );
};

export default CapabilityCard;
