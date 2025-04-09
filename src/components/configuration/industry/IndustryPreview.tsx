
import React from 'react';
import { Industry } from '@/types/industry';
import { 
  EmptyIndustryState,
  IndustryValuePoints,
  IndustryTags,
  IndustryDescription
} from './';

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
  // Obtener detalles de las industrias seleccionadas
  const selectedIndustriesData = selectedIndustries.map(id => 
    industries.find(industry => industry.id === id)
  ).filter(Boolean) as Industry[];

  // Si no hay industrias seleccionadas, mostrar un mensaje
  if (selectedIndustries.length === 0) {
    return <EmptyIndustryState />;
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">
          {selectedIndustries.length === 1
            ? `Xelia para ${selectedIndustriesData[0]?.name}`
            : `Xelia para ${selectedIndustries.length} industrias`}
        </h3>
      </div>
      
      {/* Superpoderes de Xelia */}
      <IndustryValuePoints selectedIndustriesData={selectedIndustriesData} />
      
      {/* Etiquetas de industrias seleccionadas */}
      <IndustryTags 
        selectedIndustriesData={selectedIndustriesData}
        onRemoveIndustry={onRemoveIndustry}
      />
      
      {/* Breve descripción del beneficio principal */}
      <IndustryDescription selectedIndustriesData={selectedIndustriesData} />
    </div>
  );
};

export default IndustryPreview;
