
import React from 'react';
import { Building2, Heart, Briefcase, Building, Home, GraduationCap, ShoppingBag, Landmark, Car, Utensils, Settings, Info, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface IndustrySelectionProps {
  selectedIndustries: string[];
  onSelect: (selectedIndustries: string[], industryNames: string[]) => void;
}

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  valuePoints: string[];
  detailedDescription: string;
}

const IndustrySelection: React.FC<IndustrySelectionProps> = ({ selectedIndustries, onSelect }) => {
  const industries: Industry[] = [
    {
      id: 'real-estate',
      name: 'Bienes Raíces',
      icon: <Home className="h-6 w-6" />,
      description: 'Gestiona propiedades, consultas de clientes y programación de visitas automáticamente.',
      valuePoints: [
        "Automatiza consultas sobre propiedades disponibles",
        "Programa visitas a inmuebles sin intervención humana",
        "Califica leads en base a su potencial de compra"
      ],
      detailedDescription: "El agente Xelia para Bienes Raíces puede contestar preguntas sobre propiedades las 24 horas, gestionar agendas para visitas, dar seguimiento a clientes potenciales y generar cotizaciones preliminares automáticamente. Reduce el tiempo de respuesta y mejora la experiencia de compradores y vendedores."
    },
    {
      id: 'insurance',
      name: 'Seguros',
      icon: <Briefcase className="h-6 w-6" />,
      description: 'Optimiza la atención al cliente y el procesamiento de reclamos con respuestas instantáneas.',
      valuePoints: [
        "Responde consultas sobre coberturas y pólizas",
        "Asiste en el proceso inicial de reclamos", 
        "Actualiza datos de clientes de manera automática"
      ],
      detailedDescription: "Con Xelia, las aseguradoras pueden ofrecer información inmediata sobre pólizas, gestionar la primera fase de reclamos, programar citas con agentes y brindar cotizaciones preliminares. Todo esto disponible 24/7, mejorando significativamente la satisfacción del cliente y reduciendo la carga operativa."
    },
    {
      id: 'healthcare',
      name: 'Salud',
      icon: <Heart className="h-6 w-6" />,
      description: 'Mejora la experiencia del paciente con programación de citas y respuestas a preguntas frecuentes.',
      valuePoints: [
        "Gestiona citas médicas automáticamente",
        "Envía recordatorios para medicamentos y controles",
        "Responde consultas médicas generales"
      ],
      detailedDescription: "Para el sector salud, Xelia automatiza la gestión de citas, seguimiento a pacientes, recordatorios de medicación, responde preguntas frecuentes sobre servicios y tratamientos, y facilita la comunicación entre pacientes y personal médico sin sobrecarga administrativa."
    },
    {
      id: 'finance',
      name: 'Finanzas',
      icon: <Landmark className="h-6 w-6" />,
      description: 'Brinda soporte financiero personalizado y respuestas a consultas bancarias comunes.',
      valuePoints: [
        "Proporciona información sobre productos financieros",
        "Asiste en trámites bancarios básicos",
        "Genera alertas sobre movimientos sospechosos"
      ],
      detailedDescription: "En el sector financiero, Xelia puede atender consultas sobre productos bancarios, verificar estados de cuenta, dar orientación inicial sobre inversiones, y facilitar procesos como solicitudes de tarjetas o préstamos, reduciendo tiempos de espera y mejorando la experiencia digital del cliente."
    },
    {
      id: 'education',
      name: 'Educación',
      icon: <GraduationCap className="h-6 w-6" />,
      description: 'Facilita la comunicación entre estudiantes, padres e instituciones educativas.',
      valuePoints: [
        "Responde consultas académicas y administrativas",
        "Envía recordatorios de tareas y exámenes",
        "Facilita el acceso a recursos educativos"
      ],
      detailedDescription: "Para instituciones educativas, Xelia se convierte en un asistente virtual que puede responder consultas sobre cursos, procesos de admisión, fechas importantes, gestionar entrega de trabajos, y mantener comunicación fluida entre estudiantes, profesores y padres de familia, elevando la eficiencia operativa y académica."
    },
    {
      id: 'retail',
      name: 'Retail',
      icon: <ShoppingBag className="h-6 w-6" />,
      description: 'Mejora el servicio al cliente y la asistencia en compras con respuestas personalizadas.',
      valuePoints: [
        "Ofrece recomendaciones personalizadas de productos",
        "Gestiona consultas sobre disponibilidad y precios",
        "Procesa devoluciones y reclamos básicos"
      ],
      detailedDescription: "En retail, Xelia transforma la experiencia de compra digital ofreciendo recomendaciones personalizadas, respondiendo dudas sobre productos, gestionando el proceso de compra, seguimiento de pedidos y atendiendo solicitudes post-venta, todo de manera instantánea y 24/7."
    },
    {
      id: 'automotive',
      name: 'Automotriz',
      icon: <Car className="h-6 w-6" />,
      description: 'Facilita la gestión de citas de servicio y consultas sobre vehículos.',
      valuePoints: [
        "Programa citas para mantenimiento y servicio",
        "Responde consultas técnicas básicas",
        "Genera cotizaciones preliminares para reparaciones"
      ],
      detailedDescription: "El agente Xelia para el sector automotriz puede programar servicios de mantenimiento, proporcionar información sobre modelos y características de vehículos, gestionar consultas de repuestos, y dar seguimiento post-venta, mejorando la retención y satisfacción del cliente."
    },
    {
      id: 'hospitality',
      name: 'Hospitalidad',
      icon: <Utensils className="h-6 w-6" />,
      description: 'Optimiza reservas, consultas y recomendaciones para hoteles y restaurantes.',
      valuePoints: [
        "Gestiona reservas en hoteles y restaurantes",
        "Proporciona información sobre servicios y amenidades",
        "Atiende solicitudes especiales de los huéspedes"
      ],
      detailedDescription: "Para hoteles y restaurantes, Xelia gestiona reservaciones, responde consultas sobre disponibilidad, precios y servicios, procesa solicitudes especiales, y brinda recomendaciones personalizadas, elevando el nivel de atención al cliente sin incrementar costos operativos."
    },
    {
      id: 'corporate',
      name: 'Servicios Corporativos',
      icon: <Building2 className="h-6 w-6" />,
      description: 'Automatiza procesos internos y mejora la comunicación con clientes corporativos.',
      valuePoints: [
        "Facilita la coordinación de reuniones y eventos",
        "Automatiza respuestas a consultas frecuentes",
        "Gestiona solicitudes internas entre departamentos"
      ],
      detailedDescription: "En el ámbito corporativo, Xelia puede optimizar procesos de comunicación interna, gestionar solicitudes entre departamentos, coordinar agendas de reuniones, proporcionar información sobre políticas y procedimientos, y servir como primer punto de contacto con clientes corporativos."
    },
    {
      id: 'custom',
      name: 'Personalizado',
      icon: <Settings className="h-6 w-6" />,
      description: 'Crea una solución adaptada específicamente a tus necesidades con las opciones disponibles en nuestra plataforma.',
      valuePoints: [
        "Configura el asistente según tus procesos específicos",
        "Integra con tus sistemas existentes",
        "Personaliza el tono y estilo de comunicación"
      ],
      detailedDescription: "La solución personalizada de Xelia te permite crear un asistente virtual totalmente adaptado a tus necesidades específicas. Configura flujos de conversación, integra con tus sistemas existentes, personaliza respuestas y automatiza procesos únicos de tu negocio, todo con una implementación rápida y sin conocimientos técnicos."
    },
  ];

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

  // Get details for the selected industry (for the preview panel)
  // If multiple are selected, show the last selected one
  const selectedIndustryData = selectedIndustries.length > 0
    ? industries.find(industry => industry.id === selectedIndustries[selectedIndustries.length - 1])
    : null;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industries.map((industry) => {
            const isSelected = selectedIndustries.includes(industry.id);
            
            return (
              <div
                key={industry.id}
                className={cn(
                  "relative frosted-glass p-4 rounded-xl cursor-pointer transition-all hover:shadow-elegant-hover group",
                  isSelected 
                    ? "border-xelia-accent bg-xelia-accent/5" 
                    : "border-white/10 bg-xelia-light/30"
                )}
                onClick={() => handleIndustryToggle(industry.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "p-2.5 rounded-lg transition-all duration-300", 
                    isSelected 
                      ? "bg-xelia-accent text-white shadow-accent" 
                      : "bg-xelia-light text-gray-300 group-hover:bg-xelia-accent/20 group-hover:text-white"
                  )}>
                    {industry.icon}
                  </div>
                  <h3 className={cn(
                    "text-lg font-medium",
                    isSelected 
                      ? "text-white" 
                      : "text-gray-200"
                  )}>
                    {industry.name}
                  </h3>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-auto text-gray-400 hover:text-white transition-colors">
                        <Info size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 text-white border-gray-700 max-w-[300px]">
                      <p>{industry.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="mt-3 space-y-2 text-gray-300 text-xs">
                  {industry.valuePoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="min-w-[4px] h-[4px] rounded-full bg-xelia-accent mt-1.5"></div>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-xelia-accent text-xs hover:text-xelia-accent-light transition-colors">
                        Ver más
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1A1F2C] text-white border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-gradient">
                          <span className="p-1.5 rounded-lg bg-xelia-accent/20">
                            {industry.icon}
                          </span>
                          Xelia para {industry.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="my-2">
                        <p className="mb-4 text-gray-300">{industry.detailedDescription}</p>
                        <h4 className="font-medium text-white mb-2">Principales beneficios:</h4>
                        <ul className="space-y-2">
                          {industry.valuePoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="min-w-[6px] h-[6px] rounded-full bg-xelia-accent mt-1.5"></div>
                              <p className="text-gray-200">{point}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Selection indicator - Checkbox style */}
                <div className="absolute top-3 right-3">
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-sm bg-xelia-accent flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-sm border border-gray-500"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative">
          <div className="frosted-glass rounded-xl p-5 h-full">
            {selectedIndustries.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium text-gradient">
                    {selectedIndustries.length === 1
                      ? (selectedIndustryData?.id === 'custom' 
                        ? 'Solución personalizada' 
                        : `Con Xelia en la industria ${selectedIndustryData?.name}`)
                      : `Xelia para múltiples industrias (${selectedIndustries.length})`}
                  </h3>
                </div>
                
                {selectedIndustries.length === 1 ? (
                  // Single industry view
                  <>
                    <p className="text-gray-300 mb-5">
                      {selectedIndustryData?.description}
                    </p>
                    <div className="mt-3 space-y-2 text-gray-300 text-sm">
                      {selectedIndustryData?.valuePoints.map((point, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent"></div>
                          {point}
                        </li>
                      ))}
                    </div>
                  </>
                ) : (
                  // Multiple industries view
                  <>
                    <p className="text-gray-300 mb-5">
                      Has seleccionado múltiples industrias. Xelia se adaptará para ofrecer un servicio optimizado para cada una.
                    </p>
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">Industrias seleccionadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedIndustries.map(id => {
                          const industry = industries.find(ind => ind.id === id);
                          return industry ? (
                            <div 
                              key={id} 
                              className="bg-xelia-accent/10 border border-xelia-accent/20 rounded-lg px-2 py-1 flex items-center gap-1"
                            >
                              <span className="text-gray-200 text-sm">{industry.name}</span>
                              <button 
                                className="text-gray-400 hover:text-white p-0.5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleIndustryToggle(id);
                                }}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="text-xelia-accent/40 mb-4">
                  <Building className="w-12 h-12" />
                </div>
                <p className="text-gray-400 italic">
                  Selecciona una o más industrias para ver los beneficios específicos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IndustrySelection;
