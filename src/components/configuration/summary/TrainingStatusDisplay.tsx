
import React from 'react';
import { FileText, Globe } from 'lucide-react';

interface TrainingStatusDisplayProps {
  website: string;
}

const TrainingStatusDisplay: React.FC<TrainingStatusDisplayProps> = ({ 
  website 
}) => {
  return (
    <div className="flex items-center">
      <div className="p-2 rounded-full bg-xelia-accent/10 text-xelia-accent mr-3">
        {website.includes('documento') ? (
          <FileText className="h-5 w-5" />
        ) : (
          <Globe className="h-5 w-5" />
        )}
      </div>
      <div>
        <p className="text-white font-medium">{website ? website : 'No configurado'}</p>
        <p className="text-sm text-gray-400">
          {website.includes('documento') 
            ? 'Xelia aprendió de tus documentos' 
            : 'Xelia analizará tu sitio web'}
        </p>
      </div>
    </div>
  );
};

export default TrainingStatusDisplay;
