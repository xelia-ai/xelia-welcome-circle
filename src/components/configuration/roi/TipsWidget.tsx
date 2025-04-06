
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence } from 'framer-motion';

// Import our new components
import TipContent from './components/TipContent';
import TipIcon from './components/TipIcon';
import EmptyTipState from './components/EmptyTipState';
import { useTipsData } from './hooks/useTipsData';

interface TipsWidgetProps {
  selectedCapabilities: string[];
}

const TipsWidget: React.FC<TipsWidgetProps> = ({ selectedCapabilities }) => {
  const { filteredTips, currentTip } = useTipsData(selectedCapabilities);

  // If no tips are available, show the empty state
  if (filteredTips.length === 0) {
    return (
      <Card className="bg-gray-800/80 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] h-full">
        <CardContent className="p-6 flex flex-col h-full justify-center">
          <EmptyTipState />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/80 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] h-full transition-all duration-300 hover:border-white/15">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-lg bg-xelia-accent/20 mr-4 flex-shrink-0">
              <AnimatePresence mode="wait">
                <TipIcon currentTip={currentTip} />
              </AnimatePresence>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium mb-2">¿Sabías que...?</h3>
              <AnimatePresence mode="wait">
                <TipContent currentTip={currentTip} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsWidget;
