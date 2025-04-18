
import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TipContent from './components/TipContent';
import EmptyTipState from './components/EmptyTipState';
import { Tip } from './types';
import { useTipsData } from './hooks/useTipsData';
import { cn } from '@/lib/utils';

interface TipsWidgetProps {
  selectedCapabilities: string[];
}

const TipsWidget: React.FC<TipsWidgetProps> = ({ selectedCapabilities }) => {
  const { filteredTips } = useTipsData(selectedCapabilities);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handlePrevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + filteredTips.length) % filteredTips.length);
  };

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % filteredTips.length);
  };

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 h-auto backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-md mr-3 bg-[#3EF3B0]/20 border border-[#3EF3B0]/30 text-[#3EF3B0]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-medium text-white">Consejos y estrategias</h3>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="p-2 h-8 w-8"
            onClick={handlePrevTip}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="p-2 h-8 w-8"
            onClick={handleNextTip}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {filteredTips.length > 0 ? (
        <TipContent 
          key={filteredTips[currentTipIndex].id} 
          tip={filteredTips[currentTipIndex]} 
        />
      ) : (
        <EmptyTipState />
      )}
    </div>
  );
};

export default TipsWidget;
