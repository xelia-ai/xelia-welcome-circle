
import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface CompetitiveAdvantageProps {
  capabilitiesCount: number;
  totalCapabilities: number;
}

const CompetitiveAdvantage: React.FC<CompetitiveAdvantageProps> = ({
  capabilitiesCount,
  totalCapabilities
}) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    // Set the progress value based on selected capabilities
    setProgressValue(capabilitiesCount === 0 ? 0 : Math.min(capabilitiesCount * (100 / totalCapabilities), 100));
  }, [capabilitiesCount, totalCapabilities]);

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
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-white font-medium flex items-center">
          Ventaja competitiva
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400 ml-1.5 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px] text-sm">
              Representa cómo tu negocio se diferencia de la competencia al incorporar las capacidades de Xelia
            </TooltipContent>
          </Tooltip>
        </h4>
        <motion.span 
          className="text-xelia-accent font-bold text-lg"
          key={competitiveAdvantage}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(competitiveAdvantage)}%
        </motion.span>
      </div>
      <p className="text-sm text-gray-300 mb-2">{competitiveMessage}</p>
      
      {/* Progress bar with improved animation */}
      <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-xelia-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progressValue}%` }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1], // Custom spring-like bounce effect
          }}
        />
      </div>
    </div>
  );
};

export default CompetitiveAdvantage;
