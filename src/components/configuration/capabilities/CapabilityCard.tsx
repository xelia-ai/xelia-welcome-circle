
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Capability } from './types';

interface CapabilityCardProps {
  capability: Capability;
  isSelected: boolean;
  onToggle: () => void;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ capability, isSelected, onToggle }) => {
  return (
    <div 
      className={cn(
        "flex flex-col p-4 rounded-xl border transition-all duration-300 group cursor-pointer",
        isSelected 
          ? "bg-[#3EF3B0]/10 border-[#3EF3B0]/30" 
          : "bg-gray-800/40 border-gray-700 hover:border-gray-600"
      )}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-md transition-colors",
            isSelected ? "bg-[#3EF3B0]/20 text-[#3EF3B0]" : "bg-gray-700 text-gray-300"
          )}>
            {capability.icon}
          </div>
          <h3 className="font-medium text-white">{capability.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          {capability.price > 0 && (
            <span className={cn(
              "text-sm font-medium py-1 px-2 rounded-md",
              isSelected ? "bg-[#3EF3B0]/20 text-[#3EF3B0]" : "bg-gray-700/50 text-gray-400"
            )}>
              +${capability.price} USD
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-3">
        {capability.description}
      </p>

      <div className="flex justify-end mt-auto">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "transition-all",
            isSelected
              ? "bg-transparent border-[#3EF3B0]/30 text-[#3EF3B0] hover:bg-[#3EF3B0]/10"
              : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700"
          )}
        >
          {isSelected ? 'Desactivar' : 'Activar'}
        </Button>
      </div>
    </div>
  );
};

export default CapabilityCard;
