
import React from 'react';
import { FileText, Globe } from 'lucide-react';

interface TrainingStatusDisplayProps {
  website: string;
}

const TrainingStatusDisplay: React.FC<TrainingStatusDisplayProps> = ({ 
  website 
}) => {
  const isDocuments = website.includes('documento');
  const isEmpty = !website || website === '';
  
  return (
    <div className="flex items-center p-2 rounded-lg bg-gray-800/50">
      <div className="p-2 rounded-full bg-xelia-accent/10 text-xelia-accent mr-3">
        {isDocuments ? (
          <FileText className="h-5 w-5" />
        ) : (
          <Globe className="h-5 w-5" />
        )}
      </div>
      <div>
        <p className="text-white font-medium">
          {isEmpty ? 'No configurado' : website}
        </p>
        <p className="text-sm text-gray-400">
          {isEmpty ? 'No se ha proporcionado información de entrenamiento' :
            isDocuments 
              ? 'Xelia aprendió de tus documentos' 
              : 'Xelia analizará tu sitio web'
          }
        </p>
      </div>
    </div>
  );
};

export default TrainingStatusDisplay;
