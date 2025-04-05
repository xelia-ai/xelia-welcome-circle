
import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";

interface ConfigOption {
  id: string;
  name: string;
  icon?: React.ReactNode;
  price?: string;
}

interface CustomConfigurationProps {
  dbOptions: ConfigOption[];
  volumeOptions: ConfigOption[];
  voiceStyles: ConfigOption[];
  selectedDbOption: string | null;
  selectedVolumeOption: string | null;
  selectedVoiceStyle: string | null;
  setSelectedDbOption: (id: string) => void;
  setSelectedVolumeOption: (id: string) => void;
  setSelectedVoiceStyle: (id: string) => void;
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
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <span className="h-5 w-5 mr-2 text-xelia-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </span>
        Configura a tu medida
      </h3>
      
      <div className="space-y-6">
        {/* Database selection */}
        <div>
          <Label className="block mb-2 text-sm font-medium">Base de datos a usar</Label>
          <div className="grid grid-cols-2 gap-2">
            {dbOptions.map(option => (
              <Toggle
                key={option.id}
                pressed={selectedDbOption === option.id}
                onPressedChange={() => setSelectedDbOption(option.id)}
                className="flex justify-start gap-2 h-auto py-2"
              >
                {option.icon}
                <span>{option.name}</span>
              </Toggle>
            ))}
          </div>
        </div>
        
        {/* Volume selection */}
        <div>
          <Label className="block mb-2 text-sm font-medium">Volumen estimado de llamadas</Label>
          <div className="grid grid-cols-2 gap-2">
            {volumeOptions.map(option => (
              <Toggle
                key={option.id}
                pressed={selectedVolumeOption === option.id}
                onPressedChange={() => setSelectedVolumeOption(option.id)}
                className="flex flex-col items-start gap-1 h-auto py-2"
              >
                <span>{option.name}</span>
                <span className="text-xs text-gray-500">{option.price}</span>
              </Toggle>
            ))}
          </div>
        </div>
        
        {/* Voice style selection */}
        <div>
          <Label className="block mb-2 text-sm font-medium">Estilo de voz del agente</Label>
          <div className="grid grid-cols-2 gap-2">
            {voiceStyles.map(style => (
              <Toggle
                key={style.id}
                pressed={selectedVoiceStyle === style.id}
                onPressedChange={() => setSelectedVoiceStyle(style.id)}
                className="flex justify-start gap-2 h-auto py-2"
              >
                <span>{style.name}</span>
              </Toggle>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomConfiguration;
