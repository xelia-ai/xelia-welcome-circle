
import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, Check, File, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [isDragging, setIsDragging] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState(website);
  const [activeTab, setActiveTab] = useState<string>("docs");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles]);
      onFilesSelected(droppedFiles);
    }
  }, [onFilesSelected]);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
      onFilesSelected(selectedFiles);
    }
  }, [onFilesSelected]);

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setWebsiteUrl(url);
    onWebsiteChange(url);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Si cambia a la pestaña del sitio web y hay una URL válida, actualiza la configuración
    if (value === "website" && websiteUrl) {
      onWebsiteChange(websiteUrl);
    }
    // Si cambia a documentos y hay archivos, actualiza usando los archivos
    else if (value === "docs" && files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleSelectFilesClick = () => {
    // Abrir el diálogo de selección de archivos al hacer clic en el botón
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-400" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'csv':
      case 'xls':
      case 'xlsx':
        return <FileText className="w-5 h-5 text-green-400" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
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
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? 'border-xelia-accent bg-xelia-accent/10' : 'border-gray-600'
              } transition-colors duration-200`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-white font-medium mb-2">Arrastra y suelta tus documentos aquí</p>
              <p className="text-gray-400 text-sm mb-4">o</p>
              
              <Button 
                variant="outline" 
                className="bg-xelia-accent/20 border-xelia-accent/40 text-white hover:bg-xelia-accent/30"
                onClick={handleSelectFilesClick}
              >
                <Upload className="w-4 h-4 mr-2" />
                Seleccionar archivos
              </Button>
              <Input 
                id="file-upload" 
                ref={fileInputRef}
                type="file" 
                multiple 
                accept=".pdf,.doc,.docx,.csv,.xls,.xlsx,.txt" 
                className="hidden" 
                onChange={handleFileInput}
              />
              <p className="text-xs text-gray-500 mt-4">
                PDF, Word, Excel, CSV, Text (max 10MB por archivo)
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">Documentos añadidos ({files.length})</h4>
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center p-2 bg-gray-700/30 rounded-md">
                      {getFileIcon(file.name)}
                      <div className="ml-2 flex-1 truncate">
                        <p className="text-white text-sm truncate">{file.name}</p>
                        <p className="text-gray-400 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <Check className="w-5 h-5 text-green-400" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="website">
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
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4 text-white flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-xelia-accent" />
          Resumen
        </h3>
        <p className="text-gray-300">
          {activeTab === "docs" ? (
            files.length > 0 ? (
              <>Xelia procesará <strong className="text-white">{files.length} documento{files.length > 1 ? 's' : ''}</strong> para entrenarse y brindar respuestas más precisas.</>
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
      </div>
    </div>
  );
};

export default TrainingDocsUpload;
