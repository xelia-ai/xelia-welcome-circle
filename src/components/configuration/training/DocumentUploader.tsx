
import React, { useState, useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DocumentUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
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
      onFilesSelected(droppedFiles);
    }
  }, [onFilesSelected]);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onFilesSelected(selectedFiles);
    }
  }, [onFilesSelected]);

  const handleSelectFilesClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
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
  );
};

export default DocumentUploader;
