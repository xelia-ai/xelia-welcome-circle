
import React from 'react';
import { Building } from 'lucide-react';
import IndustrySelectionWrapper from '../IndustrySelectionWrapper';
import SectionHeader from './SectionHeader';

interface IndustrySectionProps {
  industryNames: string[];
  tempIndustries: string[];
  tempIndustryNames: string[];
  editingSection: string | null;
  setTempIndustries: (industries: string[]) => void;
  setTempIndustryNames: (names: string[]) => void;
  startEditing: (section: string) => void;
  cancelEditing: () => void;
  saveChanges: (section: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

const IndustrySection: React.FC<IndustrySectionProps> = ({
  industryNames,
  tempIndustries,
  tempIndustryNames,
  editingSection,
  setTempIndustries,
  setTempIndustryNames,
  startEditing,
  cancelEditing,
  saveChanges
}) => {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
      <SectionHeader 
        title="Industria" 
        section="industry" 
        editingSection={editingSection}
        onEditClick={() => startEditing('industry')} 
        onCancel={cancelEditing}
        onSave={saveChanges}
      />
      
      {editingSection === 'industry' ? (
        <div className="p-2 bg-gray-700/40 rounded-lg">
          <p className="text-sm text-gray-300 mb-3">Selecciona tu industria:</p>
          <IndustrySelectionWrapper
            selectedIndustries={tempIndustries}
            onSelect={(industries, industryNames) => {
              setTempIndustries(industries);
              setTempIndustryNames(industryNames);
            }}
          />
        </div>
      ) : (
        <div className="flex items-start">
          <div className="p-2 rounded-full bg-xelia-accent/10 text-xelia-accent mr-3 mt-1">
            <Building className="h-5 w-5" />
          </div>
          <div>
            {industryNames.length > 0 ? (
              <>
                {industryNames.length === 1 ? (
                  <p className="text-white font-medium">{industryNames[0]}</p>
                ) : (
                  <>
                    <p className="text-white font-medium mb-2">Múltiples industrias ({industryNames.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {industryNames.map((name, index) => (
                        <span 
                          key={index} 
                          className="inline-block bg-xelia-accent/10 text-gray-200 text-xs px-2 py-1 rounded-md"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-white font-medium">No seleccionada</p>
            )}
            <p className="text-sm text-gray-400 mt-1">Configuración para tu industria específica</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustrySection;
