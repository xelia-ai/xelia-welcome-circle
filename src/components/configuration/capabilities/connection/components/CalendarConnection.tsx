
import React from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CalendarConnectionProps {
  isConnected: boolean;
  selectedIntegration: string;
  connecting: boolean;
  onSelectIntegration: (value: string) => void;
  onConnect: () => void;
}

export const CalendarConnection: React.FC<CalendarConnectionProps> = ({
  isConnected,
  selectedIntegration,
  connecting,
  onSelectIntegration,
  onConnect
}) => {
  return (
    <div className="space-y-2">
      <Select 
        onValueChange={onSelectIntegration}
        value={selectedIntegration}
      >
        <SelectTrigger className="bg-gray-700/70 border-gray-600 text-sm">
          <SelectValue placeholder="Seleccionar calendario" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="google-calendar">Google Calendar</SelectItem>
          <SelectItem value="outlook">Outlook</SelectItem>
          <SelectItem value="calendly">Calendly</SelectItem>
          <SelectItem value="flireo">Flireo</SelectItem>
        </SelectContent>
      </Select>
      
      {selectedIntegration && !isConnected && (
        <Button 
          size="sm" 
          onClick={onConnect}
          disabled={connecting}
          className="w-full bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-transparent"
        >
          {connecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Calendar className="w-4 h-4 mr-2" />}
          {connecting ? "Conectando..." : "Conectar calendario"}
        </Button>
      )}
      
      {isConnected && (
        <div className="flex items-center justify-between">
          <div className="text-[#3EF3B0] text-sm flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {selectedIntegration === 'google-calendar' ? 'Google Calendar' : 
               selectedIntegration === 'outlook' ? 'Outlook' : 
               selectedIntegration === 'calendly' ? 'Calendly' : 'Flireo'} conectado
            </span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onConnect}
            className="border-[#3EF3B0]/30 text-[#3EF3B0] hover:bg-[#3EF3B0]/10"
          >
            Desconectar
          </Button>
        </div>
      )}
    </div>
  );
};
