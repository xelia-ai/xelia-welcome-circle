
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CustomConfigurationProps {
  dbOptions: Array<{ id: string; name: string; icon: React.ReactNode }>;
  volumeOptions: Array<{ id: string; name: string; price: string }>;
  voiceStyles: Array<{ id: string; name: string }>;
  selectedDbOption: string;
  selectedVolumeOption: string;
  selectedVoiceStyle: string;
  setSelectedDbOption: React.Dispatch<React.SetStateAction<string>>;
  setSelectedVolumeOption: React.Dispatch<React.SetStateAction<string>>;
  setSelectedVoiceStyle: React.Dispatch<React.SetStateAction<string>>;
}

const CustomConfiguration: React.FC<CustomConfigurationProps> = ({
  dbOptions,
  volumeOptions,
  voiceStyles,
  selectedDbOption,
  selectedVolumeOption,
  selectedVoiceStyle,
  setSelectedDbOption,
  setSelectedVolumeOption,
  setSelectedVoiceStyle
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-2 block">Base de conocimiento</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dbOptions.map((option) => (
            <div
              key={option.id}
              className={cn(
                "p-3 border rounded-lg cursor-pointer transition-all",
                selectedDbOption === option.id 
                  ? "border-xelia-accent text-foreground shadow-accent" 
                  : "border-border hover:border-muted-foreground/50"
              )}
              onClick={() => setSelectedDbOption(option.id)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 text-xelia-accent">{option.icon}</div>
                <div>{option.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-2 block">Volumen mensual</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {volumeOptions.map((option) => (
            <div
              key={option.id}
              className={cn(
                "p-3 border rounded-lg cursor-pointer transition-all",
                selectedVolumeOption === option.id 
                  ? "border-xelia-accent text-foreground shadow-accent" 
                  : "border-border hover:border-muted-foreground/50"
              )}
              onClick={() => setSelectedVolumeOption(option.id)}
            >
              <div className="flex justify-between items-center">
                <div>{option.name}</div>
                <div className="font-medium text-xelia-accent">{option.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-2 block">Estilo de voz</Label>
        <Select value={selectedVoiceStyle} onValueChange={setSelectedVoiceStyle}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un estilo de voz" />
          </SelectTrigger>
          <SelectContent>
            {voiceStyles.map((style) => (
              <SelectItem key={style.id} value={style.id}>
                {style.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CustomConfiguration;
