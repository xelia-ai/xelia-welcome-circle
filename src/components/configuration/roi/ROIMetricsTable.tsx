
import React from 'react';

export interface ROIMetric {
  title: string;
  baseValue: string;
  baseNumeric: number;
  improvedValue: string;
  improvement: string;
}

interface ROIMetricsTableProps {
  roiMetrics: ROIMetric[];
  capabilitiesCount: number;
}

const ROIMetricsTable: React.FC<ROIMetricsTableProps> = ({
  roiMetrics,
  capabilitiesCount
}) => {
  return (
    <div className="w-full mt-3">
      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-800/70">
            <tr>
              <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/3">
                Métrica
              </th>
              <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actual
              </th>
              <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Con Xelia
              </th>
              <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Mejora
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {roiMetrics.map((metric, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/50'}>
                <td className="px-2 py-1.5 text-xs text-white">
                  {metric.title}
                </td>
                <td className="px-2 py-1.5 text-xs text-center font-medium">
                  {metric.baseValue}
                </td>
                <td className="px-2 py-1.5 text-xs text-center font-medium">
                  {metric.improvedValue}
                </td>
                <td className="px-2 py-1.5 text-xs font-medium text-xelia-accent text-center">
                  {metric.improvement}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {capabilitiesCount === 0 && (
          <p className="text-gray-400 italic text-center text-xs py-1 px-2">
            Selecciona capacidades para calcular el ROI estimado
          </p>
        )}
      </div>
    </div>
  );
};

export default ROIMetricsTable;
