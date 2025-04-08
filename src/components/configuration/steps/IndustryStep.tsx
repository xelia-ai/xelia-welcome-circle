
import React from 'react';
import IndustrySelection from '@/components/configuration/IndustrySelection';

interface IndustryStepProps {
  selectedIndustries: string[];
  onSelect: (industries: string[], industryNames: string[]) => void;
}

const IndustryStep: React.FC<IndustryStepProps> = ({ 
  selectedIndustries, 
  onSelect 
}) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl text-white font-medium mb-1">Personaliza Xelia para tu industria</h2>
        <p className="text-gray-300">Selecciona una o más industrias para obtener una configuración optimizada para tus necesidades específicas.</p>
      </div>
      
      <IndustrySelection 
        selectedIndustries={selectedIndustries} 
        onSelect={onSelect}
      />
    </div>
  );
};

export default IndustryStep;
