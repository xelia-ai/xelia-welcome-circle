
import React from 'react';
import { ShoppingBag, Utensils, Settings } from 'lucide-react';
import { Industry } from './common';

export const commercialIndustries: Industry[] = [
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
  }
];
