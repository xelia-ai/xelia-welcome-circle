
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
        "relative bg-white p-4 rounded-xl cursor-pointer transition-all hover:shadow-md group",
        isSelected 
          ? "border-xelia-accent border" 
          : "border border-xelia-gray-light"
      )}
      onClick={() => onToggle(industry.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2.5 rounded-lg transition-all duration-300", 
            isSelected 
              ? "bg-white text-xelia-accent" 
              : "bg-white text-xelia-gray-medium"
          )}>
            {industry.icon}
          </div>
          <h3 className={cn(
            "text-lg font-medium",
            isSelected 
              ? "text-gray-800" 
              : "text-gray-800"
          )}>
            {industry.name}
          </h3>
        </div>
        
        {/* Selection indicator - Circle style */}
        <div className="ml-auto">
          <div className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center",
            isSelected 
              ? "border-xelia-accent" 
              : "border-gray-300"
          )}>
            {isSelected && <div className="w-3 h-3 rounded-full bg-xelia-accent"></div>}
          </div>
        </div>
      </div>
      
      <div className="mt-3 space-y-2 text-gray-600 text-sm">
        {industry.valuePoints.slice(0, 3).map((point, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="min-w-[6px] h-[6px] rounded-full bg-xelia-accent mt-1.5"></div>
            <p>{point}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-xelia-accent text-sm hover:text-xelia-accent-light transition-colors">
              Ver más
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white text-gray-800 border border-xelia-gray-light">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-gray-800">
                <span className="p-1.5 rounded-lg bg-xelia-accent/20 text-xelia-accent">
                  {industry.icon}
                </span>
                Xelia para {industry.name}
              </DialogTitle>
            </DialogHeader>
            <div className="my-2">
              <p className="mb-4 text-gray-700">{industry.detailedDescription}</p>
              <h4 className="font-medium text-gray-800 mb-2">Principales beneficios:</h4>
              <ul className="space-y-2">
                {industry.valuePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="min-w-[6px] h-[6px] rounded-full bg-xelia-accent mt-1.5"></div>
                    <p className="text-gray-700">{point}</p>
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
