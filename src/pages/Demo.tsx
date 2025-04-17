
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationDemo from '@/components/demo/ConversationDemo';
import ActivationCard from '@/components/demo/ActivationCard';
import PaymentDialog from '@/components/demo/PaymentDialog';
import NavigationButtons from '@/components/demo/NavigationButtons';

const Demo = () => {
  const navigate = useNavigate();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  // Simulación de configuración (en una aplicación real, esto vendría del estado global o contexto)
  const config = {
    industryCount: 2, // Ejemplo: 2 industrias seleccionadas
    capabilitiesPrice: 300,
    basePrice: 75, // Updated to $75 as requested
    industryPrice: 50, // $50 por una industria adicional
    totalPrice: 475 // 75 base + 300 capacidades + 50 industria adicional + 50 volumen
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-xelia-dark to-xelia-light p-4 py-8">
      <div className="max-w-2xl w-full bg-xelia-dark/80 rounded-xl p-6 md:p-8 shadow-lg backdrop-blur-lg border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¡Tu agente Xelia está listo!
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            Has completado exitosamente la configuración de Xelia. Prueba tu asistente inteligente ahora con interacción por voz.
          </p>
        </div>

        {/* Conversation demo area */}
        <ConversationDemo 
          initialMessage="¡Hola! Soy tu asistente Xelia. ¿En qué puedo ayudarte hoy?" 
        />

        <ActivationCard onActivate={handleContinueToPayment} />

        <NavigationButtons />
      </div>
      
      {/* Payment Dialog */}
      <PaymentDialog 
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        onPaymentSuccess={handlePaymentSuccess}
        config={config}
      />
    </div>
  );
};

export default Demo;
