
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { CircleDollarSign, TrendingUp, Shield } from 'lucide-react';

interface CapabilitiesCalculatorProps {
  selectedCapabilities: string[];
}

const CapabilitiesCalculator: React.FC<CapabilitiesCalculatorProps> = ({ 
  selectedCapabilities 
}) => {
  // Calcular costo base y por capacidad
  const baseCost = 29; // Costo base mensual
  const costPerCapability = 12; // Costo adicional por cada capacidad
  const totalCost = baseCost + (selectedCapabilities.length * costPerCapability);
  
  // Calcular porcentaje de ventaja competitiva (0-100%)
  const maxCapabilities = 6; // Total de capacidades disponibles
  const competitiveAdvantage = Math.min(100, Math.round((selectedCapabilities.length / maxCapabilities) * 100));
  
  return (
    <Card className="border-gray-700 bg-gray-800/60 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-xelia-accent/20 to-transparent pb-4 border-b border-gray-700">
        <CardTitle className="text-white flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5" />
          Calculadora de valor
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Costo Mensual */}
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-md font-medium text-white flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-2 text-xelia-accent" />
              Costo mensual estimado
            </h4>
            <span className="text-xl font-bold text-white">
              ${totalCost}
              <span className="text-sm text-gray-400 ml-1">/mes</span>
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Incluye: costo base (${baseCost}) + {selectedCapabilities.length} capacidades seleccionadas
          </div>
        </div>

        {/* Ventaja Competitiva */}
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-md font-medium text-white flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              Ventaja competitiva
            </h4>
            <span className="text-xl font-bold text-white">
              {competitiveAdvantage}%
            </span>
          </div>
          <Slider 
            value={[competitiveAdvantage]} 
            max={100}
            disabled
            className="cursor-default"
          />
          <div className={`text-xs ${competitiveAdvantage > 75 ? 'text-green-400' : competitiveAdvantage > 50 ? 'text-yellow-400' : 'text-gray-400'}`}>
            {competitiveAdvantage <= 25 && "Básico: Funcionalidad mínima para interactuar con clientes."}
            {competitiveAdvantage > 25 && competitiveAdvantage <= 50 && "Estándar: Buena base para empezar a destacar en tu industria."}
            {competitiveAdvantage > 50 && competitiveAdvantage <= 75 && "Avanzado: Superas a la mayoría de tu competencia directa."}
            {competitiveAdvantage > 75 && "Premium: Máxima ventaja competitiva en tu mercado."}
          </div>
        </div>

        {/* Mensaje de Capacidades */}
        <div className="bg-xelia-accent/10 border border-xelia-accent/20 rounded-lg p-4 mt-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-xelia-accent mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-gray-300">
                {selectedCapabilities.length === 0 
                  ? "Selecciona al menos una capacidad para tu agente Xelia."
                  : selectedCapabilities.length < 3
                    ? "Añade más capacidades para potenciar a Xelia y mejorar la experiencia de tus clientes."
                    : "¡Excelente selección! Xelia está configurada para maximizar la satisfacción de tus clientes."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapabilitiesCalculator;
