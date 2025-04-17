
import React from 'react';
import { Building2, Briefcase, Store } from 'lucide-react';
import SectionContainer from './SectionContainer';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface IndustriesSectionProps {
  industryNames: string[];
  onEdit: () => void;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  industryNames,
  onEdit
}) => {
  const navigate = useNavigate();
  
  const getIndustryIcon = (industryName: string) => {
    if (industryName.toLowerCase().includes('comercio') || 
        industryName.toLowerCase().includes('retail') ||
        industryName.toLowerCase().includes('tienda')) {
      return <Store className="w-4 h-4" />;
    } else if (industryName.toLowerCase().includes('finanza') || 
               industryName.toLowerCase().includes('banco') ||
               industryName.toLowerCase().includes('seguro')) {
      return <Briefcase className="w-4 h-4" />;
    }
    return <Building2 className="w-4 h-4" />;
  };
  
  const handleEditClick = () => {
    navigate('/configure?step=industry');
  };
  
  return (
    <SectionContainer 
      title="Industria" 
      onEdit={handleEditClick}
    >
      <div className="space-y-3">
        {industryNames.map((name, index) => (
          <div key={index} className="flex items-center p-3 rounded-lg bg-gray-700/30 border border-gray-700 hover:border-gray-600 transition-all duration-300">
            <div className="p-2 rounded-md bg-gray-700/70 border border-gray-600 mr-3 text-white">
              {getIndustryIcon(name)}
            </div>
            <div>
              <span className="text-gray-300">{name}</span>
              {index === 0 && (
                <Badge className="ml-2 text-xs bg-gray-700 text-gray-300">Principal</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default IndustriesSection;
