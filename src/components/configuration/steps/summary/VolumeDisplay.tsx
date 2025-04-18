
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { VolumeDisplayProps } from './types';

const VolumeDisplay: React.FC<VolumeDisplayProps> = ({ callsVolume }) => {
  return (
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
  );
};

export default VolumeDisplay;
