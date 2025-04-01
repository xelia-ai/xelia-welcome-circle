
import React from 'react';
import { Building2, Heart, Briefcase, Building, Home, GraduationCap, ShoppingBag, Landmark, Car, Utensils } from 'lucide-react';
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
  ];

  const selectedIndustryData = industries.find(industry => industry.id === selectedIndustry);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {industries.map((industry) => (
          <div
            key={industry.id}
            className={cn(
              "border p-4 rounded-lg cursor-pointer transition-all hover:bg-xelia-accent/10 hover:border-xelia-accent",
              selectedIndustry === industry.id 
                ? "border-xelia-accent bg-xelia-accent/10" 
                : "border-gray-700 bg-gray-800/50"
            )}
            onClick={() => onSelect(industry.id, industry.name)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={cn(
                "p-2 rounded-full", 
                selectedIndustry === industry.id 
                  ? "bg-xelia-accent text-white" 
                  : "bg-gray-700 text-gray-300"
              )}>
                {industry.icon}
              </div>
              <h3 className="text-lg font-medium text-white">{industry.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5 h-full">
          {selectedIndustryData ? (
            <>
              <h3 className="text-xl font-medium mb-3 text-white">
                Con Xelia en la industria {selectedIndustryData.name}
              </h3>
              <p className="text-gray-300">
                {selectedIndustryData.description}
              </p>
            </>
          ) : (
            <p className="text-gray-400 italic">
              Selecciona una industria para ver los beneficios específicos
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndustrySelection;
