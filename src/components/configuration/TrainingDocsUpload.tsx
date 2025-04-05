
import React, { useState, useCallback } from 'react';
import { Upload, FileText, Check, File } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface TrainingDocsUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const TrainingDocsUpload: React.FC<TrainingDocsUploadProps> = ({ onFilesSelected }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
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
          Entrena a Xelia con tus documentos
        </h3>
        <p className="text-gray-300 mb-6">
          Sube tus documentos (PDF, Word, CSV, etc.) para que Xelia aprenda de ellos y pueda ofrecer respuestas más precisas basadas en tu información.
        </p>

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
          
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" className="bg-xelia-accent/20 border-xelia-accent/40 text-white hover:bg-xelia-accent/30">
              <Upload className="w-4 h-4 mr-2" />
              Seleccionar archivos
            </Button>
            <Input 
              id="file-upload" 
              type="file" 
              multiple 
              accept=".pdf,.doc,.docx,.csv,.xls,.xlsx,.txt" 
              className="hidden" 
              onChange={handleFileInput}
            />
          </label>
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
      </div>

      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4 text-white flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-xelia-accent" />
          Resumen
        </h3>
        <p className="text-gray-300">
          {files.length > 0 ? (
            <>Xelia procesará <strong className="text-white">{files.length} documento{files.length > 1 ? 's' : ''}</strong> para entrenarse y brindar respuestas más precisas.</>
          ) : (
            <>Sube documentos para entrenar a Xelia con tu información específica.</>
          )}
        </p>
      </div>
    </div>
  );
};

export default TrainingDocsUpload;
