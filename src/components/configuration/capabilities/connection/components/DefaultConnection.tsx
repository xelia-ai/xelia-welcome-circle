
import React from 'react';
import { Link, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DefaultConnectionProps {
  isConnected: boolean;
  connecting: boolean;
  onConnect: () => void;
}

export const DefaultConnection: React.FC<DefaultConnectionProps> = ({
  isConnected,
  connecting,
  onConnect
}) => {
  return (
    <Button 
      size="sm" 
      variant={isConnected ? "outline" : "default"}
      onClick={onConnect}
      disabled={connecting}
      className={cn(
        "w-full",
        isConnected 
          ? "bg-transparent border-[#3EF3B0] text-[#3EF3B0] hover:bg-[#3EF3B0]/10" 
          : "bg-[#3EF3B0]/20 text-[#3EF3B0] hover:bg-[#3EF3B0]/30 border-transparent"
      )}
    >
      {connecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Link className="w-4 h-4 mr-2" />}
      {connecting ? "Conectando..." : isConnected ? "Desconectar" : "Conectar"}
    </Button>
  );
};
