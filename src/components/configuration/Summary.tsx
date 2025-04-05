
import React, { useState } from 'react';
import IndustrySection from './summary/IndustrySection';
import WebsiteSection from './summary/WebsiteSection';
import CapabilitiesSection from './summary/CapabilitiesSection';
import IntegrationsSection from './summary/IntegrationsSection';
import CompletionMessage from './summary/CompletionMessage';

interface SummaryProps {
  config: {
    industry: string;
    industryName: string;
    industries?: string[];
    industryNames?: string[];
    website: string;
    capabilities: string[];
    integrations: string[];
  };
  onEdit: (step: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

const Summary: React.FC<SummaryProps> = ({ config, onEdit }) => {
  // Estados para manejar edición in-situ
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempWebsite, setTempWebsite] = useState(config.website);
  const [tempIndustries, setTempIndustries] = useState(config.industries || []);
  const [tempIndustryNames, setTempIndustryNames] = useState(config.industryNames || []);
  const [tempCapabilities, setTempCapabilities] = useState(config.capabilities);
  const [tempIntegrations, setTempIntegrations] = useState(config.integrations);

  // Función para iniciar edición
  const startEditing = (section: string) => {
    setEditingSection(section);
  };

  // Función para cancelar edición
  const cancelEditing = () => {
    setTempWebsite(config.website);
    setTempIndustries(config.industries || []);
    setTempIndustryNames(config.industryNames || []);
    setTempCapabilities(config.capabilities);
    setTempIntegrations(config.integrations);
    setEditingSection(null);
  };

  // Función para guardar cambios
  const saveChanges = (section: 'industry' | 'website' | 'capabilities' | 'integrations') => {
    // Aquí implementaremos la lógica para guardar los cambios en el estado global
    // Por ahora, sólo cerraremos el modo de edición
    onEdit(section); // Pasamos los cambios al componente padre
    setEditingSection(null);
  };

  // Get industry names from either the new or old format
  const getIndustryNames = (): string[] => {
    if (config.industryNames && config.industryNames.length) {
      return config.industryNames;
    } else if (config.industryName) {
      return [config.industryName];
    }
    return [];
  };

  const industryNames = getIndustryNames();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <IndustrySection 
        industryNames={industryNames}
        tempIndustries={tempIndustries}
        tempIndustryNames={tempIndustryNames}
        editingSection={editingSection}
        setTempIndustries={setTempIndustries}
        setTempIndustryNames={setTempIndustryNames}
        startEditing={startEditing}
        cancelEditing={cancelEditing}
        saveChanges={saveChanges}
      />

      <WebsiteSection 
        website={config.website}
        tempWebsite={tempWebsite}
        editingSection={editingSection}
        setTempWebsite={setTempWebsite}
        startEditing={startEditing}
        cancelEditing={cancelEditing}
        saveChanges={saveChanges}
      />

      <CapabilitiesSection 
        capabilities={config.capabilities}
        tempCapabilities={tempCapabilities}
        editingSection={editingSection}
        setTempCapabilities={setTempCapabilities}
        startEditing={startEditing}
        cancelEditing={cancelEditing}
        saveChanges={saveChanges}
      />

      <IntegrationsSection 
        integrations={config.integrations}
        tempIntegrations={tempIntegrations}
        editingSection={editingSection}
        setTempIntegrations={setTempIntegrations}
        startEditing={startEditing}
        cancelEditing={cancelEditing}
        saveChanges={saveChanges}
      />

      <CompletionMessage />
    </div>
  );
};

export default Summary;
