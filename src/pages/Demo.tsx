
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Mic, MicOff, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Demo = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "¡Hola! Soy tu asistente Xelia. ¿En qué puedo ayudarte hoy?", isUser: false}
  ]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  // Simulación de configuración (en una aplicación real, esto vendría del estado global o contexto)
  const config = {
    industryCount: 2, // Ejemplo: 2 industrias seleccionadas
    capabilitiesPrice: 300,
    basePrice: 499,
    industryPrice: 50, // $50 por una industria adicional
    totalPrice: 849 // 499 base + 300 capacidades + 50 industria adicional
  };
  
  const toggleListening = () => {
    if (!isListening) {
      // Start listening
      setIsListening(true);
      
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        const newMessage = {text: "Me gustaría saber más sobre sus servicios", isUser: true};
        setMessages(prev => [...prev, newMessage]);
        
        // Simulate assistant response after 2 more seconds
        setTimeout(() => {
          const response = {
            text: "Con gusto. Xelia ofrece asistentes de IA personalizados para automatizar la atención al cliente y ventas. Puedes integrarlo con WhatsApp, programar citas automáticamente y responder en múltiples idiomas. ¿Hay alguna función específica que te interese?", 
            isUser: false
          };
          setMessages(prev => [...prev, response]);
          setIsListening(false);
        }, 2000);
      }, 3000);
    } else {
      // Stop listening
      setIsListening(false);
    }
  };
  
  const handleContinueToPayment = () => {
    setShowPaymentDialog(true);
  };
  
  const handlePaymentSuccess = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentDialog(false);
      navigate('/dashboard'); // Redirect to dashboard (you'd need to create this page)
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-xelia-dark to-xelia-light px-4 py-8">
      <div className="max-w-2xl w-full bg-xelia-dark/80 rounded-xl p-8 shadow-lg backdrop-blur-lg border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            ¡Tu agente Xelia está listo!
          </h1>
          <p className="text-lg text-gray-300">
            Has completado exitosamente la configuración de Xelia. Prueba tu asistente inteligente ahora con interacción por voz.
          </p>
        </div>

        {/* Conversation demo area */}
        <div className="bg-xelia-light/10 border border-white/10 rounded-lg p-6 mb-8 h-96 flex flex-col">
          <div className="flex-grow overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser 
                      ? 'bg-xelia-accent text-white rounded-tr-none' 
                      : 'bg-gray-700 text-gray-100 rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isListening && (
              <div className="flex justify-center items-center py-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-xelia-accent/20 rounded-full animate-ping"></div>
                  <div className="relative bg-xelia-accent rounded-full p-3">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="ml-3 text-white animate-pulse">Escuchando...</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center">
            <Button 
              className={`rounded-full p-3 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-xelia-accent hover:bg-xelia-accent/90'}`}
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
            <p className="ml-3 text-white">
              {isListening ? 'Toca para detener' : 'Toca para hablar con tu agente'}
            </p>
          </div>
        </div>

        <div className="bg-xelia-accent/10 border border-xelia-accent/30 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <CreditCard className="w-6 h-6 text-xelia-accent mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Activa tu agente ahora
              </h3>
              <p className="text-gray-300 mb-4">
                Tu agente está configurado y listo para ser activado. Procede al pago para comenzar a utilizarlo en tu negocio.
              </p>
              <Button 
                className="bg-xelia-accent hover:bg-xelia-accent/90"
                onClick={handleContinueToPayment}
              >
                Continuar a pago
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
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-xelia-light border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Completa tu pago</DialogTitle>
            <DialogDescription className="text-gray-300">
              Activa tu agente Xelia con funcionalidades personalizadas.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-xelia-dark/50 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Resumen de tu plan:</h4>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Plan base</span>
                <span className="text-white">${config.basePrice} USD</span>
              </div>
              {config.industryCount > 1 && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Industrias adicionales ({config.industryCount - 1})</span>
                  <span className="text-white">${config.industryPrice} USD</span>
                </div>
              )}
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Capacidades adicionales</span>
                <span className="text-white">${config.capabilitiesPrice} USD</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-700">
                <span className="font-medium text-white">Total mensual</span>
                <span className="font-bold text-white">${config.totalPrice} USD</span>
              </div>
            </div>
            
            {/* Simulated Stripe payment form */}
            <div className="bg-white/5 p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300 block">Número de tarjeta</label>
                <div className="bg-white/10 p-2 rounded border border-gray-600 text-gray-400">
                  4242 4242 4242 4242
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <label className="text-sm text-gray-300 block">Fecha de expiración</label>
                  <div className="bg-white/10 p-2 rounded border border-gray-600 text-gray-400">
                    12/25
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm text-gray-300 block">CVC</label>
                  <div className="bg-white/10 p-2 rounded border border-gray-600 text-gray-400">
                    123
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              className="bg-xelia-accent hover:bg-xelia-accent/90 w-full"
              onClick={handlePaymentSuccess}
            >
              Completar pago
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Demo;
