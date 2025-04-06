
import React, { useState, useEffect } from 'react';
import { TrendingUp, Info, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { estimateBaseMetrics, BaseMetrics } from '@/utils/metricsEstimation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import CompetitiveAdvantage from './CompetitiveAdvantage';
import ROIMetricsTable from './ROIMetricsTable';
import { useROICalculations } from './useROICalculations';

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
  const totalCapabilities = 8;
  const capabilitiesCount = selectedCapabilities.length;

  return (
    <Card className="roi-module bg-gray-800/80 border border-gray-700 h-full w-full max-w-full m-0 p-0 box-border relative overflow-hidden self-start shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <CardHeader className="pb-0 pt-3">
        <CardTitle className="text-base font-medium text-white flex items-center">
          <TrendingUp className="w-4 h-4 mr-1.5 text-xelia-accent" />
          <span className="flex items-center">
            ROI y ventaja competitiva
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 ml-1.5 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] text-sm">
                El Retorno de Inversión (ROI) estima cuánto puedes mejorar tu negocio con Xelia, comparando tus métricas actuales contra las que puedes alcanzar al automatizar.
              </TooltipContent>
            </Tooltip>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        {/* ROI explanation */}
        <div className="bg-gray-700/30 rounded-lg p-3 mb-3 text-xs text-gray-300 leading-relaxed">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-xelia-accent flex-shrink-0 mt-0.5" />
            <p>
              Esta sección calcula el retorno estimado que puedes obtener según las capacidades que hayas activado para tu negocio.
            </p>
          </div>
        </div>
        
        {/* Competitive advantage component */}
        <CompetitiveAdvantage 
          capabilitiesCount={capabilitiesCount}
          totalCapabilities={totalCapabilities}
        />
        
        {/* ROI metrics table component */}
        <ROIMetricsTable 
          roiMetrics={roiMetrics}
          capabilitiesCount={capabilitiesCount}
          fullWidth={fullWidth}
        />

        {/* ROI Definition for when no capabilities are selected */}
        {capabilitiesCount === 0 && (
          <div className="mt-3 mb-2">
            <h5 className="text-white text-sm font-medium mb-1">¿Qué es ROI?</h5>
            <p className="text-gray-400 text-[14px] leading-relaxed">
              El Retorno de Inversión (ROI) estima cuánto puedes mejorar tu negocio con Xelia, comparando tus métricas actuales contra las que puedes alcanzar al automatizar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
