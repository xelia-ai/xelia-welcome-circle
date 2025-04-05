
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
  const efficiencyIncrease = Math.min(15 + (capabilitiesCount * 5), 40); // 15% base + 5% por capacidad, máximo 40%
  const satisfactionIncrease = Math.min(10 + (capabilitiesCount * 4), 35); // 10% base + 4% por capacidad, máximo 35%
  const conversionIncrease = Math.min(5 + (capabilitiesCount * 3), 25); // 5% base + 3% por capacidad, máximo 25%
  const timeReduction = Math.min(20 + (capabilitiesCount * 5), 50); // 20% base + 5% por capacidad, máximo 50%
  
  const roiMetrics: ROIMetric[] = [
    {
      title: "Eficiencia operativa",
      baseValue: "100%",
      improvedValue: `${100 + efficiencyIncrease}%`,
      improvement: `+${efficiencyIncrease}%`
    },
    {
      title: "Satisfacción del cliente",
      baseValue: "100%",
      improvedValue: `${100 + satisfactionIncrease}%`,
      improvement: `+${satisfactionIncrease}%`
    },
    {
      title: "Tasa de conversión",
      baseValue: "100%",
      improvedValue: `${100 + conversionIncrease}%`,
      improvement: `+${conversionIncrease}%`
    },
    {
      title: "Tiempo de respuesta",
      baseValue: "100%",
      improvedValue: `${100 - timeReduction}%`,
      improvement: `-${timeReduction}%`
    }
  ];

  // Mensajes de ventaja competitiva basados en la cantidad de capacidades
  const getCompetitiveMessage = () => {
    if (capabilitiesCount === 0) {
      return "Activa capacidades para ver tu ventaja competitiva";
    } else if (capabilitiesCount <= 2) {
      return "Ventaja básica sobre la competencia";
    } else if (capabilitiesCount <= 4) {
      return "Ventaja significativa sobre la competencia";
    } else {
      return "Ventaja máxima sobre la competencia";
    }
  };

  const competitiveMessage = getCompetitiveMessage();
  const competitiveAdvantage = capabilitiesCount === 0 ? 0 : (capabilitiesCount * 15);

  return (
    <Card className="bg-gray-800/60 border border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-xelia-accent" />
          ROI y ventaja competitiva
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ventaja competitiva */}
        <div className="bg-xelia-accent/10 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white font-medium">Ventaja competitiva</h4>
            <span className="text-xelia-accent font-bold">{competitiveAdvantage}%</span>
          </div>
          <p className="text-sm text-gray-300">{competitiveMessage}</p>
          
          {/* Barra de progreso */}
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
            <div 
              className="bg-xelia-accent h-2.5 rounded-full" 
              style={{ width: `${(competitiveAdvantage / 100) * 100}%` }}
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
