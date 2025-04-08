
import React from 'react';
import { cn } from '@/lib/utils';
import { Industry } from '@/types/industry';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from 'lucide-react';

interface IndustryCardProps {
  industry: Industry;
  isSelected: boolean;
  onToggle: (industryId: string) => void;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ industry, isSelected, onToggle }) => {
  return (
    <div
      key={industry.id}
      className={cn(
        "frosted-glass rounded-lg p-3 cursor-pointer transition-all duration-200 relative group flex flex-col h-full bg-gray-800/90",
        isSelected 
          ? "border-xelia-accent bg-xelia-accent/5 shadow-accent" 
          : "hover:border-white/20 hover:shadow-elegant-hover"
      )}
      onClick={() => onToggle(industry.id)}
    >
      <div className="flex items-start gap-2">
        <div className={cn(
          "p-1.5 rounded-lg transition-all duration-300", 
          isSelected 
            ? "bg-xelia-accent text-white" 
            : "bg-xelia-light/70 text-gray-300 group-hover:bg-xelia-accent/20 group-hover:text-white"
        )}>
          {industry.icon}
        </div>
        
        <div className="flex-1">
          <h3 className={cn(
            "text-base font-medium",
            isSelected ? "text-xelia-accent" : "text-white"
          )}>
            {industry.name}
          </h3>
        </div>
        
        {/* Indicador de selección */}
        <div>
          <div className={cn(
            "w-4 h-4 rounded-full flex items-center justify-center transition-all",
            isSelected 
              ? "border-2 border-xelia-accent" 
              : "border border-gray-500"
          )}>
            {isSelected && <div className="w-2 h-2 rounded-full bg-xelia-accent"></div>}
          </div>
        </div>
      </div>
      
      <div className="mt-2 space-y-1">
        {industry.valuePoints.slice(0, 2).map((point, index) => (
          <div key={index} className="flex items-start gap-1.5 text-xs">
            <div className="min-w-[4px] h-[4px] rounded-full bg-xelia-accent mt-1.5"></div>
            <p className="text-gray-300">{point}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-2 text-right">
        <Dialog>
          <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="text-xelia-accent text-xs hover:text-xelia-accent-light transition-colors inline-flex items-center">
              <InfoIcon size={12} className="mr-1" /> Detalles
            </button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white border border-gray-700">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <span className="p-1.5 rounded-lg bg-xelia-accent/20 text-xelia-accent">
                  {industry.icon}
                </span>
                Xelia para {industry.name}
              </DialogTitle>
            </DialogHeader>
            <div className="my-2">
              <p className="mb-4 text-gray-300">{industry.detailedDescription}</p>
              <h4 className="font-medium text-white mb-2">Principales beneficios:</h4>
              <ul className="space-y-2">
                {industry.valuePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="min-w-[6px] h-[6px] rounded-full bg-xelia-accent mt-1.5"></div>
                    <p className="text-gray-300">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default IndustryCard;
