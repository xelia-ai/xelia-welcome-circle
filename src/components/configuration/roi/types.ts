
// ROI metric interface definition
export interface ROIMetric {
  title: string;
  baseValue: string;
  baseNumeric: number;
  improvedValue: string;
  improvement: string;
  
  // For compatibility with the ROIMetricsTable component
  name?: string;
  current?: number;
  improved?: number;
  percentIncrease?: number;
}
