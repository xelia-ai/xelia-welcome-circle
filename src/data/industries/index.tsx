
import React from 'react';
import { serviceIndustries } from './services';
import { commercialIndustries } from './commercial';
import { financialIndustries } from './financial';
import { otherIndustries } from './others';
import { Industry } from './common';

// Combine all industry categories into a single array
export const industries: Industry[] = [
  ...serviceIndustries,
  ...commercialIndustries,
  ...financialIndustries,
  ...otherIndustries
];

// Industry categories mapping for the tabs
export const industryCategories = {
  'servicios': serviceIndustries.map(industry => industry.id),
  'comercial': commercialIndustries.map(industry => industry.id),
  'financiero': financialIndustries.map(industry => industry.id),
  'otros': otherIndustries.map(industry => industry.id)
};

// Mapeo de términos alternativos a industrias existentes
export const industryAliases: Record<string, string[]> = {
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
