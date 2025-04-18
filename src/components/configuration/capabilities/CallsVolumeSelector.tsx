
import React from 'react';
import { PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VOLUME_PRICING } from '@/data/industries/common';

interface CallsVolumeSelectorProps {
  selectedVolume: string;
  onChange: (volume: string) => void;
}

const CallsVolumeSelector: React.FC<CallsVolumeSelectorProps> = ({ 
  selectedVolume, 
  onChange 
}) => {
  const volumeOptions = [
    {
      id: '500',
      label: '0–500',
      description: 'llamadas',
      isDefault: true,
      price: VOLUME_PRICING['500']
    },
    {
      id: '1000',
      label: '500–1000',
      description: 'llamadas',
      price: VOLUME_PRICING['1000']
    },
    {
      id: '5000',
      label: '1000–5000',
      description: 'llamadas',
      price: VOLUME_PRICING['5000']
    },
    {
      id: 'unlimited',
      label: 'Llamadas',
      description: 'ilimitadas',
      price: VOLUME_PRICING['unlimited']
    }
  ];

  return (
    <div className="space-y-4 min-w-0">
      <div className="flex items-center gap-2 mb-4">
        <PhoneCall className="w-5 h-5 text-[#3EF3B0]" />
        <h3 className="text-lg font-medium text-white">Volumen de llamadas mensuales</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {volumeOptions.map((option) => {
          const isSelected = selectedVolume === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={cn(
                "relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300",
                "min-h-[160px] min-w-[200px] w-full",
                isSelected 
                  ? "bg-[#3EF3B0]/10 border-[#3EF3B0]/30" 
                  : "bg-gray-800/40 border-gray-700 hover:border-gray-600"
              )}
            >
              <div className="text-center flex flex-col items-center justify-center space-y-2">
                <div className="text-2xl font-semibold text-white">{option.label}</div>
                <div className="text-base text-gray-300">{option.description}</div>
                
                {option.isDefault && (
                  <div className={cn(
                    "mt-2 text-sm font-medium py-1.5 px-4 rounded-full",
                    isSelected ? "bg-[#3EF3B0]/20 text-[#3EF3B0]" : "bg-gray-700/70 text-gray-400"
                  )}>
                    Incluido
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CallsVolumeSelector;
