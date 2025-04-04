
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import WelcomeCircle from '@/components/WelcomeCircle';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const handleConfigureClick = () => {
    navigate('/configure');
  };

  // Simulate typing effect
  useEffect(() => {
    if (!textRef.current) return;
    
    const text = "Hola, soy Xelia. ¡Empecemos!";
    textRef.current.innerText = "";
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        textRef.current!.innerText += text[currentIndex];
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      title: "Atención 24/7",
      description: "Tu asistente virtual siempre disponible"
    },
    {
      icon: <Shield className="w-5 h-5 text-green-400" />,
      title: "Seguro y confiable",
      description: "Protección de datos y respuestas precisas"
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      title: "Inteligencia avanzada",
      description: "Aprende y mejora con cada interacción"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-xelia-dark via-xelia-dark to-xelia-light relative overflow-hidden">
      {/* Background aesthetic elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-xelia-accent/5 filter blur-[80px] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-xelia-accent/5 filter blur-[60px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-xl w-full flex flex-col items-center px-6 py-12 z-10">
        <div className="w-full mb-8 animate-float-gentle">
          <WelcomeCircle />
        </div>
        
        <div className="text-center space-y-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h1 ref={textRef} className="text-4xl font-bold tracking-tight text-white sm:text-5xl min-h-[60px]">
            Hola, soy Xelia. ¡Empecemos!
          </h1>
          
          <p className="text-lg text-gray-300 max-w-sm mx-auto">
            Tu asistente inteligente personalizado para automatizar la atención y ventas de tu empresa.
          </p>
          
          <div className="mt-8">
            <Button 
              className="cta-button text-white font-medium px-8 py-6 rounded-xl text-lg animate-button-pulse"
              onClick={handleConfigureClick}
            >
              Configura tu agente <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
          {features.map((feature, index) => (
            <div key={index} className="frosted-glass p-4 rounded-xl text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-white font-medium mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
