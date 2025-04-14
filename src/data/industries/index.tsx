import React from 'react';
import { serviceIndustries, customIndustry } from './services';
import { commercialIndustries } from './commercial';
import { financialIndustries } from './financial';
import { otherIndustries } from './others';
import { Industry, CUSTOM_INDUSTRY_ID } from './common';

// Combine all industry categories into a single array, making sure custom industry only appears once
export const industries: Industry[] = [
  ...serviceIndustries,
  ...commercialIndustries,
  ...financialIndustries,
  ...otherIndustries,
  customIndustry // Add the custom industry to the full list
];

// Industry categories mapping for the tabs
export const industryCategories = {
  'servicios': [...serviceIndustries.map(industry => industry.id), CUSTOM_INDUSTRY_ID],
  'comercial': [...commercialIndustries.map(industry => industry.id), CUSTOM_INDUSTRY_ID],
  'financiero': [...financialIndustries.map(industry => industry.id), CUSTOM_INDUSTRY_ID],
  'otros': [...otherIndustries.map(industry => industry.id), CUSTOM_INDUSTRY_ID]
};

// Updated mapeo de términos alternativos a industrias existentes
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
  'dentista': ['healthcare'],
  'dental': ['healthcare'],
  'odontologia': ['healthcare'],
  'odontologico': ['healthcare'],
  'ortodoncia': ['healthcare'],
  'pediatra': ['healthcare'],
  'ginecologia': ['healthcare'],
  'cardiologia': ['healthcare'],
  'dermatologia': ['healthcare'],
  'fisioterapia': ['healthcare'],
  'psicologia': ['healthcare'],
  'terapia': ['healthcare'],
  'farmacia': ['healthcare'],
  'medicina': ['healthcare'],
  'enfermeria': ['healthcare'],
  'consultorio': ['healthcare'],
  
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
  'hospedaje': ['hospitality'],
  'cafeteria': ['hospitality'],
  'bar': ['hospitality'],
  
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
  
  'especifico': [CUSTOM_INDUSTRY_ID],
  'personalizada': [CUSTOM_INDUSTRY_ID],
  'a medida': [CUSTOM_INDUSTRY_ID],
  'customizado': [CUSTOM_INDUSTRY_ID],
  'adaptado': [CUSTOM_INDUSTRY_ID],
  'particular': [CUSTOM_INDUSTRY_ID],
  'exclusivo': [CUSTOM_INDUSTRY_ID],
  'unico': [CUSTOM_INDUSTRY_ID],
  'singular': [CUSTOM_INDUSTRY_ID],
  'individualizado': [CUSTOM_INDUSTRY_ID],
  'configurado': [CUSTOM_INDUSTRY_ID]
};
