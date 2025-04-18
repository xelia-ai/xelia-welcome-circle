
import React from 'react';
import { Check } from 'lucide-react';
import { CapabilityItemProps } from './types';

const CapabilityItem: React.FC<CapabilityItemProps> = ({ capabilityId, name }) => {
  return (
    <div className="flex items-center p-3 rounded-lg bg-gray-700/30 border border-gray-700 hover:border-[#3EF3B0]/30 hover:bg-[#3EF3B0]/5 transition-all duration-300">
      <div className="w-8 h-8 mr-3 flex items-center justify-center text-[#3EF3B0] bg-[#3EF3B0]/10 rounded-full border border-[#3EF3B0]/30">
        <Check className="w-4 h-4" />
      </div>
      <span className="text-gray-300">{name || capabilityId}</span>
    </div>
  );
};

export default CapabilityItem;
