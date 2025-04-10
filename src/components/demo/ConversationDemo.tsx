
import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  text: string;
  isUser: boolean;
}

interface ConversationDemoProps {
  initialMessage: string;
}

const ConversationDemo: React.FC<ConversationDemoProps> = ({ initialMessage }) => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {text: initialMessage, isUser: false}
  ]);

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

  return (
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
  );
};

export default ConversationDemo;
