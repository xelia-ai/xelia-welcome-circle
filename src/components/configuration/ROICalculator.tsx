
import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { estimateBaseMetrics, BaseMetrics } from '@/utils/metricsEstimation';
import CompetitiveAdvantage from './roi/CompetitiveAdvantage';
import ROIMetricsTable from './roi/ROIMetricsTable';
import { useROICalculations } from './roi/useROICalculations';

interface ROICalculatorProps {
  selectedCapabilities: string[];
  website?: string;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ 
  selectedCapabilities, 
  website = ''
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
    <Card className="bg-gray-800/80 border border-gray-700 h-full">
      <CardHeader className="pb-1 pt-4">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-xelia-accent" />
          ROI y ventaja competitiva
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {/* Competitive advantage component */}
        <CompetitiveAdvantage 
          capabilitiesCount={capabilitiesCount}
          totalCapabilities={totalCapabilities}
        />
        
        {/* ROI metrics table component */}
        <ROIMetricsTable 
          roiMetrics={roiMetrics}
          capabilitiesCount={capabilitiesCount}
        />
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
