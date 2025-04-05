
import React, { useState } from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FileUploadArea: React.FC = () => {
  // Estado para almacenar los archivos subidos
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  // Create a reference to the hidden file input element
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Handle the button click to trigger file selection
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Manejar la selección de archivos
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Archivos subidos",
        description: `${newFiles.length} archivo(s) subido(s) correctamente.`,
        variant: "default",
      });
      
      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Manejar la eliminación de archivos
  const handleRemoveFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
    
    toast({
      title: "Archivo eliminado",
      description: "El archivo ha sido eliminado correctamente.",
      variant: "default",
    });
  };

  // Obtener icono según la extensión del archivo
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
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div>
      <div className="border-2 border-dashed rounded-lg p-4 text-center border-gray-600">
        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-white font-medium mb-1">Arrastra y suelta tus documentos aquí</p>
        <p className="text-gray-400 text-xs mb-2">PDF, Word, Excel, CSV (máx. 10MB)</p>
        <button 
          className="bg-xelia-accent/20 border border-xelia-accent/40 text-white px-3 py-1 rounded-md text-sm"
          onClick={handleButtonClick}
        >
          Seleccionar archivos
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
          onChange={handleFileChange}
        />
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
                <button 
                  onClick={() => handleRemoveFile(index)}
                  className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-400/10"
                  title="Eliminar archivo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
