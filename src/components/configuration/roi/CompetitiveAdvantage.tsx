
import React, { useEffect, useState } from 'react';

interface CompetitiveAdvantageProps {
  capabilitiesCount: number;
  totalCapabilities: number;
}

const CompetitiveAdvantage: React.FC<CompetitiveAdvantageProps> = ({
  capabilitiesCount,
  totalCapabilities
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="bg-gray-700/50 rounded-lg p-4 mb-3">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-white font-medium">Ventaja competitiva</h4>
        <span className="text-xelia-accent font-bold text-lg">{Math.round(competitiveAdvantage)}%</span>
      </div>
      <p className="text-sm text-gray-300 mb-2">{competitiveMessage}</p>
      
      {/* Progress bar with animation */}
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-xelia-accent h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: animate ? `${competitiveAdvantage}%` : '0%' 
          }}
        ></div>
      </div>
    </div>
  );
};

export default CompetitiveAdvantage;
