
import React from 'react';
import { CAPABILITIES } from '@/data/industries/common';
import SectionHeader from './SectionHeader';

interface CapabilitiesSectionProps {
  capabilities: string[];
  capabilityNames: string[];
  onEdit: () => void;
}

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  capabilities,
  capabilityNames,
  onEdit
}) => {
  const getCapabilityIcon = (capabilityId: string): string => {
    // Mapeo simple de iconos emojis según la categoría o ID específico
    const capabilityData = CAPABILITIES.find(cap => cap.id === capabilityId);
    
    if (!capabilityData) return '💡';
    
    // Asignar emoji según la categoría
    switch (capabilityData.category) {
      case 'communication':
        return '💬';
      case 'automation':
        return '⚙️';
      case 'intelligence':
        return '🧠';
      case 'integration':
        return '🔄';
      default:
        return '💡';
    }
  };

  return (
    <div className="mb-6 border-b border-gray-700 pb-6">
      <SectionHeader
        title="Capacidades"
        onEditClick={onEdit}
      />
      
      {capabilities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {capabilities.map((capId) => {
            const capability = CAPABILITIES.find(c => c.id === capId);
            return (
              <div key={capId} className="flex items-center">
                <span className="text-lg mr-2">{getCapabilityIcon(capId)}</span>
                <span className="text-gray-300">{capability?.name || capId}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 italic mt-2">No se seleccionaron capacidades adicionales</p>
      )}
    </div>
  );
};

export default CapabilitiesSection;
