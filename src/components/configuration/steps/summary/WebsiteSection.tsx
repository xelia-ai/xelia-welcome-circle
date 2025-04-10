
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
          <div className="flex items-center group hover:text-white transition-colors duration-300">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mr-2 flex-shrink-0 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
              <Check className="w-3 h-3 text-purple-400 group-hover:text-purple-300" />
            </div>
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
