
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CallsVolumeOption {
  value: string;
  label: string;
  price: number;
}

interface CallsVolumeSelectorProps {
  selectedVolume: string;
  onChange: (volume: string) => void;
}

const CallsVolumeSelector: React.FC<CallsVolumeSelectorProps> = ({
  selectedVolume,
  onChange
}) => {
  const volumeOptions: CallsVolumeOption[] = [
    { value: '500', label: '0–500 llamadas', price: 0 },
    { value: '1000', label: '500–1000 llamadas', price: 75 },
    { value: '5000', label: '1000–5000 llamadas', price: 150 },
    { value: 'unlimited', label: 'Llamadas ilimitadas', price: 250 }
  ];

  return (
    <div className="rounded-lg bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-md bg-[#3EF3B0]/10 text-emerald-600 dark:text-xelia-accent">
          <PhoneCall className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Volumen de llamadas mensuales</h3>
      </div>

      <RadioGroup 
        value={selectedVolume} 
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4"
      >
        {volumeOptions.map((option) => (
          <div key={option.value} className="relative">
            <RadioGroupItem
              value={option.value}
              id={`volume-${option.value}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`volume-${option.value}`}
              className="flex flex-col items-center justify-center p-4 h-[110px] border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all hover:border-gray-300 dark:hover:border-gray-600 peer-data-[state=checked]:border-[#3EF3B0] peer-data-[state=checked]:bg-[#3EF3B0]/10 group"
            >
              <div className="text-center">
                <span className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">{option.label}</span>
                <Badge 
                  variant="outline" 
                  className={`
                    mt-2 group-hover:opacity-100 transition-opacity duration-200
                    ${selectedVolume === option.value 
                      ? 'opacity-100 bg-[#3EF3B0]/10 text-emerald-600 dark:text-[#3EF3B0] border-[#3EF3B0]/30' 
                      : 'opacity-0 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }
                  `}
                >
                  {option.price > 0 ? `+$${option.price} USD` : 'Incluido'}
                </Badge>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CallsVolumeSelector;
