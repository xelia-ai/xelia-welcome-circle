
import React from 'react';
import { Landmark, Briefcase, Smartphone } from 'lucide-react';
import { Industry } from './common';

export const financialIndustries: Industry[] = [
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
  }
];
