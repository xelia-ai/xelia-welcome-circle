
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Integration } from '../integrationsData';

interface AvailableIntegrationsProps {
  unselectedIntegrations: Integration[];
  selectedIntegrations: string[];
  onIntegrationToggle: (id: string) => void;
}

const AvailableIntegrations: React.FC<AvailableIntegrationsProps> = ({
  unselectedIntegrations,
  selectedIntegrations,
  onIntegrationToggle
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <span className="h-5 w-5 mr-2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </span>
        Integraciones disponibles
      </h3>
      <div className="space-y-3">
        {unselectedIntegrations.slice(0, 4).map((integration) => (
          <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="mr-3 text-xl">{integration.logo}</div>
              <div>
                <p className="font-medium text-gray-900">{integration.name}</p>
                <p className="text-sm text-gray-500">{integration.description.slice(0, 60)}...</p>
              </div>
            </div>
            <Switch 
              id={`integration-${integration.id}`}
              className="data-[state=checked]:bg-gray-500"
              checked={selectedIntegrations.includes(integration.id)}
              onCheckedChange={() => onIntegrationToggle(integration.id)}
            />
          </div>
        ))}
        {unselectedIntegrations.length > 4 && (
          <Button variant="outline" className="w-full">
            Ver todas ({unselectedIntegrations.length})
          </Button>
        )}
      </div>
    </div>
  );
};

export default AvailableIntegrations;
