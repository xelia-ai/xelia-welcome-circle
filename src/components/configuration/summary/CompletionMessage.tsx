
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CompletionMessage: React.FC = () => {
  return (
    <div className="md:col-span-2 bg-xelia-accent/20 border border-xelia-accent/30 rounded-lg p-5">
      <div className="flex items-start">
        <CheckCircle2 className="w-5 h-5 text-xelia-accent mr-3 mt-0.5" />
        <div>
          <h3 className="text-lg font-medium text-white mb-2">¡Tu configuración está completa!</h3>
          <p className="text-gray-300">
            Xelia ha sido entrenada con tus documentos y/o sitio web, y configurada según tus preferencias. Haz clic en "Finalizar" para continuar a la demo y ver a Xelia en acción.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionMessage;
