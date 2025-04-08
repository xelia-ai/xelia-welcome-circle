
import React from 'react';
import { Globe, Brain, Calendar, Database, Clock, RefreshCw, FileSearch, Mail } from 'lucide-react';
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
  website?: string;
  setTempCapabilities: (capabilities: string[]) => void;
  startEditing: (section: string) => void;
  cancelEditing: () => void;
  saveChanges: (section: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  capabilities,
  tempCapabilities,
  editingSection,
  website = '',
  setTempCapabilities,
  startEditing,
  cancelEditing,
  saveChanges
}) => {
  const capabilityList: CapabilityInfo[] = [
    { id: 'multi-language', name: 'Multilingüe', icon: <Globe className="w-5 h-5" /> },
    { id: 'conversation-memory', name: 'Memoria de conversaciones', icon: <Brain className="w-5 h-5" /> },
    { id: 'appointment-scheduling', name: 'Programación de citas', icon: <Calendar className="w-5 h-5" /> },
    { id: 'real-time-data', name: 'Datos en tiempo real', icon: <Database className="w-5 h-5" /> },
    { id: 'whatsapp-integration', name: 'Integración con WhatsApp', icon: <IconBrandWhatsapp size={20} /> },
    { id: 'follow-ups', name: 'Seguimiento automático', icon: <Clock className="w-5 h-5" /> },
    { id: 'rescheduling', name: 'Reprogramación inteligente', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'database-search', name: 'Búsqueda en base de datos', icon: <FileSearch className="w-5 h-5" /> },
    { id: 'email-notes', name: 'Notas por correo al cliente', icon: <Mail className="w-5 h-5" /> }
  ];

  const getSelectedCapabilities = () => {
    return capabilityList.filter(cap => capabilities.includes(cap.id));
  };

  return (
    <div className="bg-white border border-xelia-gray-light rounded-lg p-5">
      <SectionHeader 
        title="Capacidades" 
        section="capabilities" 
        editingSection={editingSection}
        onEditClick={() => startEditing('capabilities')} 
        onCancel={cancelEditing}
        onSave={saveChanges}
      />
      
      {editingSection === 'capabilities' ? (
        <div className="p-2 bg-xelia-gray-light/20 rounded-lg">
          <p className="text-sm text-xelia-gray-dark mb-3">Selecciona las capacidades:</p>
          <CapabilitiesSelection 
            selectedCapabilities={tempCapabilities}
            onChange={setTempCapabilities}
            website={website}
          />
        </div>
      ) : (
        getSelectedCapabilities().length > 0 ? (
          <ul className="space-y-3">
            {getSelectedCapabilities().map(cap => (
              <li key={cap.id} className="flex items-center">
                <div className="p-1.5 w-8 h-8 rounded-full bg-[#3EF3B0]/10 text-[#3EF3B0] mr-3 flex items-center justify-center">
                  {cap.icon}
                </div>
                <span className="text-xelia-gray-dark">{cap.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xelia-gray-medium italic">No se seleccionaron capacidades</p>
        )
      )}
    </div>
  );
};

export default CapabilitiesSection;
