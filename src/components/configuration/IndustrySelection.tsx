
import React, { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { industries } from '@/data/industries';
import IndustryCard from './industry/IndustryCard';
import IndustryPreview from './industry/IndustryPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Agrupar industrias por categorías
const industryCategories = {
  'servicios': ['real-estate', 'insurance', 'healthcare', 'education', 'corporate', 'legal', 'custom'],
  'comercial': ['retail', 'hospitality', 'ecommerce', 'manufacturing'],
  'financiero': ['banking', 'fintech', 'investments', 'insurance-finance'],
  'otros': ['automotive', 'tech', 'agriculture', 'entertainment', 'media', 'construction', 'energy', 'logistics', 'nonprofit']
};

interface IndustrySelectionProps {
  selectedIndustries: string[];
  onSelect: (selectedIndustries: string[], industryNames: string[]) => void;
}

const IndustrySelection: React.FC<IndustrySelectionProps> = ({ selectedIndustries, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('servicios');

  // Manejar la selección/deselección de industrias
  const handleIndustryToggle = (industryId: string) => {
    let updatedSelection: string[];
    
    if (selectedIndustries.includes(industryId)) {
      // Remover la industria si ya está seleccionada
      updatedSelection = selectedIndustries.filter(id => id !== industryId);
    } else {
      // Agregar la industria si no está seleccionada
      updatedSelection = [...selectedIndustries, industryId];
    }
    
    // Obtener los nombres de las industrias seleccionadas
    const selectedIndustryNames = industries
      .filter(industry => updatedSelection.includes(industry.id))
      .map(industry => industry.name);
    
    onSelect(updatedSelection, selectedIndustryNames);
  };

  // Filtrar industrias basado en búsqueda y categoría
  const filteredIndustries = industries.filter(industry => {
    // Filtro por término de búsqueda
    const matchesSearch = searchTerm === '' || 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por categoría (tab)
    const matchesCategory = activeTab === 'todas' ||
      (activeTab in industryCategories && industryCategories[activeTab as keyof typeof industryCategories].includes(industry.id));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        {/* Barra de búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar industria..."
            className="pl-10 bg-gray-800/60 border border-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {/* Navegación por tabs */}
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
                  
                  {filteredIndustries.length === 0 && (
                    <div className="col-span-2 text-center p-6 bg-gray-800/40 rounded-xl border border-gray-700">
                      <p className="text-gray-400">No se encontraron industrias que coincidan con tu búsqueda.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Panel de vista previa */}
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
