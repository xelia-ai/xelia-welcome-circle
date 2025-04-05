
import React from 'react';
import IntegrationsSelection from '../IntegrationsSelection';
import SectionHeader from './SectionHeader';

interface IntegrationInfo {
  id: string;
  name: string;
  logo: string;
}

interface IntegrationsSectionProps {
  integrations: string[];
  tempIntegrations: string[];
  editingSection: string | null;
  setTempIntegrations: (integrations: string[]) => void;
  startEditing: (section: string) => void;
  cancelEditing: () => void;
  saveChanges: (section: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  integrations,
  tempIntegrations,
  editingSection,
  setTempIntegrations,
  startEditing,
  cancelEditing,
  saveChanges
}) => {
  const integrationList: IntegrationInfo[] = [
    { id: 'whatsapp', name: 'WhatsApp', logo: '🟢' },
    { id: 'google-calendar', name: 'Google Calendar', logo: '📅' },
    { id: 'hubspot', name: 'HubSpot CRM', logo: '🔶' },
    { id: 'zapier', name: 'Zapier', logo: '⚡' },
    { id: 'slack', name: 'Slack', logo: '💬' },
    { id: 'salesforce', name: 'Salesforce', logo: '☁️' }
  ];

  const getSelectedIntegrations = () => {
    return integrationList.filter(int => integrations.includes(int.id));
  };

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
      <SectionHeader 
        title="Integraciones" 
        section="integrations" 
        editingSection={editingSection}
        onEditClick={() => startEditing('integrations')} 
        onCancel={cancelEditing}
        onSave={saveChanges}
      />
      
      {editingSection === 'integrations' ? (
        <div className="p-2 bg-gray-700/40 rounded-lg">
          <p className="text-sm text-gray-300 mb-3">Gestiona tus integraciones:</p>
          <IntegrationsSelection 
            selectedIntegrations={tempIntegrations}
            onChange={setTempIntegrations}
          />
        </div>
      ) : (
        getSelectedIntegrations().length > 0 ? (
          <ul className="space-y-3">
            {getSelectedIntegrations().map(int => (
              <li key={int.id} className="flex items-center">
                <span className="text-xl mr-2">{int.logo}</span>
                <span className="text-gray-300">{int.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No se conectaron integraciones</p>
        )
      )}
    </div>
  );
};

export default IntegrationsSection;
