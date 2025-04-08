
import React from 'react';
import { Building, X, Zap, ArrowRight } from 'lucide-react';
import { Industry } from '@/types/industry';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      <Card className="bg-gradient-to-br from-xelia-accent/20 to-blue-900/30 border-xelia-accent/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-white flex items-center">
            <Zap className="w-4 h-4 text-xelia-accent mr-1" /> 
            Superpoderes de Xelia
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-1.5">
            {selectedIndustries.length === 1 ? (
              // Mostrar los beneficios específicos para una sola industria
              selectedIndustriesData[0]?.valuePoints.slice(0, 3).map((point, index) => (
                <li key={index} className="flex items-start text-sm gap-2">
                  <ArrowRight className="h-3 w-3 text-xelia-accent mt-1" />
                  <span className="text-gray-200">{point}</span>
                </li>
              ))
            ) : (
              // Mostrar beneficios generales para múltiples industrias
              <li className="text-sm text-gray-200">
                Xelia se adaptará específicamente a cada una de las industrias seleccionadas,
                ofreciendo soluciones optimizadas para cada contexto.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
      
      {/* Etiquetas de industrias seleccionadas */}
      {selectedIndustries.length > 0 && (
        <div>
          <h4 className="text-sm text-gray-300 mb-2">Industrias seleccionadas:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedIndustriesData.map(industry => (
              <div 
                key={industry.id} 
                className="bg-xelia-accent/10 border border-xelia-accent/20 rounded-full px-2.5 py-1 flex items-center gap-1.5"
              >
                <div className="text-xelia-accent text-xs">
                  {industry.icon}
                </div>
                <span className="text-gray-200 text-xs">{industry.name}</span>
                <button 
                  className="text-gray-400 hover:text-white p-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveIndustry(industry.id);
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Breve descripción del beneficio principal */}
      {selectedIndustries.length === 1 && (
        <p className="text-sm text-gray-300 mt-3 border-t border-gray-700 pt-3">
          {selectedIndustriesData[0]?.description}
        </p>
      )}
    </div>
  );
};

export default IndustryPreview;
