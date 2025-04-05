
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentUploader from './training/DocumentUploader';
import FileList from './training/FileList';
import WebsiteInput from './training/WebsiteInput';
import TrainingSummary from './training/TrainingSummary';
import { useToast } from '@/hooks/use-toast';

interface TrainingDocsUploadProps {
  website?: string;
  onWebsiteChange: (url: string) => void;
  onFilesSelected: (files: File[]) => void;
}

const TrainingDocsUpload: React.FC<TrainingDocsUploadProps> = ({ 
  website = '',
  onWebsiteChange,
  onFilesSelected 
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState(website);
  const [activeTab, setActiveTab] = useState<string>("docs");
  const [isWebsiteValid, setIsWebsiteValid] = useState(false);
  const { toast } = useToast();
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(prev => [...prev, ...selectedFiles]);
    onFilesSelected(selectedFiles);
  };

  const handleWebsiteUrlChange = (url: string) => {
    setWebsiteUrl(url);
    // Solo actualizaremos el estado global cuando se valide la URL
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Si cambia a documentos y hay archivos, actualiza usando los archivos
    if (value === "docs" && files.length > 0) {
      onFilesSelected(files);
    }
  };

  // Esta función será llamada por el componente WebsiteInput cuando la validación sea exitosa
  const handleWebsiteValidated = (validUrl: string, isValid: boolean) => {
    setIsWebsiteValid(isValid);
    if (isValid) {
      onWebsiteChange(validUrl);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-medium mb-4 text-white">
          Entrena a Xelia con tu información
        </h3>
        <p className="text-gray-300 mb-6">
          Elige cómo quieres que Xelia aprenda sobre tu negocio para brindar respuestas más precisas.
        </p>

        <Tabs defaultValue="docs" onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="docs">Documentos</TabsTrigger>
            <TabsTrigger value="website">Sitio Web</TabsTrigger>
          </TabsList>
          
          <TabsContent value="docs">
            <DocumentUploader onFilesSelected={handleFilesSelected} />
            <FileList files={files} />
          </TabsContent>
          
          <TabsContent value="website">
            <WebsiteInput 
              websiteUrl={websiteUrl} 
              onChange={handleWebsiteUrlChange} 
            />
          </TabsContent>
        </Tabs>
      </div>

      <TrainingSummary 
        activeTab={activeTab}
        filesCount={files.length}
        websiteUrl={websiteUrl}
      />
    </div>
  );
};

export default TrainingDocsUpload;
