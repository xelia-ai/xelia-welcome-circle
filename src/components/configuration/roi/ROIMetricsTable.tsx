
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
  
  // Only show the first two metrics (Eficiencia operativa and Satisfacción del cliente)
  const limitedMetrics = roiMetrics.slice(0, 2);

  if (isMobile) {
    // Mobile vertical layout
    return (
      <div className="w-full mt-3">
        <div className="rounded-lg border border-gray-700 overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-800/70">
              <tr>
                <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-1/3">
                  Métrica
                </th>
                <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Eficiencia Operativa
                </th>
                <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Satisfacción del Cliente
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="bg-gray-800/30">
                <td className="px-2 py-1.5 text-xs text-center font-medium text-gray-300">
                  Valor Actual
                </td>
                <td className="px-2 py-1.5 text-xs text-center font-medium text-white">
                  {limitedMetrics[0]?.baseValue || "-"}
                </td>
                <td className="px-2 py-1.5 text-xs text-center font-medium text-white">
                  {limitedMetrics[1]?.baseValue || "-"}
                </td>
              </tr>
              <tr className="bg-gray-800/50">
                <td className="px-2 py-1.5 text-xs text-center font-medium text-gray-300">
                  Con Xelia
                </td>
                <td className="px-2 py-1.5 text-xs text-center font-medium text-white">
                  {limitedMetrics[0]?.improvedValue || "-"}
                </td>
                <td className="px-2 py-1.5 text-xs text-center font-medium text-white">
                  {limitedMetrics[1]?.improvedValue || "-"}
                </td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="px-2 py-1.5 text-xs text-center font-medium text-gray-300">
                  Mejora
                </td>
                <td className="px-2 py-1.5 text-xs font-medium text-xelia-accent text-center">
                  {limitedMetrics[0]?.improvement || "-"}
                </td>
                <td className="px-2 py-1.5 text-xs font-medium text-xelia-accent text-center">
                  {limitedMetrics[1]?.improvement || "-"}
                </td>
              </tr>
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
        <table className="w-full table-auto">
          {capabilitiesCount > 0 ? (
            <>
              <thead className="bg-gray-800/70">
                <tr>
                  <th className="px-3 py-3 text-center text-sm font-medium text-gray-300 uppercase tracking-wider w-1/3">
                    Métrica
                  </th>
                  <th className="px-3 py-3 text-center text-sm font-medium text-white">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center space-x-1 cursor-help">
                            <span>Eficiencia Operativa</span>
                            <InfoIcon className="h-3.5 w-3.5 text-gray-400" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{tooltipDescriptions["Eficiencia operativa"]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </th>
                  <th className="px-3 py-3 text-center text-sm font-medium text-white">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center space-x-1 cursor-help">
                            <span>Satisfacción del Cliente</span>
                            <InfoIcon className="h-3.5 w-3.5 text-gray-400" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{tooltipDescriptions["Satisfacción del cliente"]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr className="bg-gray-800/30">
                  <td className="px-4 py-3 text-sm font-medium text-gray-300 text-center">
                    Valor Actual
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-white">
                    {limitedMetrics[0]?.baseValue || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-white">
                    {limitedMetrics[1]?.baseValue || "-"}
                  </td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-300 text-center">
                    Valor con Xelia
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-white">
                    {limitedMetrics[0]?.improvedValue || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-white">
                    {limitedMetrics[1]?.improvedValue || "-"}
                  </td>
                </tr>
                <tr className="bg-gray-800/30">
                  <td className="px-4 py-3 text-sm font-medium text-gray-300 text-center">
                    Mejora estimada
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-xelia-accent">
                    {limitedMetrics[0]?.improvement || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-xelia-accent">
                    {limitedMetrics[1]?.improvement || "-"}
                  </td>
                </tr>
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td colSpan={3} className="text-gray-400 italic text-center text-sm py-4 px-2">
                  Selecciona capacidades para calcular el ROI estimado
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {capabilitiesCount > 0 && (
        <p className="text-gray-400 text-center text-xs mt-3 mb-1 italic">
          Tu ventaja ya no es una promesa, es una métrica.
        </p>
      )}
    </div>
  );
};

export default ROIMetricsTable;
