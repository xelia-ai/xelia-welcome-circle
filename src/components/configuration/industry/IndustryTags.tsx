
import React from 'react';
import { X } from 'lucide-react';
import { Industry } from '@/types/industry';

interface IndustryTagsProps {
  selectedIndustriesData: Industry[];
  onRemoveIndustry: (industryId: string) => void;
}

const IndustryTags: React.FC<IndustryTagsProps> = ({ 
  selectedIndustriesData, 
  onRemoveIndustry 
}) => {
  if (selectedIndustriesData.length === 0) return null;
  
  return (
    <div>
      <h4 className="text-sm text-gray-300 mb-2">Industrias seleccionadas:</h4>
      <div className="flex flex-wrap gap-2">
        {selectedIndustriesData.map(industry => (
          <div 
            key={industry.id} 
            className="bg-xelia-accent/10 border border-xelia-accent/20 rounded-full px-2.5 py-1 flex items-center gap-1.5"
          >
            <div className="text-xelia-accent text-xs">
              {industry.icon}
            </div>
            <span className="text-gray-200 text-xs">{industry.name}</span>
            <button 
              className="text-gray-400 hover:text-white p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveIndustry(industry.id);
              }}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryTags;
