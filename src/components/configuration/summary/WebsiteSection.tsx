
import React from 'react';
import { Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SectionHeader from './SectionHeader';

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
        title="Sitio Web" 
        section="website" 
        editingSection={editingSection}
        onEditClick={() => startEditing('website')} 
        onCancel={cancelEditing}
        onSave={saveChanges}
      />
      
      {editingSection === 'website' ? (
        <div className="p-3 bg-gray-700/40 rounded-lg">
          <p className="text-sm text-gray-300 mb-2">Ingresa la URL de tu sitio web:</p>
          <Input 
            value={tempWebsite} 
            onChange={(e) => setTempWebsite(e.target.value)}
            placeholder="https://tuempresa.com"
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>
      ) : (
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-xelia-accent/10 text-xelia-accent mr-3">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <p className="text-white font-medium">{website || 'No ingresado'}</p>
            <p className="text-sm text-gray-400">Xelia analizará tu sitio web</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteSection;
