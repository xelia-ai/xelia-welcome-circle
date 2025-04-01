
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Globe } from 'lucide-react';

interface WebsiteInputProps {
  website: string;
  onChange: (value: string) => void;
}

const WebsiteInput: React.FC<WebsiteInputProps> = ({ website, onChange }) => {
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    
    // Simple validation - check if it's a properly formatted URL or domain
    const isValidUrl = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
      value
    );
    setIsValid(value !== '' && isValidUrl);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-medium mb-4 text-white">
          ¿Cuál es tu página web?
        </h3>
        <p className="text-gray-300 mb-6">
          Xelia podrá analizar tu sitio web e interactuar con tus clientes en base a la información disponible.
        </p>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Globe className="w-5 h-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="tu-sitio.com o https://tu-sitio.com"
            className="pl-10 bg-gray-900 border-gray-700 text-white"
            value={website}
            onChange={handleChange}
          />
          {isValid && website && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        {isValid && website && (
          <div className="mt-4 p-3 bg-green-900/20 border border-green-800 rounded-md text-green-300 flex items-start">
            <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>¡Perfecto! Hemos detectado tu sitio web. Xelia podrá analizar el contenido para brindar respuestas más precisas.</p>
          </div>
        )}
      </div>

      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4 text-white flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-xelia-accent" />
          Resumen
        </h3>
        <p className="text-gray-300">
          {isValid && website ? (
            <>Xelia podrá analizar e integrar información de <strong className="text-white">{website}</strong>.</>
          ) : (
            <>Ingresa la URL de tu sitio web para que Xelia pueda analizar su contenido.</>
          )}
        </p>
      </div>
    </div>
  );
};

export default WebsiteInput;
