
import React from 'react';
import { FileText, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SectionHeader from './SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WebsiteSectionProps {
  website: string;
  tempWebsite: string;
  editingSection: string | null;
  setTempWebsite: (website: string) => void;
  startEditing: (section: string) => void;
  cancelEditing: () => void;
  saveChanges: (section: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

const WebsiteSection: React.FC<WebsiteSectionProps> = ({
  website,
  tempWebsite,
  editingSection,
  setTempWebsite,
  startEditing,
  cancelEditing,
  saveChanges
}) => {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
      <SectionHeader 
        title="Entrenamiento" 
        section="website" 
        editingSection={editingSection}
        onEditClick={() => startEditing('website')} 
        onCancel={cancelEditing}
        onSave={saveChanges}
      />
      
      {editingSection === 'website' ? (
        <div className="p-3 bg-gray-700/40 rounded-lg">
          <Tabs defaultValue="docs" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="docs">Documentos</TabsTrigger>
              <TabsTrigger value="website">Sitio Web</TabsTrigger>
            </TabsList>
            
            <TabsContent value="docs" className="space-y-4">
              <p className="text-sm text-gray-300 mb-2">Sube documentos para entrenar a Xelia:</p>
              <div className="border-2 border-dashed rounded-lg p-4 text-center border-gray-600">
                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-white font-medium mb-1">Arrastra y suelta tus documentos aquí</p>
                <p className="text-gray-400 text-xs mb-2">PDF, Word, Excel, CSV (máx. 10MB)</p>
                <button className="bg-xelia-accent/20 border border-xelia-accent/40 text-white px-3 py-1 rounded-md text-sm">
                  Seleccionar archivos
                </button>
              </div>
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
        </div>
      ) : (
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-xelia-accent/10 text-xelia-accent mr-3">
            {website.includes('documento') ? (
              <FileText className="h-5 w-5" />
            ) : (
              <Globe className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-white font-medium">{website ? website : 'No configurado'}</p>
            <p className="text-sm text-gray-400">
              {website.includes('documento') 
                ? 'Xelia aprendió de tus documentos' 
                : 'Xelia analizará tu sitio web'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteSection;
