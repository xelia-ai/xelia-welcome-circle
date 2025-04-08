import React from 'react';
import { Building2, Heart, Briefcase, Building, Home, GraduationCap, ShoppingBag, Landmark, Car, Utensils, Settings, Scale, Smartphone, Leaf, Music, Radio, Hammer, Zap, Truck, HeartHandshake, Apple } from 'lucide-react';
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
    id: 'banking',
    name: 'Bancos',
    icon: <Landmark className="h-6 w-6" />,
    description: 'Brinda soporte bancario personalizado y respuestas a consultas sobre productos y servicios bancarios.',
    valuePoints: [
      "Proporciona información sobre productos bancarios",
      "Asiste en trámites bancarios básicos",
      "Genera alertas sobre movimientos sospechosos"
    ],
    detailedDescription: "En el sector bancario, Xelia puede atender consultas sobre productos, verificar estados de cuenta, dar orientación inicial sobre servicios, y facilitar procesos como solicitudes de tarjetas o préstamos, reduciendo tiempos de espera y mejorando la experiencia digital del cliente."
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
    id: 'fintech',
    name: 'Fintech',
    icon: <Smartphone className="h-6 w-6" />,
    description: 'Mejora la experiencia de usuario en servicios financieros digitales.',
    valuePoints: [
      "Asiste en procesos de onboarding de clientes",
      "Proporciona soporte para operaciones financieras digitales",
      "Monitorea y alerta sobre transacciones inusuales"
    ],
    detailedDescription: "En el sector fintech, Xelia puede guiar a los usuarios en el uso de plataformas financieras digitales, responder consultas sobre funcionamiento de servicios, asistir en la resolución de problemas técnicos y proporcionar información actualizada sobre el estado de operaciones financieras."
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
    id: 'ecommerce',
    name: 'E-commerce',
    icon: <ShoppingBag className="h-6 w-6" />,
    description: 'Mejora la experiencia de compra online y optimiza la gestión de pedidos.',
    valuePoints: [
      "Asiste a compradores con recomendaciones personalizadas",
      "Gestiona consultas sobre productos y pedidos",
      "Automatiza seguimiento post-venta y fidelización"
    ],
    detailedDescription: "Para plataformas de e-commerce, Xelia puede asistir a compradores con recomendaciones personalizadas, responder consultas sobre productos, gestionar procesos de compra, dar seguimiento a pedidos y facilitar devoluciones, mejorando la conversión y la satisfacción del cliente."
  },
  {
    id: 'investments',
    name: 'Inversiones',
    icon: <Landmark className="h-6 w-6" />,
    description: 'Asiste a inversores con información y recomendaciones personalizadas.',
    valuePoints: [
      "Proporciona información actualizada sobre mercados",
      "Ofrece orientación básica sobre productos de inversión",
      "Monitorea portafolios y envía alertas personalizadas"
    ],
    detailedDescription: "En el sector de inversiones, Xelia puede proporcionar información actualizada sobre mercados, orientar sobre productos financieros, monitorear portafolios, y programar consultas con asesores financieros, mejorando la experiencia del inversor y facilitando la toma de decisiones informadas."
  },
  {
    id: 'insurance-finance',
    name: 'Seguros Financieros',
    icon: <Briefcase className="h-6 w-6" />,
    description: 'Optimiza la gestión de pólizas financieras y la atención al cliente.',
    valuePoints: [
      "Responde consultas sobre productos de seguros financieros",
      "Asiste en la contratación y renovación de pólizas",
      "Gestiona la primera fase de reclamaciones"
    ],
    detailedDescription: "Para seguros financieros, Xelia puede proporcionar información detallada sobre productos, asistir en procesos de contratación, gestionar renovaciones, y facilitar la primera fase de reclamaciones, mejorando la eficiencia operativa y la experiencia del cliente."
  },
  {
    id: 'manufacturing',
    name: 'Manufactura',
    icon: <Settings className="h-6 w-6" />,
    description: 'Optimiza procesos de producción y gestión de inventarios.',
    valuePoints: [
      "Monitorea inventarios y alerta sobre necesidades de reposición",
      "Facilita la comunicación entre departamentos",
      "Optimiza programación de producción"
    ],
    detailedDescription: "En manufactura, Xelia puede ayudar a monitorear inventarios, optimizar programación de producción, facilitar la comunicación entre departamentos, y gestionar pedidos de proveedores y clientes, mejorando la eficiencia operativa y reduciendo tiempos de inactividad."
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
