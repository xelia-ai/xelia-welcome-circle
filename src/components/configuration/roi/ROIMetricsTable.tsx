
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  fullWidth?: boolean;
}

const tooltipDescriptions: Record<string, string> = {
  "Eficiencia operativa": "Capacidad para gestionar las tareas con un uso óptimo de recursos",
  "Satisfacción del cliente": "Nivel de conformidad de los clientes con el servicio recibido",
  "Tasa de conversión": "Porcentaje de visitantes que realizan una acción deseada",
  "Tiempo de respuesta": "Velocidad a la que se responde a las consultas de clientes"
};

const ROIMetricsTable: React.FC<ROIMetricsTableProps> = ({
  roiMetrics,
  capabilitiesCount,
  fullWidth = false
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile vertical layout
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
        </div>
      </div>
    );
  }

  // Desktop horizontal layout
  return (
    <div className="w-full mt-3">
      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full">
          {capabilitiesCount > 0 ? (
            <>
              <thead className="bg-gray-800/70">
                <tr>
                  <th className="px-2 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider w-1/5">
                    Métrica
                  </th>
                  {roiMetrics.map((metric, index) => (
                    <th key={index} className="px-4 py-3 text-center text-sm font-medium text-white">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center space-x-1 cursor-help">
                              <span>{metric.title}</span>
                              <InfoIcon className="h-3.5 w-3.5 text-gray-400" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{tooltipDescriptions[metric.title] || metric.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr className="bg-gray-800/30">
                  <td className="px-4 py-3 text-sm font-medium text-gray-300">
                    Valor Actual
                  </td>
                  {roiMetrics.map((metric, index) => (
                    <td key={index} className="px-4 py-3 text-sm text-center font-medium text-white">
                      {metric.baseValue}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-300">
                    Valor con Xelia
                  </td>
                  {roiMetrics.map((metric, index) => (
                    <td key={index} className="px-4 py-3 text-sm text-center font-medium text-white">
                      {metric.improvedValue}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-800/30">
                  <td className="px-4 py-3 text-sm font-medium text-gray-300">
                    Mejora estimada
                  </td>
                  {roiMetrics.map((metric, index) => (
                    <td key={index} className="px-4 py-3 text-sm text-center font-bold text-xelia-accent">
                      {metric.improvement}
                    </td>
                  ))}
                </tr>
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td colSpan={5} className="text-gray-400 italic text-center text-sm py-4 px-2">
                  Selecciona capacidades para calcular el ROI estimado
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {capabilitiesCount > 0 && (
        <p className="text-gray-400 text-center text-xs mt-2 italic">
          Tu ventaja ya no es una promesa, es una métrica.
        </p>
      )}
    </div>
  );
};

export default ROIMetricsTable;
