
import React from 'react';
import { Info } from 'lucide-react';
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
        "frosted-glass rounded-xl p-6 cursor-pointer transition-all duration-300 relative group flex flex-col h-full bg-gray-800/90",
        isSelected 
          ? "border-xelia-accent bg-xelia-accent/5 shadow-accent" 
          : "hover:border-white/20 hover:shadow-elegant-hover"
      )}
      onClick={() => onToggle(industry.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-3 rounded-xl transition-all duration-300", 
          isSelected 
            ? "bg-xelia-accent text-white" 
            : "bg-xelia-light/70 text-gray-300 group-hover:bg-xelia-accent/20 group-hover:text-white"
        )}>
          {industry.icon}
        </div>
        
        {/* Selection indicator - Circle style */}
        <div className="ml-auto">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center transition-all",
            isSelected 
              ? "border-2 border-xelia-accent" 
              : "border border-gray-500"
          )}>
            {isSelected && <div className="w-3 h-3 rounded-full bg-xelia-accent"></div>}
          </div>
        </div>
      </div>
      
      <h3 className={cn(
        "text-xl font-medium mb-2",
        isSelected ? "text-xelia-accent" : "text-white"
      )}>
        {industry.name}
      </h3>
      
      <div className="mt-3 space-y-2 text-gray-300 text-sm">
        {industry.valuePoints.slice(0, 3).map((point, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="min-w-[6px] h-[6px] rounded-full bg-xelia-accent mt-1.5"></div>
            <p>{point}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-4 border-t border-white/10">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full text-xelia-accent text-sm hover:text-xelia-accent-light transition-colors">
              Ver más
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
