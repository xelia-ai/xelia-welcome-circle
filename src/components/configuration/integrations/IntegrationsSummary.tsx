
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface IntegrationsSummaryProps {
  selectedIntegrations: string[];
  integrationNames: Record<string, string>;
  premiumFeatures: string[];
  getPremiumFeatureName: (id: string) => string;
}

const IntegrationsSummary: React.FC<IntegrationsSummaryProps> = ({
  selectedIntegrations,
  integrationNames,
  premiumFeatures,
  getPremiumFeatureName
}) => {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-medium mb-4 text-white flex items-center">
        <CheckCircle2 className="w-5 h-5 mr-2 text-xelia-accent" />
        Resumen de integraciones
      </h3>
      
      {selectedIntegrations.length > 0 || premiumFeatures.length > 0 ? (
        <div>
          <p className="text-gray-300 mb-3">
            Has conectado las siguientes integraciones:
          </p>
          <ul className="list-disc list-inside text-white space-y-1">
            {selectedIntegrations.map((integrationId) => {
              return <li key={integrationId}>{integrationNames[integrationId] || integrationId}</li>;
            })}
            
            {premiumFeatures.length > 0 && (
              <>
                <li className="text-xelia-accent font-semibold pt-2">Integraciones Avanzadas:</li>
                {premiumFeatures.map((featureId) => {
                  return <li key={featureId} className="ml-4 text-xelia-accent/90">{getPremiumFeatureName(featureId)}</li>;
                })}
              </>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-gray-400 italic">
          No tienes ninguna integración conectada. Las integraciones son opcionales y puedes configurarlas más tarde.
        </p>
      )}
    </div>
  );
};

export default IntegrationsSummary;
