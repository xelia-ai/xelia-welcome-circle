
import React from 'react';
import { Check } from 'lucide-react';
import SectionContainer from './SectionContainer';

interface WebsiteSectionProps {
  website: string;
  onEdit: () => void;
}

const WebsiteSection: React.FC<WebsiteSectionProps> = ({
  website,
  onEdit
}) => {
  return (
    <SectionContainer title="Información de Entrenamiento" onEdit={onEdit}>
      <div className="text-gray-300">
        {website ? (
          <div className="flex items-center">
            <Check className="w-4 h-4 text-xelia-accent mr-2" />
            {website}
          </div>
        ) : (
          <span className="text-gray-400 italic">No has proporcionado información de entrenamiento</span>
        )}
      </div>
    </SectionContainer>
  );
};

export default WebsiteSection;
