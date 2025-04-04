
import React from 'react';
import { Building, X } from 'lucide-react';
import { Industry } from '@/types/industry';

interface IndustryPreviewProps {
  selectedIndustries: string[];
  industries: Industry[];
  onRemoveIndustry: (industryId: string) => void;
}

const IndustryPreview: React.FC<IndustryPreviewProps> = ({ 
  selectedIndustries, 
  industries,
  onRemoveIndustry
}) => {
  // Get details for the selected industry (for the preview panel)
  // If multiple are selected, show the last selected one
  const selectedIndustryData = selectedIndustries.length > 0
    ? industries.find(industry => industry.id === selectedIndustries[selectedIndustries.length - 1])
    : null;

  if (selectedIndustries.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-10">
        <div className="text-xelia-accent/40 mb-4">
          <Building className="w-12 h-12" />
        </div>
        <p className="text-gray-400 italic">
          Selecciona una o más industrias para ver los beneficios específicos
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-gradient">
          {selectedIndustries.length === 1
            ? (selectedIndustryData?.id === 'custom' 
              ? 'Solución personalizada' 
              : `Con Xelia en la industria ${selectedIndustryData?.name}`)
            : `Xelia para múltiples industrias (${selectedIndustries.length})`}
        </h3>
      </div>
      
      {selectedIndustries.length === 1 ? (
        // Single industry view
        <>
          <p className="text-gray-300 mb-5">
            {selectedIndustryData?.description}
          </p>
          <div className="mt-3 space-y-2 text-gray-300 text-sm">
            {selectedIndustryData?.valuePoints.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent"></div>
                {point}
              </li>
            ))}
          </div>
        </>
      ) : (
        // Multiple industries view
        <>
          <p className="text-gray-300 mb-5">
            Has seleccionado múltiples industrias. Xelia se adaptará para ofrecer un servicio optimizado para cada una.
          </p>
          <div className="space-y-3">
            <h4 className="text-white font-medium">Industrias seleccionadas:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedIndustries.map(id => {
                const industry = industries.find(ind => ind.id === id);
                return industry ? (
                  <div 
                    key={id} 
                    className="bg-xelia-accent/10 border border-xelia-accent/20 rounded-lg px-2 py-1 flex items-center gap-1"
                  >
                    <span className="text-gray-200 text-sm">{industry.name}</span>
                    <button 
                      className="text-gray-400 hover:text-white p-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveIndustry(id);
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IndustryPreview;
