
import React from 'react';
import { Button } from '@/components/ui/button';
import WelcomeCircle from '@/components/WelcomeCircle';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-xelia-dark to-xelia-light px-4 py-8">
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="w-full mb-8 animate-float-gentle">
          <WelcomeCircle />
        </div>
        
        <div className="text-center space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hola, soy Xelia. ¡Empecemos!
          </h1>
          
          <p className="text-lg text-gray-300 max-w-sm mx-auto">
            Tu asistente inteligente personalizado para acompañarte en todo momento.
          </p>
          
          <div className="mt-8">
            <Button 
              className="cta-button text-white font-medium px-8 py-6 rounded-xl text-lg animate-button-pulse"
              onClick={() => console.log('Configure agent clicked')}
            >
              Configura tu agente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
