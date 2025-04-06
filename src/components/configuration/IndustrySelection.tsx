
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { industries } from '@/data/industries';
import IndustryCard from './industry/IndustryCard';
import IndustryPreview from './industry/IndustryPreview';

interface IndustrySelectionProps {
  selectedIndustries: string[];
  onSelect: (selectedIndustries: string[], industryNames: string[]) => void;
}

const IndustrySelection: React.FC<IndustrySelectionProps> = ({ selectedIndustries, onSelect }) => {
  const handleIndustryToggle = (industryId: string) => {
    let updatedSelection: string[];
    
    if (selectedIndustries.includes(industryId)) {
      // Remove the industry if it's already selected
      updatedSelection = selectedIndustries.filter(id => id !== industryId);
    } else {
      // Add the industry if it's not selected
      updatedSelection = [...selectedIndustries, industryId];
    }
    
    // Get the industry names for the selected industries
    const selectedIndustryNames = industries
      .filter(industry => updatedSelection.includes(industry.id))
      .map(industry => industry.name);
    
    onSelect(updatedSelection, selectedIndustryNames);
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industries.map((industry) => (
            <IndustryCard 
              key={industry.id}
              industry={industry}
              isSelected={selectedIndustries.includes(industry.id)}
              onToggle={handleIndustryToggle}
            />
          ))}
        </div>

        <div className="relative">
          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 h-full">
            <IndustryPreview 
              selectedIndustries={selectedIndustries}
              industries={industries}
              onRemoveIndustry={handleIndustryToggle}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IndustrySelection;
