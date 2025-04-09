
import React from 'react';
import { Building } from 'lucide-react';

const EmptyIndustryState: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-6">
      <div className="text-xelia-accent/40 mb-3">
        <Building className="w-10 h-10" />
      </div>
      <h3 className="text-white font-medium mb-1">Potencia tu negocio</h3>
      <p className="text-gray-400 text-sm">
        Selecciona una o más industrias para ver cómo Xelia puede transformar tu operación
      </p>
    </div>
  );
};

export default EmptyIndustryState;
