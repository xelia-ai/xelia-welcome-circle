
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface AdditionalSupportProps {
  onConsultantClick: () => void;
}

const AdditionalSupport: React.FC<AdditionalSupportProps> = ({
  onConsultantClick
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <span className="h-5 w-5 mr-2 text-xelia-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </span>
        Soporte adicional o desarrollo a medida
      </h3>
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2" 
          onClick={onConsultantClick}
        >
          <Calendar className="h-4 w-4" />
          Agendar llamada con un consultor
        </Button>
        <Button variant="outline" className="w-full">
          Solicitar desarrollo personalizado
        </Button>
      </div>
    </div>
  );
};

export default AdditionalSupport;
