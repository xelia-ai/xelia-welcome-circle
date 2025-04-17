
import React from 'react';
import { Check, ChevronRight, AlertCircle } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface CapabilitiesSectionProps {
  capabilities: string[];
  capabilityNames: Record<string, string>;
  callsVolume: string;
  onEdit: () => void;
}

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  capabilities,
  capabilityNames,
  callsVolume,
  onEdit
}) => {
  const navigate = useNavigate();
  
  const handleEditClick = () => {
    navigate('/configure?step=capabilities');
  };
  
  return (
    <SectionContainer 
      title="Capacidades activadas" 
      onEdit={handleEditClick}
    >
      <div className="space-y-4">
        {capabilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((capabilityId) => (
              <div key={capabilityId} className="flex items-center p-3 rounded-lg bg-gray-700/30 border border-gray-700 hover:border-[#3EF3B0]/30 hover:bg-[#3EF3B0]/5 transition-all duration-300">
                <div className="w-8 h-8 mr-3 flex items-center justify-center text-[#3EF3B0] bg-[#3EF3B0]/10 rounded-full border border-[#3EF3B0]/30">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-gray-300">{capabilityNames[capabilityId] || capabilityId}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-gray-700/20 border border-gray-700">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-400" />
              <p className="text-orange-300 font-medium">Sin capacidades adicionales</p>
            </div>
            <p className="text-gray-400 ml-7">
              No has seleccionado capacidades adicionales para tu agente. Recomendamos seleccionar al menos una capacidad para mejorar la experiencia.
            </p>
          </div>
        )}
        
        <div className="p-4 rounded-lg bg-gray-800/40 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-medium">Volumen de llamadas</h4>
            <Badge className="bg-[#3EF3B0]/20 text-[#3EF3B0] border border-[#3EF3B0]/30">
              {callsVolume} llamadas/mes
            </Badge>
          </div>
          <p className="text-gray-400 text-sm">
            Número máximo de llamadas o interacciones mensuales que tu agente puede manejar.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CapabilitiesSection;
