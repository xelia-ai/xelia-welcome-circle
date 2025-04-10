
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';

interface SectionContainerProps {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  onEdit,
  children
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs bg-transparent border-gray-600 hover:bg-gray-700"
          onClick={onEdit}
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Editar
        </Button>
      </div>
      <div className="bg-gray-700/30 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;
