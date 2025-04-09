
import React from 'react';
import { Home, Heart, Briefcase, GraduationCap, Building2, Scale, Settings, Apple } from 'lucide-react';
import { Industry } from './common';

export const serviceIndustries: Industry[] = [
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
    id: 'legal',
    name: 'Servicios Legales',
    icon: <Scale className="h-6 w-6" />,
    description: 'Automatiza consultas legales básicas y mejora la gestión de casos y clientes.',
    valuePoints: [
      "Responde preguntas legales frecuentes",
      "Programa consultas con abogados",
      "Asiste en la recolección inicial de información de casos"
    ],
    detailedDescription: "Para bufetes y servicios legales, Xelia puede proporcionar información sobre servicios, recopilar datos preliminares de casos, programar citas con abogados y mantener a los clientes informados sobre el estado de sus casos, mejorando la eficiencia y satisfacción del cliente."
  },
  {
    id: 'nutrition',
    name: 'Nutrición',
    icon: <Apple className="h-6 w-6" />,
    description: 'Gestiona planes nutricionales, consultas y seguimiento de pacientes de forma automatizada.',
    valuePoints: [
      "Ofrece recomendaciones nutricionales personalizadas",
      "Realiza seguimiento de planes alimenticios",
      "Programa recordatorios para controles y consultas"
    ],
    detailedDescription: "Para profesionales de la nutrición, Xelia puede gestionar planes alimenticios personalizados, programar consultas de seguimiento, enviar recordatorios a pacientes, proporcionar información sobre alimentos y dietas, y automatizar la recolección de datos de progreso, mejorando la adherencia a los planes y la eficiencia del servicio."
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
