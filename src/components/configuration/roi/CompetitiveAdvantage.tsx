
import React from 'react';

interface CompetitiveAdvantageProps {
  capabilitiesCount: number;
  totalCapabilities: number;
}

const CompetitiveAdvantage: React.FC<CompetitiveAdvantageProps> = ({
  capabilitiesCount,
  totalCapabilities
}) => {
  const getCompetitiveMessage = () => {
    if (capabilitiesCount === 0) {
      return "Activa capacidades para ver tu ventaja competitiva";
    } else if (capabilitiesCount <= totalCapabilities * 0.25) {
      return "Ventaja básica sobre la competencia";
    } else if (capabilitiesCount <= totalCapabilities * 0.5) {
      return "Ventaja significativa sobre la competencia";
    } else if (capabilitiesCount <= totalCapabilities * 0.75) {
      return "Ventaja notable sobre la competencia";
    } else {
      return "Ventaja máxima sobre la competencia";
    }
  };

  const competitiveMessage = getCompetitiveMessage();
  const competitiveAdvantage = capabilitiesCount === 0 ? 0 : Math.min(capabilitiesCount * (100 / totalCapabilities), 100);

  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-white font-medium">Ventaja competitiva</h4>
        <span className="text-xelia-accent font-bold">{Math.round(competitiveAdvantage)}%</span>
      </div>
      <p className="text-sm text-gray-300">{competitiveMessage}</p>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
        <div 
          className="bg-xelia-accent h-2.5 rounded-full" 
          style={{ width: `${competitiveAdvantage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CompetitiveAdvantage;
