
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useTipsData } from './hooks/useTipsData';
import TipContent from './components/TipContent';
import EmptyTipState from './components/EmptyTipState';
import TipIcon from './components/TipIcon';

interface TipsWidgetProps {
  selectedCapabilities: string[];
}

const TipsWidget: React.FC<TipsWidgetProps> = ({ selectedCapabilities }) => {
  const {
    currentTipIndex,
    setCurrentTipIndex,
    filteredTips,
    currentTip
  } = useTipsData(selectedCapabilities);

  const handlePreviousTip = () => {
    setCurrentTipIndex((prev) => (prev === 0 ? filteredTips.length - 1 : prev - 1));
  };

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % filteredTips.length);
  };

  const showNavigation = filteredTips.length > 1;

  return (
    <Card className="bg-gray-800/80 border border-gray-700 h-full w-full max-w-full m-0 p-0 box-border relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <CardHeader className="pb-0 pt-3 px-3 md:px-5">
        <CardTitle className="text-base font-medium text-white flex items-center">
          <Sparkles className="w-5 h-5 mr-1.5 text-yellow-400" />
          Consejos y estrategias
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 px-3 md:px-5 pb-4">
        <div className="relative min-h-[100px] flex flex-col">
          {filteredTips.length > 0 ? (
            <>
              <div className="flex items-center mb-1">
                <TipIcon iconName={currentTip.iconName} />
                <div className="flex-1"></div>
                {showNavigation && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePreviousTip}
                      className="p-1 rounded-full hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                      aria-label="Consejo anterior"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleNextTip}
                      className="p-1 rounded-full hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                      aria-label="Siguiente consejo"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                <TipContent key={currentTip.id} tip={currentTip} />
              </AnimatePresence>

              {/* Pagination dots */}
              {showNavigation && (
                <div className="flex justify-center space-x-1 mt-2">
                  {filteredTips.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTipIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentTipIndex
                          ? "w-4 bg-yellow-400"
                          : "w-1.5 bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`Ir al consejo ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <EmptyTipState />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsWidget;
