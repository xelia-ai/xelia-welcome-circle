
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUploadArea from './FileUploadArea';
import WebsiteInput from '../training/WebsiteInput';

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
        <WebsiteInput 
          websiteUrl={tempWebsite} 
          onChange={setTempWebsite}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TrainingTabs;
