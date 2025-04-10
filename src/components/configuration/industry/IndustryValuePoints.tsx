
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
    <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-white flex items-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center justify-center mr-2 shadow-[0_0_8px_rgba(139,92,246,0.5)]">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent font-semibold">
            Superpoderes de Xelia
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2.5">
          {singleIndustry ? (
            // Mostrar los beneficios específicos para una sola industria
            selectedIndustriesData[0]?.valuePoints.slice(0, 3).map((point, index) => (
              <li key={index} className="flex items-start text-sm gap-2 group transition-all duration-300 hover:translate-x-1">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <ArrowRight className="h-3 w-3 text-purple-400 group-hover:text-purple-300" />
                </div>
                <span className="text-gray-200 group-hover:text-white transition-colors duration-300">{point}</span>
              </li>
            ))
          ) : (
            // Mostrar beneficios generales para múltiples industrias
            <li className="flex items-start text-sm gap-2 group">
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <ArrowRight className="h-3 w-3 text-purple-400" />
              </div>
              <span className="text-gray-200">
                Xelia se adaptará específicamente a cada una de las industrias seleccionadas,
                ofreciendo soluciones optimizadas para cada contexto.
              </span>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default IndustryValuePoints;
