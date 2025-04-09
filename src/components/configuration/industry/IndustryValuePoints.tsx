
import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Industry } from '@/types/industry';

interface IndustryValuePointsProps {
  selectedIndustriesData: Industry[];
}

const IndustryValuePoints: React.FC<IndustryValuePointsProps> = ({ selectedIndustriesData }) => {
  const singleIndustry = selectedIndustriesData.length === 1;

  return (
    <Card className="bg-gradient-to-br from-xelia-accent/20 to-blue-900/30 border-xelia-accent/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-white flex items-center">
          <Zap className="w-4 h-4 text-xelia-accent mr-1" /> 
          Superpoderes de Xelia
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-1.5">
          {singleIndustry ? (
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
  );
};

export default IndustryValuePoints;
