
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentUploader from './training/DocumentUploader';
import FileList from './training/FileList';
import WebsiteInput from './training/WebsiteInput';
import TrainingSummary from './training/TrainingSummary';
import { useToast } from '@/hooks/use-toast';
import { InfoCircle } from 'lucide-react';

interface TrainingDocsUploadProps {
  website?: string;
  onWebsiteChange: (url: string) => void;
  onFilesSelected: (files: File[]) => void;
  onSkipTraining?: (skip: boolean) => void;
}

const TrainingDocsUpload: React.FC<TrainingDocsUploadProps> = ({ 
  website = '',
  onWebsiteChange,
  onFilesSelected,
  onSkipTraining
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

  const handleSkipTraining = () => {
    if (onSkipTraining) {
      onSkipTraining(true);
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

      <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-800/50 rounded-md">
        <div className="flex items-start">
          <InfoCircle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-yellow-300 text-sm">
              <span className="font-medium">¿Prefieres configurar esto más tarde?</span> No hay problema. 
              Puedes omitir este paso ahora y configurar el entrenamiento de Xelia desde tu dashboard cuando lo desees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDocsUpload;
