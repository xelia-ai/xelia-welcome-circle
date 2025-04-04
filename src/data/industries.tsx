
import React from 'react';
import { Building2, Heart, Briefcase, Building, Home, GraduationCap, ShoppingBag, Landmark, Car, Utensils, Settings } from 'lucide-react';
import { Industry } from '@/types/industry';

export const industries: Industry[] = [
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
