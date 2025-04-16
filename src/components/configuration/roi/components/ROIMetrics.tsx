
import React from 'react';

interface ROIMetricsProps {
  efficiencyBoost: number;
  satisfactionBoost: number;
  conversionBoost: number;
  capabilitiesCount: number;
}

const ROIMetrics: React.FC<ROIMetricsProps> = ({
  efficiencyBoost,
  satisfactionBoost,
  conversionBoost,
  capabilitiesCount
}) => {
  return (
    <div className="mt-3 bg-gray-700/30 rounded-lg p-4">
      <p className="text-sm text-gray-200 leading-relaxed">
        Con {capabilitiesCount} capacidades activadas, tu negocio puede:
      </p>
      <ul className="mt-2 text-sm space-y-1.5 text-gray-200">
        <li className="flex items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent mr-2"></div>
          Aumentar la eficiencia operativa hasta un <span className="text-xelia-accent font-medium">{efficiencyBoost}%</span>
        </li>
        <li className="flex items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent mr-2"></div>
          Mejorar la satisfacción del cliente hasta un <span className="text-xelia-accent font-medium">{satisfactionBoost}%</span>
        </li>
        <li className="flex items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-xelia-accent mr-2"></div>
          Incrementar las conversiones hasta un <span className="text-xelia-accent font-medium">{conversionBoost}%</span>
        </li>
      </ul>
    </div>
  );
};

export default ROIMetrics;
