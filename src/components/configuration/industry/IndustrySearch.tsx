
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface IndustrySearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const IndustrySearch: React.FC<IndustrySearchProps> = ({ searchTerm, setSearchTerm }) => {
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Buscar industria..."
        className="pl-10 bg-gray-800/60 border border-gray-700 text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button 
          className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default IndustrySearch;
