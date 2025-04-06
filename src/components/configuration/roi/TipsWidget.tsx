
import React from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import TipContent from './components/TipContent';
import EmptyTipState from './components/EmptyTipState';
import { useTipsData } from './hooks/useTipsData';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';

interface TipsWidgetProps {
  selectedCapabilities: string[];
}

const TipsWidget: React.FC<TipsWidgetProps> = ({ selectedCapabilities }) => {
  const { currentTipIndex, setCurrentTipIndex, filteredTips } = useTipsData(selectedCapabilities);
  const isMobile = useIsMobile();
  
  const hasTips = filteredTips.length > 0;
  
  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <div className="bg-gray-700/50 p-2 md:p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-gray-300 mr-2" />
          <h3 className="text-white text-sm md:text-base font-medium">¿Sabías que...?</h3>
        </div>
        
        {hasTips && filteredTips.length > 1 && !isMobile && (
          <div className="flex space-x-1">
            {filteredTips.map((_, idx) => (
              <button
                key={`tip-dot-${idx}`}
                onClick={() => setCurrentTipIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentTipIndex ? 'bg-xelia-accent' : 'bg-gray-600'
                }`}
                aria-label={`Tip ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {hasTips ? (
        isMobile ? (
          <Carousel className="w-full">
            <CarouselContent>
              {filteredTips.map((tip, index) => (
                <CarouselItem key={tip.id}>
                  <TipContent tip={tip} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end p-2 space-x-2">
              <CarouselPrevious className="relative static h-7 w-7" />
              <CarouselNext className="relative static h-7 w-7" />
            </div>
          </Carousel>
        ) : (
          <div className="relative">
            <TipContent tip={filteredTips[currentTipIndex]} />
            
            {filteredTips.length > 1 && (
              <div className="absolute bottom-2 right-2 flex space-x-1">
                <button 
                  onClick={() => setCurrentTipIndex((currentTipIndex - 1 + filteredTips.length) % filteredTips.length)}
                  className="p-1 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  aria-label="Tip anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setCurrentTipIndex((currentTipIndex + 1) % filteredTips.length)}
                  className="p-1 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  aria-label="Siguiente tip"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        <EmptyTipState />
      )}
    </div>
  );
};

export default TipsWidget;
