
import React from 'react';
import { TrendingUp, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ROICalculatorProps {
  selectedCapabilities: string[];
}

interface ROIMetric {
  title: string;
  baseValue: string;
  improvedValue: string;
  improvement: string;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ selectedCapabilities }) => {
  // Calculamos el ROI basado en la cantidad de capacidades seleccionadas
  const capabilitiesCount = selectedCapabilities.length;
  const totalCapabilities = 8; // Total number of capabilities
  
  // Adjust the calculations to scale with the new total number of capabilities
  const efficiencyIncrease = Math.min(15 + (capabilitiesCount * (25 / totalCapabilities)), 40); 
  const satisfactionIncrease = Math.min(10 + (capabilitiesCount * (25 / totalCapabilities)), 35); 
  const conversionIncrease = Math.min(5 + (capabilitiesCount * (20 / totalCapabilities)), 25); 
  const timeReduction = Math.min(20 + (capabilitiesCount * (30 / totalCapabilities)), 50); 
  
  const roiMetrics: ROIMetric[] = [
    {
      title: "Eficiencia operativa",
      baseValue: "100%",
      improvedValue: `${100 + efficiencyIncrease}%`,
      improvement: `+${Math.round(efficiencyIncrease)}%`
    },
    {
      title: "Satisfacción del cliente",
      baseValue: "100%",
      improvedValue: `${100 + satisfactionIncrease}%`,
      improvement: `+${Math.round(satisfactionIncrease)}%`
    },
    {
      title: "Tasa de conversión",
      baseValue: "100%",
      improvedValue: `${100 + conversionIncrease}%`,
      improvement: `+${Math.round(conversionIncrease)}%`
    },
    {
      title: "Tiempo de respuesta",
      baseValue: "100%",
      improvedValue: `${100 - timeReduction}%`,
      improvement: `-${Math.round(timeReduction)}%`
    }
  ];

  // Mensajes de ventaja competitiva basados en la cantidad de capacidades
  const getCompetitiveMessage = () => {
    if (capabilitiesCount === 0) {
      return "Activa capacidades para ver tu ventaja competitiva";
    } else if (capabilitiesCount <= totalCapabilities * 0.25) {
      return "Ventaja básica sobre la competencia";
    } else if (capabilitiesCount <= totalCapabilities * 0.5) {
      return "Ventaja significativa sobre la competencia";
    } else if (capabilitiesCount <= totalCapabilities * 0.75) {
      return "Ventaja notable sobre la competencia";
    } else {
      return "Ventaja máxima sobre la competencia";
    }
  };

  const competitiveMessage = getCompetitiveMessage();
  const competitiveAdvantage = capabilitiesCount === 0 ? 0 : Math.min(capabilitiesCount * (100 / totalCapabilities), 100);

  return (
    <Card className="bg-gray-800/80 border border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-xelia-accent" />
          ROI y ventaja competitiva
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ventaja competitiva */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white font-medium">Ventaja competitiva</h4>
            <span className="text-xelia-accent font-bold">{Math.round(competitiveAdvantage)}%</span>
          </div>
          <p className="text-sm text-gray-300">{competitiveMessage}</p>
          
          {/* Barra de progreso */}
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
            <div 
              className="bg-xelia-accent h-2.5 rounded-full" 
              style={{ width: `${competitiveAdvantage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Tabla de ROI */}
        <div className="overflow-hidden rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Métrica
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Con Xelia
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Mejora
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-700">
              {roiMetrics.map((metric, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                    {metric.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {metric.baseValue}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {metric.improvedValue}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-xelia-accent">
                    {metric.improvement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {capabilitiesCount === 0 && (
          <p className="text-gray-400 italic text-center text-sm mt-2">
            Selecciona capacidades para calcular el ROI estimado
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
