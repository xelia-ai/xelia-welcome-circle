
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

// Import our components
import TipContent from './components/TipContent';
import TipIcon from './components/TipIcon';
import EmptyTipState from './components/EmptyTipState';
import { useTipsData } from './hooks/useTipsData';

// Import carousel for mobile
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TipsWidgetProps {
  selectedCapabilities: string[];
}

const TipsWidget: React.FC<TipsWidgetProps> = ({ selectedCapabilities }) => {
  const { filteredTips, currentTip, setCurrentTipIndex, currentTipIndex } = useTipsData(selectedCapabilities);
  const isMobile = useIsMobile();

  // If no tips are available, show the empty state
  if (filteredTips.length === 0) {
    return (
      <Card className="bg-gray-800/80 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] h-full">
        <CardContent className="p-4 md:p-6 flex flex-col h-full justify-center">
          <EmptyTipState />
        </CardContent>
      </Card>
    );
  }

  // Mobile UI with Carousel
  if (isMobile) {
    return (
      <Card className="bg-gray-800/80 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] h-full transition-all duration-300 hover:border-white/15">
        <CardContent className="p-4 flex flex-col h-full">
          <h3 className="text-white text-lg font-medium mb-3 text-center">¿Sabías que...?</h3>
          
          <Carousel
            opts={{ loop: true }}
            className="w-full"
            onSelect={(index) => setCurrentTipIndex(index)}
          >
            <CarouselContent>
              {filteredTips.map((tip, index) => (
                <CarouselItem key={tip.id}>
                  <div className="p-1">
                    <div className="flex flex-col items-center">
                      <div className="p-2 rounded-lg bg-gray-700/50 mb-3 flex-shrink-0">
                        <TipIcon currentTip={tip} />
                      </div>
                      <TipContent currentTip={tip} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-4 space-x-1">
              {filteredTips.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentTipIndex ? 
                    'w-4 bg-gray-300' : 
                    'w-1.5 bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </CardContent>
      </Card>
    );
  }

  // Desktop UI
  return (
    <Card className="bg-gray-800/80 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] h-full transition-all duration-300 hover:border-white/15">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-lg bg-gray-700/50 mr-4 flex-shrink-0">
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
