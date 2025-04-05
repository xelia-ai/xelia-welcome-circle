
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { FileText } from 'lucide-react';
import FileUploadArea from './FileUploadArea';

interface TrainingTabsProps {
  tempWebsite: string;
  setTempWebsite: (website: string) => void;
}

const TrainingTabs: React.FC<TrainingTabsProps> = ({
  tempWebsite,
  setTempWebsite,
}) => {
  return (
    <Tabs defaultValue="docs" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="docs">Documentos</TabsTrigger>
        <TabsTrigger value="website">Sitio Web</TabsTrigger>
      </TabsList>
      
      <TabsContent value="docs" className="space-y-4">
        <p className="text-sm text-gray-300 mb-2">Sube documentos para entrenar a Xelia:</p>
        <FileUploadArea />
      </TabsContent>
      
      <TabsContent value="website">
        <p className="text-sm text-gray-300 mb-2">Ingresa la URL de tu sitio web:</p>
        <Input 
          value={tempWebsite} 
          onChange={(e) => setTempWebsite(e.target.value)}
          placeholder="https://tuempresa.com"
          className="bg-gray-800 border-gray-600 text-white"
        />
        <p className="text-xs text-gray-500 mt-2">
          Xelia podrá analizar el contenido para brindar respuestas más precisas.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default TrainingTabs;
