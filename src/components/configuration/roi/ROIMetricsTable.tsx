
import React from 'react';
import { cn } from '@/lib/utils';
import { ROIMetric } from './types';

interface ROIMetricsTableProps {
  roiMetrics: ROIMetric[];
  capabilitiesCount: number; 
  fullWidth?: boolean;
}

const ROIMetricsTable: React.FC<ROIMetricsTableProps> = ({
  roiMetrics,
  capabilitiesCount,
  fullWidth = false
}) => {
  // Just show the first two metrics (efficiency and satisfaction)
  const displayMetrics = roiMetrics.slice(0, 2);
  
  return (
    <div className="mt-3">
      {capabilitiesCount > 0 ? (
        <div className={cn(
          "bg-gray-700/30 rounded-lg overflow-hidden",
          fullWidth ? "w-full" : "w-[calc(100%-8px)]"
        )}>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-1.5 px-2 text-xs font-medium text-center text-gray-300 border-b border-r border-gray-600">
                  MÉTRICA
                </th>
                <th className="py-1.5 px-2 text-xs font-medium text-center text-gray-300 border-b border-r border-gray-600">
                  EFICIENCIA OPERATIVA
                </th>
                <th className="py-1.5 px-2 text-xs font-medium text-center text-gray-300 border-b border-gray-600">
                  SATISFACCIÓN DEL CLIENTE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1.5 px-2 text-xs text-center text-gray-400 border-r border-gray-600">
                  Valor Actual
                </td>
                {displayMetrics.map((metric) => (
                  <td key={`current-${metric.name}`} className="py-1.5 px-2 text-xs text-center text-gray-300 border-r border-gray-600 last:border-r-0">
                    {metric.current}%
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-700/30">
                <td className="py-1.5 px-2 text-xs text-center text-gray-400 border-r border-gray-600">
                  Con Xelia
                </td>
                {displayMetrics.map((metric) => (
                  <td key={`improved-${metric.name}`} className="py-1.5 px-2 text-xs text-center text-gray-300 border-r border-gray-600 last:border-r-0">
                    {metric.improved}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-xs text-center text-gray-400 border-r border-gray-600">
                  Mejora estimada
                </td>
                {displayMetrics.map((metric) => (
                  <td key={`increase-${metric.name}`} className="py-1.5 px-2 text-xs text-center font-medium text-xelia-accent border-r border-gray-600 last:border-r-0">
                    +{metric.percentIncrease}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-2 text-sm text-gray-400 italic">
          Selecciona capacidades para ver tu ventaja competitiva
        </div>
      )}
    </div>
  );
};

export default ROIMetricsTable;
