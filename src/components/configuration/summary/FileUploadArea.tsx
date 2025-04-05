
import React from 'react';
import { FileText } from 'lucide-react';

const FileUploadArea: React.FC = () => {
  // Create a reference to the hidden file input element
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Handle the button click to trigger file selection
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
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
      />
    </div>
  );
};

export default FileUploadArea;
