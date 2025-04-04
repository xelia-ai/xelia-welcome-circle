
import React from 'react';
import { Building2, Heart, Briefcase, Building, Home, GraduationCap, ShoppingBag, Landmark, Car, Utensils, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndustrySelectionProps {
  selectedIndustry: string;
  onSelect: (id: string, name: string) => void;
}

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const IndustrySelection: React.FC<IndustrySelectionProps> = ({ selectedIndustry, onSelect }) => {
  const industries: Industry[] = [
    {
      id: 'real-estate',
      name: 'Bienes Raíces',
      icon: <Home className="h-6 w-6" />,
      description: 'Gestiona propiedades, consultas de clientes y programación de visitas automáticamente.'
    },
    {
      id: 'insurance',
      name: 'Seguros',
      icon: <Briefcase className="h-6 w-6" />,
      description: 'Optimiza la atención al cliente y el procesamiento de reclamos con respuestas instantáneas.'
    },
    {
      id: 'healthcare',
      name: 'Salud',
      icon: <Heart className="h-6 w-6" />,
      description: 'Mejora la experiencia del paciente con programación de citas y respuestas a preguntas frecuentes.'
    },
    {
      id: 'finance',
      name: 'Finanzas',
      icon: <Landmark className="h-6 w-6" />,
      description: 'Brinda soporte financiero personalizado y respuestas a consultas bancarias comunes.'
    },
    {
      id: 'education',
      name: 'Educación',
      icon: <GraduationCap className="h-6 w-6" />,
      description: 'Facilita la comunicación entre estudiantes, padres e instituciones educativas.'
    },
    {
      id: 'retail',
      name: 'Retail',
      icon: <ShoppingBag className="h-6 w-6" />,
      description: 'Mejora el servicio al cliente y la asistencia en compras con respuestas personalizadas.'
    },
    {
      id: 'automotive',
      name: 'Automotriz',
      icon: <Car className="h-6 w-6" />,
      description: 'Facilita la gestión de citas de servicio y consultas sobre vehículos.'
    },
    {
      id: 'hospitality',
      name: 'Hospitalidad',
      icon: <Utensils className="h-6 w-6" />,
      description: 'Optimiza reservas, consultas y recomendaciones para hoteles y restaurantes.'
    },
    {
      id: 'corporate',
      name: 'Servicios Corporativos',
      icon: <Building2 className="h-6 w-6" />,
      description: 'Automatiza procesos internos y mejora la comunicación con clientes corporativos.'
    },
    {
      id: 'custom',
      name: 'Personalizado',
      icon: <Settings className="h-6 w-6" />,
      description: 'Crea una solución adaptada específicamente a tus necesidades con las opciones disponibles en nuestra plataforma.'
    },
  ];

  const selectedIndustryData = industries.find(industry => industry.id === selectedIndustry);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {industries.map((industry) => (
          <div
            key={industry.id}
            className={cn(
              "relative frosted-glass p-4 rounded-xl cursor-pointer transition-all hover:shadow-elegant-hover group",
              selectedIndustry === industry.id 
                ? "border-xelia-accent bg-xelia-accent/5" 
                : "border-white/10 bg-xelia-light/30"
            )}
            onClick={() => onSelect(industry.id, industry.name)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={cn(
                "p-2.5 rounded-lg transition-all duration-300", 
                selectedIndustry === industry.id 
                  ? "bg-xelia-accent text-white shadow-accent" 
                  : "bg-xelia-light text-gray-300 group-hover:bg-xelia-accent/20 group-hover:text-white"
              )}>
                {industry.icon}
              </div>
              <h3 className={cn(
                "text-lg font-medium",
                selectedIndustry === industry.id 
                  ? "text-white" 
                  : "text-gray-200"
              )}>
                {industry.name}
              </h3>
            </div>
            
            {/* Selection indicator */}
            {selectedIndustry === industry.id && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 rounded-full bg-xelia-accent"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="frosted-glass rounded-xl p-5 h-full">
          {selectedIndustryData ? (
            <>
              <h3 className="text-xl font-medium mb-3 text-gradient">
                {selectedIndustryData.id === 'custom' 
                  ? 'Solución personalizada' 
                  : `Con Xelia en la industria ${selectedIndustryData.name}`}
              </h3>
              <p className="text-gray-300 mb-5">
                {selectedIndustryData.description}
              </p>
              {selectedIndustryData.id === 'custom' && (
                <ul className="mt-3 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent"></div>
                    Configura el conocimiento específico de tu empresa
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent"></div>
                    Adapta las respuestas al tono y estilo de tu marca
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent"></div>
                    Personaliza los flujos de conversación según tus procesos
                  </li>
                </ul>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="text-xelia-accent/40 mb-4">
                <Building className="w-12 h-12" />
              </div>
              <p className="text-gray-400 italic">
                Selecciona una industria para ver los beneficios específicos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndustrySelection;
