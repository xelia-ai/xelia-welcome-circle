
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IndustryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const IndustryTabs: React.FC<IndustryTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  children 
}) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-5 w-full bg-gray-800/60 mb-4">
        <TabsTrigger value="servicios">Servicios</TabsTrigger>
        <TabsTrigger value="comercial">Comercial</TabsTrigger>
        <TabsTrigger value="financiero">Financiero</TabsTrigger>
        <TabsTrigger value="otros">Otros</TabsTrigger>
        <TabsTrigger value="todas">Todas</TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab} className="mt-0">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default IndustryTabs;
