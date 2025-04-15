
import React, { useState, useEffect } from 'react';
import { TrendingUp, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { estimateBaseMetrics, BaseMetrics } from '@/utils/metricsEstimation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import CompetitiveAdvantage from './CompetitiveAdvantage';
import { useROICalculations } from './useROICalculations';
import { useIsMobile } from '@/hooks/use-mobile';
import { CAPABILITIES } from '@/data/industries/common';

interface ROICalculatorProps {
  selectedCapabilities: string[];
  website?: string;
  fullWidth?: boolean;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ 
  selectedCapabilities, 
  website = '',
  fullWidth = false
}) => {
  const [baseMetrics, setBaseMetrics] = useState<BaseMetrics>({
    efficiency: 75,
    satisfaction: 70,
    conversion: 35,
    responseTime: 85
  });
  
  const isMobile = useIsMobile();

  // Calculate base metrics from website
  useEffect(() => {
    if (website) {
      const websiteMetrics = estimateBaseMetrics(website);
      setBaseMetrics(websiteMetrics);
    }
  }, [website]);
  
  // Get ROI metrics using custom hook
  const { roiMetrics } = useROICalculations(selectedCapabilities, baseMetrics);
  
  // Constants
  const totalCapabilities = CAPABILITIES.length;
  const capabilitiesCount = selectedCapabilities.length;
  
  // Calcular métricas dinámicas basadas en capacidades seleccionadas
  const efficiencyBoost = 20 + capabilitiesCount * 3;
  const satisfactionBoost = 15 + capabilitiesCount * 4;
  const conversionBoost = 10 + capabilitiesCount * 2;

  return (
    <Card className="roi-module bg-gray-800/80 border border-gray-700 h-full w-full max-w-full m-0 p-0 box-border relative overflow-hidden self-start shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <CardHeader className="pb-0 pt-3 px-3 md:px-5">
        <CardTitle className="text-base font-medium text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-1.5 text-xelia-accent" />
          <span className="flex items-center">
            ROI y ventaja competitiva
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 ml-1.5 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "top"} className="max-w-[300px] text-sm">
                El Retorno de Inversión (ROI) estima cuánto puedes mejorar tu negocio con Xelia, comparando tus métricas actuales contra las que puedes alcanzar al automatizar.
              </TooltipContent>
            </Tooltip>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 px-3 md:px-5">
        {/* Competitive advantage component */}
        <CompetitiveAdvantage 
          capabilitiesCount={capabilitiesCount}
          totalCapabilities={totalCapabilities}
        />
        
        {/* Only show ROI message when capabilities are selected */}
        {capabilitiesCount > 0 ? (
          <div className="mt-3 bg-gray-700/30 rounded-lg p-4">
            <p className="text-sm text-gray-200 leading-relaxed">
              Con {capabilitiesCount} capacidades activadas, tu negocio puede:
            </p>
            <ul className="mt-2 text-sm space-y-1.5 text-gray-200">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent mr-2"></div>
                Aumentar la eficiencia operativa hasta un <span className="text-xelia-accent font-medium">{efficiencyBoost}%</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent mr-2"></div>
                Mejorar la satisfacción del cliente hasta un <span className="text-xelia-accent font-medium">{satisfactionBoost}%</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent mr-2"></div>
                Incrementar las conversiones hasta un <span className="text-xelia-accent font-medium">{conversionBoost}%</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm italic my-3">
            Selecciona capacidades para ver una estimación de ROI
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
