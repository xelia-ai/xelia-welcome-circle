
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import TipContent from './components/TipContent';
import EmptyTipState from './components/EmptyTipState';
import { Tip } from './types';
import { useTipsData } from './hooks/useTipsData';
import { cn } from '@/lib/utils';

interface TipsWidgetProps {
  selectedCapabilities: string[];
}

const TipsWidget: React.FC<TipsWidgetProps> = ({ selectedCapabilities }) => {
  const { tips } = useTipsData(selectedCapabilities);
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [lastChange, setLastChange] = useState(Date.now());
  const [iconColor, setIconColor] = useState('#3EF3B0');

  useEffect(() => {
    if (tips.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveTipIndex((prev) => (prev + 1) % tips.length);
      setLastChange(Date.now());
      
      // Change icon color with each tip change
      const colors = ['#3EF3B0', '#FFD644', '#FF7A50', '#61A6F9'];
      setIconColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 h-full backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <div 
          className={cn(
            "p-2 rounded-md mr-3 transition-colors duration-500",
            "bg-opacity-20 border border-opacity-30"
          )}
          style={{ 
            backgroundColor: `${iconColor}20`, 
            borderColor: `${iconColor}50`,
            color: iconColor
          }}
        >
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-medium text-white">Consejos y estrategias</h3>
      </div>
      
      {tips.length > 0 ? (
        <div className="min-h-[160px] flex items-center">
          {tips.map((tip: Tip, index: number) => (
            <TipContent 
              key={tip.id}
              tip={tip}
              isActive={index === activeTipIndex} 
              lastChange={lastChange}
            />
          ))}
        </div>
      ) : (
        <EmptyTipState />
      )}
    </div>
  );
};

export default TipsWidget;
