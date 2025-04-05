
import React from 'react';
import SectionHeader from './SectionHeader';
import TrainingTabs from './TrainingTabs';
import TrainingStatusDisplay from './TrainingStatusDisplay';

interface WebsiteSectionProps {
  website: string;
  tempWebsite: string;
  editingSection: string | null;
  setTempWebsite: (website: string) => void;
  startEditing: (section: string) => void;
  cancelEditing: () => void;
  saveChanges: (section: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

const WebsiteSection: React.FC<WebsiteSectionProps> = ({
  website,
  tempWebsite,
  editingSection,
  setTempWebsite,
  startEditing,
  cancelEditing,
  saveChanges
}) => {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
      <SectionHeader 
        title="Entrenamiento" 
        section="website" 
        editingSection={editingSection}
        onEditClick={() => startEditing('website')} 
        onCancel={cancelEditing}
        onSave={saveChanges}
      />
      
      {editingSection === 'website' ? (
        <div className="p-3 bg-gray-700/40 rounded-lg mt-4 animate-in slide-in-from-top duration-300">
          <TrainingTabs 
            tempWebsite={tempWebsite}
            setTempWebsite={setTempWebsite}
          />
        </div>
      ) : (
        <TrainingStatusDisplay website={website} />
      )}
    </div>
  );
};

export default WebsiteSection;
