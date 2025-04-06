
import React from 'react';
import { Sparkles } from 'lucide-react';

const EmptyTipState: React.FC = () => {
  return (
    <div className="text-center">
      <Sparkles className="h-10 w-10 text-gray-400 mx-auto mb-4" />
      <h3 className="text-white text-lg font-medium mb-2">¿Sabías que...?</h3>
      <p className="text-gray-300 text-sm">
        Selecciona capacidades para descubrir consejos y estrategias personalizadas.
      </p>
    </div>
  );
};

export default EmptyTipState;
