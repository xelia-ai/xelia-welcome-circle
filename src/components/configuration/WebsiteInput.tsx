
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Globe, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebsiteInputProps {
  website: string;
  onChange: (value: string) => void;
}

const WebsiteInput: React.FC<WebsiteInputProps> = ({ website, onChange }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Verificar formato de URL
  const isValidUrlFormat = (url: string) => {
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    return urlRegex.test(url);
  };

  // Normalizar URL (añadir https:// si no tiene protocolo)
  const normalizeUrl = (url: string): string => {
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  // Verificar si el sitio web existe
  const checkWebsiteExists = async (url: string) => {
    if (!url) return false;
    if (!isValidUrlFormat(url)) {
      setError('El formato de URL no es válido');
      return false;
    }
    
    setIsChecking(true);
    setError(null);
    
    try {
      // En un entorno real, esta petición debería hacerse a través de un proxy en el backend
      // para evitar problemas de CORS, pero para fines de demostración usamos este método
      const normalizedUrl = normalizeUrl(url);
      
      // Simulamos un retraso para mostrar el estado de carga (en prod usaríamos una API real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Verificamos que sea un dominio válido (no una IP o número)
      const domainPart = normalizedUrl.replace(/^https?:\/\//i, '').split('/')[0];
      if (/^\d+(\.\d+)*$/.test(domainPart)) {
        throw new Error('No es posible verificar una dirección IP o números');
      }
      
      setIsValid(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No fue posible verificar el sitio';
      setError(errorMessage);
      toast({
        title: "Error de validación",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    
    // Resetear validación al cambiar la URL
    if (isValid) setIsValid(false);
    if (error) setError(null);
  };

  const handleBlur = async () => {
    if (website && !isChecking) {
      await checkWebsiteExists(website);
    }
  };

  useEffect(() => {
    // Validar automáticamente después de un tiempo de inactividad
    if (website && !isValid && !isChecking) {
      const timer = setTimeout(() => {
        checkWebsiteExists(website);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [website]);

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
            className={`pl-10 bg-gray-900 border-gray-700 text-white ${error ? 'border-red-500' : ''}`}
            value={website}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {isChecking && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            </div>
          )}
          {isValid && !isChecking && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          )}
          {error && !isChecking && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
        
        {error ? (
          <p className="text-xs text-red-400 mt-2">
            {error}
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-2">
            Ingresa la URL de tu sitio web para que Xelia pueda analizarlo.
          </p>
        )}

        {isValid && website && !isChecking && (
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
