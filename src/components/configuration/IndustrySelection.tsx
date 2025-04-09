
import React, { useState, useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { industries } from '@/data/industries';
import IndustryCard from './industry/IndustryCard';
import IndustryPreview from './industry/IndustryPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

// Agrupar industrias por categorías
const industryCategories = {
  'servicios': ['real-estate', 'insurance', 'healthcare', 'education', 'corporate', 'legal', 'custom', 'nutrition'],
  'comercial': ['retail', 'hospitality', 'ecommerce', 'manufacturing'],
  'financiero': ['banking', 'fintech', 'investments', 'insurance-finance'],
  'otros': ['automotive', 'tech', 'agriculture', 'entertainment', 'media', 'construction', 'energy', 'logistics', 'nonprofit']
};

// Mapeo de términos alternativos a industrias existentes
const industryAliases: Record<string, string[]> = {
  'bienes raices': ['real-estate'],
  'propiedades': ['real-estate'],
  'inmobiliaria': ['real-estate'],
  'inmuebles': ['real-estate'],
  'casa': ['real-estate'],
  
  'seguro': ['insurance', 'insurance-finance'],
  'aseguradora': ['insurance', 'insurance-finance'],
  'poliza': ['insurance'],
  
  'medico': ['healthcare'],
  'hospital': ['healthcare'],
  'clinica': ['healthcare'],
  'salud': ['healthcare'],
  'doctor': ['healthcare'],
  
  'escuela': ['education'],
  'universidad': ['education'],
  'colegio': ['education'],
  'academico': ['education'],
  'estudiante': ['education'],
  
  'empresa': ['corporate'],
  'negocio': ['corporate'],
  'oficina': ['corporate'],
  'trabajo': ['corporate'],
  'compañia': ['corporate'],
  
  'abogado': ['legal'],
  'juridico': ['legal'],
  'leyes': ['legal'],
  'derecho': ['legal'],
  
  'tienda': ['retail', 'ecommerce'],
  'comercio': ['retail', 'ecommerce'],
  'ventas': ['retail', 'ecommerce'],
  
  'hotel': ['hospitality'],
  'restaurante': ['hospitality'],
  'turismo': ['hospitality'],
  'viajes': ['hospitality'],
  
  'online': ['ecommerce'],
  'sitio web': ['ecommerce'],
  'internet': ['ecommerce', 'tech'],
  'en linea': ['ecommerce'],
  
  'fabrica': ['manufacturing'],
  'produccion': ['manufacturing'],
  'industria': ['manufacturing'],
  
  'banco': ['banking'],
  'finanzas': ['banking', 'fintech', 'investments'],
  'dinero': ['banking', 'investments'],
  
  'tecnologia financiera': ['fintech'],
  'pagos': ['fintech'],
  'credito': ['fintech', 'banking'],
  
  'inversion': ['investments'],
  'bolsa': ['investments'],
  'acciones': ['investments'],
  'fondos': ['investments'],
  
  'autos': ['automotive'],
  'coches': ['automotive'],
  'vehiculos': ['automotive'],
  'concesionario': ['automotive'],
  
  'apps': ['tech'],
  'software': ['tech'],
  'tecnologia': ['tech'],
  'informatica': ['tech'],
  'computacion': ['tech'],
  
  'cultivo': ['agriculture'],
  'granja': ['agriculture'],
  'campo': ['agriculture'],
  'agricola': ['agriculture'],
  
  'conciertos': ['entertainment'],
  'eventos': ['entertainment'],
  'espectaculos': ['entertainment'],
  'cine': ['entertainment'],
  
  'prensa': ['media'],
  'television': ['media'],
  'radio': ['media'],
  'noticias': ['media'],
  'periodismo': ['media'],
  
  'constructor': ['construction'],
  'obra': ['construction'],
  'arquitectura': ['construction'],
  'edificacion': ['construction'],
  
  'electricidad': ['energy'],
  'petroleo': ['energy'],
  'gas': ['energy'],
  'renovables': ['energy'],
  
  'transporte': ['logistics'],
  'envios': ['logistics'],
  'cadena de suministro': ['logistics'],
  'almacen': ['logistics'],
  'distribucion': ['logistics'],
  
  'fundacion': ['nonprofit'],
  'ong': ['nonprofit'],
  'caridad': ['nonprofit'],
  'beneficencia': ['nonprofit'],
  
  'dieta': ['nutrition'],
  'alimentacion': ['nutrition'],
  'dietetico': ['nutrition'],
  'nutricional': ['nutrition'],
  'alimentos': ['nutrition'],
  
  'especifico': ['custom'],
  'personalizada': ['custom'],
  'a medida': ['custom']
};

interface IndustrySelectionProps {
  selectedIndustries: string[];
  onSelect: (selectedIndustries: string[], industryNames: string[]) => void;
}

const IndustrySelection: React.FC<IndustrySelectionProps> = ({ selectedIndustries, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('servicios');
  const [suggestedIndustries, setSuggestedIndustries] = useState<string[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);

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

  // Buscar industrias relacionadas basadas en términos
  const findRelatedIndustries = (term: string): string[] => {
    const normalizedTerm = term.toLowerCase().trim();
    
    // Buscar en aliases
    for (const [alias, industryIds] of Object.entries(industryAliases)) {
      if (alias.includes(normalizedTerm) || normalizedTerm.includes(alias)) {
        return industryIds;
      }
    }
    
    return [];
  };

  // Efecto para actualizar sugerencias cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestedIndustries([]);
      setShowNoResults(false);
      return;
    }
    
    // Buscar coincidencias directas primero
    const directMatches = industries.filter(industry => 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(i => i.id);
    
    if (directMatches.length > 0) {
      setSuggestedIndustries(directMatches);
      setShowNoResults(false);
      
      // Si hay coincidencias exactas y son pocas, mostrar en "todas"
      if (directMatches.length <= 5) {
        setActiveTab('todas');
      }
    } else {
      // Buscar coincidencias por términos relacionados
      const relatedMatches = findRelatedIndustries(searchTerm);
      setSuggestedIndustries(relatedMatches);
      
      if (relatedMatches.length > 0) {
        setActiveTab('todas');
        setShowNoResults(false);
        
        // Notificar al usuario que encontramos algo relacionado
        toast.info("Encontramos industrias similares a tu búsqueda", {
          description: "Te mostramos resultados relacionados con tu término de búsqueda."
        });
      } else {
        setShowNoResults(true);
        // Si no hay coincidencias, sugerir "custom"
        setSuggestedIndustries(['custom']);
      }
    }
  }, [searchTerm]);

  // Filtrar industrias basado en búsqueda y categoría
  const filteredIndustries = industries.filter(industry => {
    // Si hay sugerencias y el término de búsqueda no está vacío
    if (suggestedIndustries.length > 0 && searchTerm.trim() !== '') {
      // Solo mostrar industrias sugeridas cuando estamos en la pestaña "todas"
      if (activeTab === 'todas') {
        return suggestedIndustries.includes(industry.id);
      }
      
      // En otras pestañas, mostrar coincidencias que pertenezcan a esa categoría
      const matchesSearch = suggestedIndustries.includes(industry.id);
      const matchesCategory = industryCategories[activeTab as keyof typeof industryCategories].includes(industry.id);
      return matchesSearch && matchesCategory;
    }
    
    // Comportamiento normal de filtrado
    const matchesSearch = searchTerm === '' || 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por categoría (tab)
    const matchesCategory = activeTab === 'todas' ||
      (activeTab in industryCategories && industryCategories[activeTab as keyof typeof industryCategories].includes(industry.id));
    
    return matchesSearch && matchesCategory;
  });

  // Limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm('');
    setSuggestedIndustries([]);
    setShowNoResults(false);
  };

  // Seleccionar industry personalizada cuando no hay resultados
  const handleSelectCustom = () => {
    // Solo si no está ya seleccionada
    if (!selectedIndustries.includes('custom')) {
      handleIndustryToggle('custom');
      
      // Notificar al usuario
      toast.success("Opción personalizada seleccionada", {
        description: "Configuraremos Xelia específicamente para tus necesidades únicas."
      });
    }
  };

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
                  
                  {/* Mensaje cuando no hay resultados */}
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
