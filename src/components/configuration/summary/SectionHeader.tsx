
import React from 'react';
import { Edit, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectionHeaderProps {
  title: string;
  section: string;
  editingSection: string | null;
  onEditClick: () => void;
  onCancel: () => void;
  onSave: (section: 'industry' | 'website' | 'capabilities' | 'integrations') => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  section, 
  editingSection, 
  onEditClick, 
  onCancel, 
  onSave 
}) => (
  <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
    <h3 className="text-lg font-medium text-white">{title}</h3>
    {editingSection === section ? (
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-8 border-gray-600 text-gray-300"
          onClick={onCancel}
        >
          <X className="h-3 w-3 mr-1" />
          Cancelar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-8 border-green-600 text-green-400"
          onClick={() => onSave(section as 'industry' | 'website' | 'capabilities' | 'integrations')}
        >
          <Check className="h-3 w-3 mr-1" />
          Guardar
        </Button>
      </div>
    ) : (
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs h-8 border-gray-600 text-gray-300"
        onClick={onEditClick}
      >
        <Edit className="h-3 w-3 mr-1" />
        Editar
      </Button>
    )}
  </div>
);

export default SectionHeader;
