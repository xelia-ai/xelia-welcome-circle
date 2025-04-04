
import React from 'react';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Industry } from '@/types/industry';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        "relative frosted-glass p-4 rounded-xl cursor-pointer transition-all hover:shadow-elegant-hover group",
        isSelected 
          ? "border-xelia-accent bg-xelia-accent/5" 
          : "border-white/10 bg-xelia-light/30"
      )}
      onClick={() => onToggle(industry.id)}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={cn(
          "p-2.5 rounded-lg transition-all duration-300", 
          isSelected 
            ? "bg-xelia-accent text-white shadow-accent" 
            : "bg-xelia-light text-gray-300 group-hover:bg-xelia-accent/20 group-hover:text-white"
        )}>
          {industry.icon}
        </div>
        <h3 className={cn(
          "text-lg font-medium",
          isSelected 
            ? "text-white" 
            : "text-gray-200"
        )}>
          {industry.name}
        </h3>
        
        {/* Selection indicator - Checkbox style - Now positioned on the right */}
        <div className="ml-auto">
          {isSelected ? (
            <div className="w-5 h-5 rounded-sm bg-xelia-accent flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-sm border border-gray-500"></div>
          )}
        </div>
      </div>
      
      <div className="mt-3 space-y-2 text-gray-300 text-xs">
        {industry.valuePoints.map((point, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="min-w-[4px] h-[4px] rounded-full bg-xelia-accent mt-1.5"></div>
            <p>{point}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-xelia-accent text-xs hover:text-xelia-accent-light transition-colors">
              Ver más
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#1A1F2C] text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-gradient">
                <span className="p-1.5 rounded-lg bg-xelia-accent/20">
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
                    <p className="text-gray-200">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Removed the absolute positioned checkbox from the bottom of the card */}
    </div>
  );
};

export default IndustryCard;
