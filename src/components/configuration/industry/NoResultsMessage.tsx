
import React from 'react';
import { Info } from 'lucide-react';
import { toast } from "sonner";

interface NoResultsMessageProps {
  showNoResults: boolean;
  handleSelectCustom: () => void;
  noIndustries: boolean;
}

const NoResultsMessage: React.FC<NoResultsMessageProps> = ({ 
  showNoResults, 
  handleSelectCustom, 
  noIndustries 
}) => {
  if (showNoResults) {
    return (
      <div className="col-span-2 p-6 bg-gray-800/40 rounded-xl border border-gray-700">
        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-gray-700/50 rounded-full p-3 mb-3">
            <Info className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-white font-medium mb-2">No encontramos tu industria</h3>
          <p className="text-gray-400 mb-4">¿Qué tal si pruebas con la opción personalizada?</p>
          
          <button 
            onClick={handleSelectCustom} 
            className="bg-xelia-accent/10 hover:bg-xelia-accent/20 transition-colors text-xelia-accent border border-xelia-accent/30 rounded-lg px-4 py-2"
          >
            Seleccionar opción personalizada
          </button>
        </div>
      </div>
    );
  }
  
  if (noIndustries) {
    return (
      <div className="col-span-2 text-center p-6 bg-gray-800/40 rounded-xl border border-gray-700">
        <p className="text-gray-400">No se encontraron industrias que coincidan con tu búsqueda.</p>
      </div>
    );
  }
  
  return null;
};

export default NoResultsMessage;
