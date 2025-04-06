
import React from 'react';

// This file already exists with ROI types, so we'll add the Tip interface
export interface Tip {
  id: string;
  text: string;
  iconName: string;
  capabilities: string[];
}

// Add the missing ROIMetric interface
export interface ROIMetric {
  title: string;
  baseValue: string;
  baseNumeric: number;
  improvedValue: string;
  improvement: string;
  // Legacy fields for compatibility with ROIMetricsTable component
  name: string;
  current: number;
  improved: number;
  percentIncrease: number;
}
