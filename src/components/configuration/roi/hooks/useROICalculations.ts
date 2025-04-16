
import { useState, useEffect } from 'react';
import { BaseMetrics } from '@/utils/metricsEstimation';
import { ROIMetric } from '../types';

export const useROICalculations = (
  selectedCapabilities: string[],
  baseMetrics: BaseMetrics
) => {
  const [roiMetrics, setRoiMetrics] = useState<ROIMetric[]>([]);
  
  useEffect(() => {
    // Constants for ROI calculations
    const totalCapabilities = 8;
    const capabilitiesCount = selectedCapabilities.length;
    
    // Calculate increases based on selected capabilities
    const efficiencyIncrease = Math.min(15 + (capabilitiesCount * (25 / totalCapabilities)), 40);
    const satisfactionIncrease = Math.min(10 + (capabilitiesCount * (25 / totalCapabilities)), 35);
    const conversionIncrease = Math.min(5 + (capabilitiesCount * (20 / totalCapabilities)), 25);
    const timeReduction = Math.min(20 + (capabilitiesCount * (30 / totalCapabilities)), 50);
    
    // Create metrics data
    const metrics: ROIMetric[] = [
      {
        title: "Eficiencia operativa",
        baseValue: `${baseMetrics.efficiency}%`,
        baseNumeric: baseMetrics.efficiency,
        improvedValue: `${Math.round(baseMetrics.efficiency * (1 + efficiencyIncrease/100))}%`,
        improvement: `+${Math.round(efficiencyIncrease)}%`,
        // Add compatibility fields
        name: "efficiency",
        current: baseMetrics.efficiency,
        improved: Math.round(baseMetrics.efficiency * (1 + efficiencyIncrease/100)),
        percentIncrease: Math.round(efficiencyIncrease)
      },
      {
        title: "Satisfacción del cliente",
        baseValue: `${baseMetrics.satisfaction}%`,
        baseNumeric: baseMetrics.satisfaction,
        improvedValue: `${Math.round(baseMetrics.satisfaction * (1 + satisfactionIncrease/100))}%`,
        improvement: `+${Math.round(satisfactionIncrease)}%`,
        // Add compatibility fields
        name: "satisfaction",
        current: baseMetrics.satisfaction,
        improved: Math.round(baseMetrics.satisfaction * (1 + satisfactionIncrease/100)),
        percentIncrease: Math.round(satisfactionIncrease)
      },
      {
        title: "Tasa de conversión",
        baseValue: `${baseMetrics.conversion}%`,
        baseNumeric: baseMetrics.conversion,
        improvedValue: `${Math.round(baseMetrics.conversion * (1 + conversionIncrease/100))}%`,
        improvement: `+${Math.round(conversionIncrease)}%`,
        // Add compatibility fields
        name: "conversion",
        current: baseMetrics.conversion,
        improved: Math.round(baseMetrics.conversion * (1 + conversionIncrease/100)),
        percentIncrease: Math.round(conversionIncrease)
      },
      {
        title: "Tiempo de respuesta",
        baseValue: `${baseMetrics.responseTime}%`,
        baseNumeric: baseMetrics.responseTime,
        improvedValue: `${Math.round(baseMetrics.responseTime * (1 - timeReduction/100))}%`,
        improvement: `-${Math.round(timeReduction)}%`,
        // Add compatibility fields
        name: "responseTime",
        current: baseMetrics.responseTime,
        improved: Math.round(baseMetrics.responseTime * (1 - timeReduction/100)),
        percentIncrease: -Math.round(timeReduction)
      }
    ];
    
    setRoiMetrics(metrics);
  }, [selectedCapabilities, baseMetrics]);
  
  return { roiMetrics };
};
