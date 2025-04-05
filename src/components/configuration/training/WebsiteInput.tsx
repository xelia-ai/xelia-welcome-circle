
import React from 'react';
import { Input } from '@/components/ui/input';
import { CheckCircle2 } from 'lucide-react';

interface WebsiteInputProps {
  websiteUrl: string;
  onChange: (url: string) => void;
}

const WebsiteInput: React.FC<WebsiteInputProps> = ({ websiteUrl, onChange }) => {
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <p className="text-sm text-gray-300 mb-2">Ingresa la URL de tu sitio web:</p>
        <Input 
          value={websiteUrl} 
          onChange={handleWebsiteChange}
          placeholder="https://tuempresa.com"
          className="bg-gray-800 border-gray-600 text-white"
        />
        <p className="text-xs text-gray-500 mt-2">
          Xelia analizará el contenido de tu sitio web para entender tu negocio.
        </p>
      </div>
      
      {websiteUrl && (
        <div className="p-3 bg-green-900/20 border border-green-800 rounded-md text-green-300 flex items-start">
          <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>Xelia analizará el contenido de <strong>{websiteUrl}</strong> para brindar respuestas más precisas.</p>
        </div>
      )}
    </div>
  );
};

export default WebsiteInput;
