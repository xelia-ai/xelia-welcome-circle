
import React from 'react';
import { AlertCircle } from 'lucide-react';
import SectionContainer from './SectionContainer';
import CapabilityItem from './CapabilityItem';
import VolumeDisplay from './VolumeDisplay';
import { CapabilitySummaryProps } from './types';

const CapabilitiesSection: React.FC<CapabilitySummaryProps> = ({
  capabilities,
  capabilityNames,
  callsVolume,
  onEdit
}) => {
  return (
    <SectionContainer 
      title="Capacidades activadas" 
      onEdit={onEdit}
    >
      <div className="space-y-4">
        {capabilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((capabilityId) => (
              <CapabilityItem
                key={capabilityId}
                capabilityId={capabilityId}
                name={capabilityNames[capabilityId] || capabilityId}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-gray-700/20 border border-gray-700">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-400" />
              <p className="text-orange-300 font-medium">Sin capacidades adicionales</p>
            </div>
            <p className="text-gray-400 ml-7">
              No has seleccionado capacidades adicionales para tu agente. Recomendamos seleccionar al menos una capacidad para mejorar la experiencia.
            </p>
          </div>
        )}
        
        <VolumeDisplay callsVolume={callsVolume} />
      </div>
    </SectionContainer>
  );
};

export default CapabilitiesSection;
