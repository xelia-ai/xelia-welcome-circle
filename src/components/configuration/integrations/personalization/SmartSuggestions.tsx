
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Integration } from '../integrationsData';

interface SmartSuggestionsProps {
  suggestedIntegrations: Integration[];
  selectedIntegrations: string[];
  onIntegrationToggle: (id: string) => void;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  suggestedIntegrations,
  selectedIntegrations,
  onIntegrationToggle
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center text-white">
        <span className="h-5 w-5 mr-2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="M12 3v4"/><path d="m19 7-3 3"/><path d="m5 7 3 3"/><path d="M8 19l3-3"/><path d="m16 19-3-3"/><path d="M12 15v4"/><path d="M19 17h4"/><path d="M15 7h4"/><path d="M1 17h4"/><path d="M5 7H1"/></svg>
        </span>
        Sugerencias inteligentes
      </h3>
      <div className="space-y-3">
        {suggestedIntegrations.map((integration) => (
          <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-800/80 rounded-lg border border-gray-700">
            <div className="flex items-center">
              <div className="mr-3 text-xl">{integration.logo}</div>
              <div>
                <div className="flex items-center">
                  <p className="font-medium text-white">{integration.name}</p>
                  <span className="ml-2 px-2 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded-full">Recomendado</span>
                </div>
                <p className="text-sm text-gray-400">Ideal para tu industria</p>
              </div>
            </div>
            <Switch 
              id={`suggestion-${integration.id}`}
              checked={selectedIntegrations.includes(integration.id)}
              onCheckedChange={() => onIntegrationToggle(integration.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestions;
