
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PhoneCall } from "lucide-react";

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
    <div className="rounded-lg bg-gray-800/80 border border-gray-700 p-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-md bg-xelia-accent/10 text-xelia-accent">
          <PhoneCall className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-medium text-white">Volumen de llamadas mensuales</h3>
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
              className="flex flex-col items-center justify-center p-4 h-[100px] border border-gray-700 rounded-lg cursor-pointer transition-all hover:border-xelia-accent peer-data-[state=checked]:border-xelia-accent peer-data-[state=checked]:bg-xelia-accent/10 group"
            >
              <div className="text-center">
                <span className="block text-sm font-medium text-gray-200">{option.label}</span>
                {option.price > 0 && (
                  <span className="mt-2 block text-xelia-accent font-semibold opacity-0 group-hover:opacity-100 peer-data-[state=checked]:opacity-100 transition-opacity">
                    +${option.price} USD
                  </span>
                )}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CallsVolumeSelector;
