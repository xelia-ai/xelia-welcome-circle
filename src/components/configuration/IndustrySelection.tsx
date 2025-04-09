
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from "sonner";
import { useIndustryFilter } from '@/hooks/useIndustryFilter';
import { industries } from '@/data/industries';
import IndustryPreview from './industry/IndustryPreview';
import { 
  IndustrySearch, 
  IndustryTabs, 
  IndustryGrid, 
  NoResultsMessage 
} from './industry';

interface IndustrySelectionProps {
  selectedIndustries: string[];
  onSelect: (selectedIndustries: string[], industryNames: string[]) => void;
}

const IndustrySelection: React.FC<IndustrySelectionProps> = ({ selectedIndustries, onSelect }) => {
  const {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filteredIndustries,
    showNoResults
  } = useIndustryFilter(selectedIndustries);

  const handleIndustryToggle = (industryId: string) => {
    let updatedSelection: string[];
    
    if (selectedIndustries.includes(industryId)) {
      updatedSelection = selectedIndustries.filter(id => id !== industryId);
    } else {
      updatedSelection = [...selectedIndustries, industryId];
    }
    
    const selectedIndustryNames = industries
      .filter(industry => updatedSelection.includes(industry.id))
      .map(industry => industry.name);
    
    onSelect(updatedSelection, selectedIndustryNames);
  };

  const handleSelectCustom = () => {
    if (!selectedIndustries.includes('custom')) {
      handleIndustryToggle('custom');
      
      toast.success("Opción personalizada seleccionada", {
        description: "Configuraremos Xelia específicamente para tus necesidades únicas."
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        <IndustrySearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <IndustryTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
            >
              <IndustryGrid 
                industries={filteredIndustries}
                selectedIndustries={selectedIndustries}
                onToggle={handleIndustryToggle}
              />
              
              <NoResultsMessage 
                showNoResults={showNoResults}
                handleSelectCustom={handleSelectCustom}
                noIndustries={filteredIndustries.length === 0 && !showNoResults}
              />
            </IndustryTabs>
          </div>

          <div className="sticky top-4">
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 h-full">
              <IndustryPreview 
                selectedIndustries={selectedIndustries}
                industries={industries}
                onRemoveIndustry={handleIndustryToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IndustrySelection;
