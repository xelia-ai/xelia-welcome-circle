
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface PriceBreakdownItemProps {
  label: string;
  value: number;
  tooltip?: string;
  animation?: React.ReactNode;
}

const PriceBreakdownItem: React.FC<PriceBreakdownItemProps> = ({ 
  label, 
  value, 
  tooltip,
  animation
}) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400 flex items-center">
        {label}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertCircle className="w-3.5 h-3.5 ml-1 text-gray-500 cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[220px] text-xs">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
      </span>
      
      <div className="flex items-center">
        {animation}
        <span className="text-white font-medium">${value} USD</span>
      </div>
    </div>
  );
};

export default PriceBreakdownItem;
