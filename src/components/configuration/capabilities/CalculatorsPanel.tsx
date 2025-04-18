
import React from 'react';
import ROICalculator from '../roi/ROICalculator';
import TipsWidget from '../roi/TipsWidget';
import CapabilitiesCalculator from '../CapabilitiesCalculator';

interface CalculatorsPanelProps {
  selectedCapabilities: string[];
  website?: string;
  industryCount?: number;
  volumePrice?: number;
  isMobile: boolean;
}

const CalculatorsPanel: React.FC<CalculatorsPanelProps> = ({
  selectedCapabilities,
  website = '',
  industryCount = 1,
  volumePrice = 0,
  isMobile
}) => {
  return (
    <>
      {/* ROI Calculator */}
      <div className="w-full">
        <ROICalculator 
          selectedCapabilities={selectedCapabilities} 
          website={website}
          fullWidth={true}
        />
      </div>
      
      {/* Tips Widget */}
      <div className="w-full">
        <TipsWidget selectedCapabilities={selectedCapabilities} />
      </div>
      
      {/* Capabilities Calculator only on desktop */}
      {!isMobile && (
        <div className="w-full">
          <CapabilitiesCalculator 
            selectedCapabilities={selectedCapabilities} 
            industryCount={industryCount}
            volumePrice={volumePrice}
          />
        </div>
      )}
    </>
  );
};

export default CalculatorsPanel;

