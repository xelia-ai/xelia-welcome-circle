
import React, { useState } from 'react';
import { Bot, Send, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentPreviewProps {
  agentType: string;
  industry: string;
  capabilities: string[];
}

const AgentPreview: React.FC<AgentPreviewProps> = ({ 
  agentType, 
  industry,
  capabilities 
}) => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<Array<{text: string, isBot: boolean}>>([
    { text: getWelcomeMessage(agentType, industry), isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  function getWelcomeMessage(type: string, ind: string) {
    if (!type || !ind) return "¡Hola! Soy Xelia, tu asistente virtual. ¿En qué puedo ayudarte hoy?";
    
    const industryMap: Record<string, string> = {
      'real-estate': 'bienes raíces',
      'insurance': 'seguros',
      'healthcare': 'salud',
      'finance': 'servicios financieros',
      'education': 'educación',
      'retail': 'retail',
      'automotive': 'automotriz',
      'hospitality': 'hospitalidad',
      'corporate': 'servicios corporativos',
      'custom': ''
    };
    
    const typeMap: Record<string, string> = {
      'sales': 'ventas',
      'customer-service': 'atención al cliente',
      'hybrid': ''
    };
    
    const industryText = industryMap[ind] ? `de ${industryMap[ind]}` : '';
    const typeText = typeMap[type] ? `especializado en ${typeMap[type]}` : 'híbrido';
    
    return `¡Hola! Soy Xelia, tu asistente virtual ${typeText} ${industryText}. ¿En qué puedo ayudarte hoy?`;
  }

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setConversation([...conversation, { text: input, isBot: false }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      const responses = [
        "¡Claro! Puedo ayudarte con eso. ¿Qué más necesitas saber?",
        "Entiendo lo que necesitas. Basado en mi análisis, te recomendaría...",
        "Gracias por tu consulta. Déjame verificar esa información para ti.",
        "Esa es una excelente pregunta. La respuesta es...",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setConversation(prev => [...prev, { text: randomResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="frosted-glass rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center">
        <div className="w-8 h-8 rounded-full bg-xelia-accent flex items-center justify-center mr-3">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-medium">Xelia</h3>
          <p className="text-xs text-gray-400">Vista previa de tu agente</p>
        </div>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto max-h-[300px] space-y-4">
        {conversation.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.isBot 
                  ? 'bg-xelia-light text-white rounded-tl-none' 
                  : 'bg-xelia-accent text-white rounded-br-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-xelia-light px-4 py-3 rounded-2xl rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe un mensaje..."
            className="flex-grow bg-xelia-light rounded-l-lg px-4 py-2 text-white placeholder:text-gray-400 border-none focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-xelia-accent hover:bg-xelia-accent-dark text-white p-2 rounded-r-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-xelia-accent/10">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">¿Te gusta lo que ves?</span>
          <Button variant="outline" className="text-xelia-accent border-xelia-accent bg-transparent hover:bg-xelia-accent hover:text-white">
            Personalizar más <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentPreview;
