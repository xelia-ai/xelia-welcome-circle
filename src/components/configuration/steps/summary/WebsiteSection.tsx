
import React, { useState } from 'react';
import { Check, Upload, Globe } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WebsiteSectionProps {
  website: string;
  onEdit: () => void;
}

const WebsiteSection: React.FC<WebsiteSectionProps> = ({
  website,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState(website);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real implementation, we would send the files to a backend
    // For now, we'll just update the UI
    setIsEditing(false);
    toast({
      title: "Información actualizada",
      description: files.length > 0 
        ? `${files.length} archivos cargados para entrenamiento.` 
        : "URL actualizada correctamente.",
      variant: "default",
    });
    onEdit();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setWebsiteUrl(website);
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <SectionContainer 
      title="Información de Entrenamiento" 
      onEdit={handleEditClick}
      customButtons={isEditing ? (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={handleCancel}>Cancelar</Button>
          <Button size="sm" onClick={handleSave}>Guardar</Button>
        </div>
      ) : undefined}
      hideDefaultEditButton={isEditing}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="website-url" className="block text-sm font-medium text-gray-300 mb-1">
              URL del sitio web
            </label>
            <Input
              id="website-url"
              placeholder="https://tu-sitio.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white"
            />
          </div>
          <div className="border border-dashed border-gray-600 rounded-md p-4">
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-300 mb-2">Arrastra archivos o haz clic para seleccionar</p>
              <input 
                type="file" 
                id="file-upload" 
                multiple
                accept=".pdf,.doc,.docx,.txt"
                className="hidden" 
                onChange={handleFileChange}
              />
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-300 border-gray-600 hover:bg-gray-700"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Seleccionar archivos
              </Button>
            </div>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-300">Archivos seleccionados:</p>
                <ul className="text-sm text-gray-400">
                  {Array.from(files).map((file, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" /> {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-300">
          {website ? (
            <div className="flex items-center group hover:text-white transition-colors duration-300">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mr-2 flex-shrink-0 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <Globe className="w-3 h-3 text-purple-400 group-hover:text-purple-300" />
              </div>
              {website}
            </div>
          ) : (
            <span className="text-gray-400 italic">No has proporcionado información de entrenamiento</span>
          )}
        </div>
      )}
    </SectionContainer>
  );
};

export default WebsiteSection;
