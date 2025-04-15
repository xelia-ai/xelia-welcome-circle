
import React from 'react';
import { CAPABILITIES, VOLUME_PRICING } from '@/data/industries/common';
import SectionHeader from '@/components/configuration/summary/SectionHeader';

interface CapabilitiesSectionProps {
  capabilities: string[];
  capabilityNames: string[];
  callsVolume: string;
  onEdit: () => void;
}

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  capabilities,
  capabilityNames,
  callsVolume,
  onEdit
}) => {
  const getCapabilityIcon = (capabilityId: string): string => {
    // Simple emoji icon mapping based on category or specific ID
    const capabilityData = CAPABILITIES.find(cap => cap.id === capabilityId);
    
    if (!capabilityData) return '💡';
    
    // Assign emoji based on category
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

  const getVolumeLabel = () => {
    switch (callsVolume) {
      case '500': return '0–500 llamadas mensuales';
      case '1000': return '500–1000 llamadas mensuales';
      case '5000': return '1000–5000 llamadas mensuales';
      case 'unlimited': return 'Llamadas ilimitadas';
      default: return 'Volumen de llamadas no especificado';
    }
  };

  // These are placeholder functions required by the SectionHeader component
  const handleCancel = () => {
    console.log('Cancel editing capabilities');
  };

  const handleSave = (section: 'industry' | 'website' | 'capabilities' | 'integrations') => {
    console.log('Save capabilities', section);
  };

  return (
    <div className="mb-6 border-b border-gray-700 pb-6">
      <SectionHeader
        title="Capacidades"
        section="capabilities"
        editingSection={null} // Not in editing mode by default
        onEditClick={onEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />
      
      <div className="mb-4 mt-3 p-3 bg-gray-800/80 rounded-lg">
        <h4 className="text-white font-medium mb-1">📞 Volumen de llamadas</h4>
        <p className="text-gray-300">{getVolumeLabel()}</p>
      </div>
      
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
