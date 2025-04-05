
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
    <div className="overflow-x-auto w-full">
      <div className="overflow-hidden rounded-lg border border-gray-700 min-w-full">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
                Métrica
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
                Actual
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
                Con Xelia
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
                Mejora
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/30 divide-y divide-gray-700">
            {roiMetrics.map((metric, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-sm text-white">
                  {metric.title}
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  {metric.baseValue}
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  {metric.improvedValue}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-xelia-accent">
                  {metric.improvement}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {capabilitiesCount === 0 && (
          <p className="text-gray-400 italic text-center text-sm py-3 px-4">
            Selecciona capacidades para calcular el ROI estimado
          </p>
        )}
      </div>
    </div>
  );
};

export default ROIMetricsTable;
