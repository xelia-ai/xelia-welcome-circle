
import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface CompetitiveAdvantageProps {
  capabilitiesCount: number;
  totalCapabilities: number;
}

const CompetitiveAdvantage: React.FC<CompetitiveAdvantageProps> = ({
  capabilitiesCount,
  totalCapabilities
}) => {
  const [progressValue, setProgressValue] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    // Set the progress value based on selected capabilities
    const newProgressValue = capabilitiesCount === 0 ? 0 : Math.min(capabilitiesCount * (100 / totalCapabilities), 100);
    setProgressValue(newProgressValue);

    // Animate the progress bar with enhanced animation
    controls.start({
      width: `${newProgressValue}%`,
      transition: {
        duration: 1.2,
        type: "spring", 
        stiffness: 60, 
        damping: 15,
        mass: 1,
        velocity: 2
      }
    });
  }, [capabilitiesCount, totalCapabilities, controls]);

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
    <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 shadow-elegant">
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
        <AnimatePresence mode="wait">
          <motion.span 
            key={Math.round(competitiveAdvantage)}
            className="text-xelia-accent font-bold text-lg"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ 
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1] // Apple-like easing
            }}
          >
            {Math.round(competitiveAdvantage)}%
          </motion.span>
        </AnimatePresence>
      </div>
      
      {/* Only show message if capabilities are selected, otherwise rely on the message in ROICalculator */}
      {capabilitiesCount > 0 && (
        <AnimatePresence mode="wait">
          <motion.p 
            key={competitiveMessage}
            className="text-sm text-gray-300 mb-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            {competitiveMessage}
          </motion.p>
        </AnimatePresence>
      )}
      
      {/* Progress bar with enhanced animation */}
      <div className="h-2.5 w-full bg-gray-700/80 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-xelia-accent to-xelia-accent-light"
          initial={{ width: 0 }}
          animate={controls}
          style={{ 
            boxShadow: '0 0 8px rgba(92, 106, 255, 0.5)',
            borderRadius: 'inherit'
          }}
        />
      </div>
    </div>
  );
};

export default CompetitiveAdvantage;
