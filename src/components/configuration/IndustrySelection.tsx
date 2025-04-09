import React, { useState, useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { industries, industryCategories, industryAliases } from '@/data/industries';
import IndustryCard from './industry/IndustryCard';
import IndustryPreview from './industry/IndustryPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Info, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

interface IndustrySelectionProps {
  selectedIndustries: string[];
  onSelect: (selectedIndustries: string[], industryNames: string[]) => void;
}

const IndustrySelection: React.FC<IndustrySelectionProps> = ({ selectedIndustries, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('servicios');
  const [suggestedIndustries, setSuggestedIndustries] = useState<string[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);

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
        setSuggestedIndustries(['custom']);
      }
    }
  }, [searchTerm]);

  const filteredIndustries = industries.filter(industry => {
    if (suggestedIndustries.length > 0 && searchTerm.trim() !== '') {
      if (activeTab === 'todas') {
        return suggestedIndustries.includes(industry.id);
      }
      
      const matchesSearch = suggestedIndustries.includes(industry.id);
      const matchesCategory = industryCategories[activeTab as keyof typeof industryCategories].includes(industry.id);
      return matchesSearch && matchesCategory;
    }
    
    const matchesSearch = searchTerm === '' || 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === 'todas' ||
      (activeTab in industryCategories && industryCategories[activeTab as keyof typeof industryCategories].includes(industry.id));
    
    return matchesSearch && matchesCategory;
  });

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestedIndustries([]);
    setShowNoResults(false);
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
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar industria..."
            className="pl-10 bg-gray-800/60 border border-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Tabs defaultValue="servicios" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 w-full bg-gray-800/60 mb-4">
                <TabsTrigger value="servicios">Servicios</TabsTrigger>
                <TabsTrigger value="comercial">Comercial</TabsTrigger>
                <TabsTrigger value="financiero">Financiero</TabsTrigger>
                <TabsTrigger value="otros">Otros</TabsTrigger>
                <TabsTrigger value="todas">Todas</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-2 gap-3">
                  {filteredIndustries.map((industry) => (
                    <IndustryCard 
                      key={industry.id}
                      industry={industry}
                      isSelected={selectedIndustries.includes(industry.id)}
                      onToggle={handleIndustryToggle}
                    />
                  ))}
                  
                  {showNoResults && (
                    <div className="col-span-2 p-6 bg-gray-800/40 rounded-xl border border-gray-700">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center bg-gray-700/50 rounded-full p-3 mb-3">
                          <Info className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-white font-medium mb-2">No encontramos tu industria</h3>
                        <p className="text-gray-400 mb-4">¿Qué tal si pruebas con la opción personalizada?</p>
                        
                        <button 
                          onClick={handleSelectCustom} 
                          className="bg-xelia-accent/10 hover:bg-xelia-accent/20 transition-colors text-xelia-accent border border-xelia-accent/30 rounded-lg px-4 py-2"
                        >
                          Seleccionar opción personalizada
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {filteredIndustries.length === 0 && !showNoResults && (
                    <div className="col-span-2 text-center p-6 bg-gray-800/40 rounded-xl border border-gray-700">
                      <p className="text-gray-400">No se encontraron industrias que coincidan con tu búsqueda.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
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
