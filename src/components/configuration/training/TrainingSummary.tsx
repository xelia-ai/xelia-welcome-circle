
import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface TrainingSummaryProps {
  activeTab: string;
  filesCount: number;
  websiteUrl: string;
}

const TrainingSummary: React.FC<TrainingSummaryProps> = ({ 
  activeTab, 
  filesCount, 
  websiteUrl 
}) => {
  const hasContent = filesCount > 0 || websiteUrl;

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-medium mb-4 text-white flex items-center">
        {hasContent ? (
          <CheckCircle2 className="w-5 h-5 mr-2 text-xelia-accent" />
        ) : (
          <Info className="w-5 h-5 mr-2 text-gray-400" />
        )}
        Resumen
      </h3>
      
      {hasContent ? (
        <p className="text-gray-300">
          {activeTab === "docs" ? (
            filesCount > 0 ? (
              <>Xelia procesará <strong className="text-white">{filesCount} documento{filesCount > 1 ? 's' : ''}</strong> para entrenarse y brindar respuestas más precisas.</>
            ) : (
              <>Sube documentos para entrenar a Xelia con tu información específica.</>
            )
          ) : (
            websiteUrl ? (
              <>Xelia analizará <strong className="text-white">{websiteUrl}</strong> para entender tu negocio y brindar respuestas más precisas.</>
            ) : (
              <>Ingresa la URL de tu sitio web para que Xelia pueda analizarlo.</>
            )
          )}
        </p>
      ) : (
        <p className="text-gray-300">
          No has proporcionado ninguna fuente de información para entrenar a Xelia.
          <span className="block mt-2 text-yellow-300 text-sm">
            Podrás configurar el entrenamiento posteriormente desde tu dashboard.
          </span>
        </p>
      )}
    </div>
  );
};

export default TrainingSummary;
