
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-xelia-dark to-xelia-light px-4 py-8">
      <div className="max-w-2xl w-full bg-xelia-light rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            ¡Tu agente Xelia está listo!
          </h1>
          <p className="text-lg text-gray-300">
            Has completado exitosamente la configuración de Xelia. Tu asistente inteligente ahora está personalizado para tu industria y necesidades específicas.
          </p>
        </div>

        <div className="bg-xelia-accent/10 border border-xelia-accent/30 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <MessageCircle className="w-6 h-6 text-xelia-accent mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Prueba Xelia ahora
              </h3>
              <p className="text-gray-300 mb-4">
                Interactúa con tu nuevo asistente y descubre cómo puede ayudar a tu negocio.
              </p>
              <Button className="bg-xelia-accent hover:bg-xelia-accent/90">
                Iniciar conversación
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/configure')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Volver a la configuración
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
