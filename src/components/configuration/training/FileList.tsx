
import React from 'react';
import { FileText, File, Check } from 'lucide-react';

interface FileListProps {
  files: File[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  if (files.length === 0) return null;

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
  );
};

export default FileList;
