
import { useState, useEffect } from 'react';
import { Industry } from '@/types/industry';
import { industries, industryCategories, industryAliases } from '@/data/industries';
import { CUSTOM_INDUSTRY_ID } from '@/data/industries/common';
import { toast } from "sonner";

export const useIndustryFilter = (selectedIndustries: string[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('servicios');
  const [suggestedIndustries, setSuggestedIndustries] = useState<string[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const findRelatedIndustries = (term: string): string[] => {
    const normalizedTerm = term.toLowerCase().trim();
    
    for (const [alias, industryIds] of Object.entries(industryAliases)) {
      if (alias.includes(normalizedTerm) || normalizedTerm.includes(alias)) {
        return industryIds;
      }
    }
    
    return [];
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestedIndustries([]);
      setShowNoResults(false);
      return;
    }
    
    const directMatches = industries.filter(industry => 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(i => i.id);
    
    if (directMatches.length > 0) {
      setSuggestedIndustries(directMatches);
      setShowNoResults(false);
      
      if (directMatches.length <= 5) {
        setActiveTab('todas');
      }
    } else {
      const relatedMatches = findRelatedIndustries(searchTerm);
      setSuggestedIndustries(relatedMatches);
      
      if (relatedMatches.length > 0) {
        setActiveTab('todas');
        setShowNoResults(false);
        
        toast.info("Encontramos industrias similares a tu búsqueda", {
          description: "Te mostramos resultados relacionados con tu término de búsqueda."
        });
      } else {
        setShowNoResults(true);
        setSuggestedIndustries([CUSTOM_INDUSTRY_ID]);
      }
    }
  }, [searchTerm]);

  const filteredIndustries = industries.filter(industry => {
    // Custom industry should always show in the active tab
    if (industry.id === CUSTOM_INDUSTRY_ID) {
      return true;
    }

    // For suggested industries based on search
    if (suggestedIndustries.length > 0 && searchTerm.trim() !== '') {
      if (activeTab === 'todas') {
        return suggestedIndustries.includes(industry.id);
      }
      
      const matchesSearch = suggestedIndustries.includes(industry.id);
      const matchesCategory = industryCategories[activeTab as keyof typeof industryCategories].includes(industry.id);
      return matchesSearch && matchesCategory;
    }
    
    // For regular filtering
    const matchesSearch = searchTerm === '' || 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === 'todas' ||
      (activeTab in industryCategories && industryCategories[activeTab as keyof typeof industryCategories].includes(industry.id));
    
    return matchesSearch && matchesCategory;
  });

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filteredIndustries,
    suggestedIndustries,
    showNoResults,
    setShowNoResults
  };
};
