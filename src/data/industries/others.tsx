
import React from 'react';
import { Car, Smartphone, Leaf, Music, Radio, Hammer, Zap, Truck, HeartHandshake } from 'lucide-react';
import { Industry } from './common';

export const otherIndustries: Industry[] = [
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
    id: 'tech',
    name: 'Tecnología',
    icon: <Smartphone className="h-6 w-6" />,
    description: 'Mejora el soporte técnico y la gestión de servicios tecnológicos.',
    valuePoints: [
      "Proporciona soporte técnico básico automatizado",
      "Gestiona tickets y solicitudes de servicio",
      "Facilita onboarding de usuarios en plataformas tecnológicas"
    ],
    detailedDescription: "Para empresas tecnológicas, Xelia puede proporcionar soporte técnico básico, gestionar tickets de servicio, facilitar el onboarding de usuarios en nuevas plataformas, y recopilar feedback para mejora continua, optimizando la experiencia del usuario y reduciendo costos de soporte."
  },
  {
    id: 'agriculture',
    name: 'Agricultura',
    icon: <Leaf className="h-6 w-6" />,
    description: 'Optimiza la gestión agrícola con asistencia inteligente y automatizada.',
    valuePoints: [
      "Proporciona información sobre cultivos y técnicas agrícolas",
      "Monitorea condiciones climáticas y envía alertas",
      "Gestiona inventarios y programaciones de cosecha"
    ],
    detailedDescription: "Para el sector agrícola, Xelia puede ayudar a optimizar operaciones proporcionando información sobre cultivos, gestionar inventarios de insumos, programar actividades de siembra y cosecha, y conectar con proveedores y compradores potenciales, mejorando la eficiencia y rentabilidad."
  },
  {
    id: 'entertainment',
    name: 'Entretenimiento',
    icon: <Music className="h-6 w-6" />,
    description: 'Mejora la experiencia del cliente en servicios de entretenimiento y eventos.',
    valuePoints: [
      "Gestiona reservas y entradas para eventos",
      "Proporciona información sobre programación y disponibilidad",
      "Personaliza recomendaciones de contenido y eventos"
    ],
    detailedDescription: "En la industria del entretenimiento, Xelia puede gestionar reservas para eventos, proporcionar información detallada sobre programación, responder consultas de fans y asistentes, y ofrecer recomendaciones personalizadas, mejorando la experiencia del usuario y optimizando la gestión de eventos."
  },
  {
    id: 'media',
    name: 'Medios y Comunicación',
    icon: <Radio className="h-6 w-6" />,
    description: 'Optimiza la distribución de contenido y la interacción con audiencias.',
    valuePoints: [
      "Personaliza recomendaciones de contenido",
      "Gestiona suscripciones y accesos a contenido premium",
      "Recoge feedback de audiencias y genera informes"
    ],
    detailedDescription: "Para medios de comunicación, Xelia puede ayudar a distribuir contenido segmentado, gestionar interacciones con audiencias, recopilar datos sobre preferencias de usuarios, y optimizar estrategias de engagement, mejorando la retención de audiencias y la monetización de contenidos."
  },
  {
    id: 'construction',
    name: 'Construcción',
    icon: <Hammer className="h-6 w-6" />,
    description: 'Optimiza la gestión de proyectos de construcción y la comunicación con clientes.',
    valuePoints: [
      "Gestiona consultas sobre proyectos y avances",
      "Facilita la comunicación entre equipos de trabajo",
      "Monitorea inventarios y programación de materiales"
    ],
    detailedDescription: "En el sector de construcción, Xelia puede coordinar actividades entre diferentes equipos, gestionar inventarios de materiales, programar entregas, mantener informados a los clientes sobre avances de obra, y facilitar la comunicación entre arquitectos, ingenieros y contratistas."
  },
  {
    id: 'energy',
    name: 'Energía',
    icon: <Zap className="h-6 w-6" />,
    description: 'Mejora la gestión de servicios energéticos y la atención al cliente.',
    valuePoints: [
      "Gestiona consultas sobre consumo y facturación",
      "Programa visitas técnicas y mantenimientos",
      "Proporciona consejos de eficiencia energética"
    ],
    detailedDescription: "Para el sector energético, Xelia puede gestionar consultas sobre consumo y facturación, programar visitas técnicas, proporcionar información sobre tarifas y servicios, y ofrecer recomendaciones personalizadas para mejorar la eficiencia energética, optimizando la experiencia del cliente y reduciendo costos operativos."
  },
  {
    id: 'logistics',
    name: 'Logística y Transporte',
    icon: <Truck className="h-6 w-6" />,
    description: 'Optimiza operaciones logísticas y mejora el seguimiento de envíos.',
    valuePoints: [
      "Proporciona información en tiempo real sobre envíos",
      "Gestiona reservas y programación de transportes",
      "Optimiza rutas y recursos logísticos"
    ],
    detailedDescription: "En logística y transporte, Xelia puede proporcionar actualizaciones en tiempo real sobre el estado de envíos, gestionar reservas de servicios, optimizar rutas de entrega, y facilitar la comunicación entre proveedores, transportistas y clientes, mejorando la eficiencia operativa y la satisfacción del cliente."
  },
  {
    id: 'nonprofit',
    name: 'ONGs y Sin Fines de Lucro',
    icon: <HeartHandshake className="h-6 w-6" />,
    description: 'Optimiza la gestión de donaciones y la comunicación con donantes y voluntarios.',
    valuePoints: [
      "Gestiona información sobre programas y necesidades",
      "Facilita procesos de donación y voluntariado",
      "Mantiene informados a donantes sobre impacto de donaciones"
    ],
    detailedDescription: "Para organizaciones sin fines de lucro, Xelia puede gestionar consultas sobre programas, facilitar procesos de donación, coordinar actividades de voluntariado, y mantener comunicación constante con donantes sobre el impacto de sus contribuciones, mejorando la transparencia y efectividad organizacional."
  }
];
