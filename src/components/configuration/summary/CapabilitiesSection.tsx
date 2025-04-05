
import React from 'react';
import { Globe, Brain, Calendar, Database, Clock, RefreshCw, FileSearch } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import CapabilitiesSelection from '../CapabilitiesSelection';
import SectionHeader from './SectionHeader';

interface CapabilityInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CapabilitiesSectionProps {
  capabilities: string[];
  tempCapabilities: string[];
  editingSection: string | null;
  setTempCapabilities: (capabilities: string[]) => void;
  startEditing: (section: string) => void;
  cancelEditing: () => void;
  saveChanges: (section: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  capabilities,
  tempCapabilities,
  editingSection,
  setTempCapabilities,
  startEditing,
  cancelEditing,
  saveChanges
}) => {
  const capabilityList: CapabilityInfo[] = [
    { id: 'multi-language', name: 'Multilingüe', icon: <Globe className="w-4 h-4" /> },
    { id: 'conversation-memory', name: 'Memoria de conversaciones', icon: <Brain className="w-4 h-4" /> },
    { id: 'appointment-scheduling', name: 'Programación de citas', icon: <Calendar className="w-4 h-4" /> },
    { id: 'real-time-data', name: 'Datos en tiempo real', icon: <Database className="w-4 h-4" /> },
    { id: 'whatsapp-integration', name: 'Integración con WhatsApp', icon: <IconBrandWhatsapp size={16} /> },
    { id: 'follow-ups', name: 'Seguimiento automático', icon: <Clock className="w-4 h-4" /> },
    { id: 'rescheduling', name: 'Reprogramación inteligente', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'database-search', name: 'Búsqueda en base de datos', icon: <FileSearch className="w-4 h-4" /> }
  ];

  const getSelectedCapabilities = () => {
    return capabilityList.filter(cap => capabilities.includes(cap.id));
  };

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
      <SectionHeader 
        title="Capacidades" 
        section="capabilities" 
        editingSection={editingSection}
        onEditClick={() => startEditing('capabilities')} 
        onCancel={cancelEditing}
        onSave={saveChanges}
      />
      
      {editingSection === 'capabilities' ? (
        <div className="p-2 bg-gray-700/40 rounded-lg">
          <p className="text-sm text-gray-300 mb-3">Selecciona las capacidades:</p>
          <CapabilitiesSelection 
            selectedCapabilities={tempCapabilities}
            onChange={setTempCapabilities}
          />
        </div>
      ) : (
        getSelectedCapabilities().length > 0 ? (
          <ul className="space-y-3">
            {getSelectedCapabilities().map(cap => (
              <li key={cap.id} className="flex items-center">
                <div className="p-1 rounded-full bg-xelia-accent/10 text-xelia-accent mr-2">
                  {cap.icon}
                </div>
                <span className="text-gray-300">{cap.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No se seleccionaron capacidades</p>
        )
      )}
    </div>
  );
};

export default CapabilitiesSection;
