
import React from 'react';
import { Button } from '@/components/ui/button';
import WelcomeCircle from '@/components/WelcomeCircle';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();
  
  const handleConfigureClick = () => {
    navigate('/configure');
  };

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

  // Animation variants for staggered text animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.8
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-xelia-dark via-xelia-dark to-xelia-light relative overflow-hidden">
      {/* Background aesthetic elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.div 
          className="absolute top-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-xelia-accent/5 filter blur-[80px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-xelia-accent/5 filter blur-[60px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
      </motion.div>
      
      <div className="max-w-xl w-full flex flex-col items-center px-6 py-12 z-10">
        <motion.div 
          className="flex justify-center w-full mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Only WelcomeCircle component */}
          <WelcomeCircle />
        </motion.div>
        
        <div className="text-center space-y-6 w-full">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="min-h-[140px]"
          >
            <motion.h1 
              variants={item}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display leading-tight mb-4"
              style={{
                letterSpacing: '-0.025em',
                fontWeight: '600',
                lineHeight: '1.2',
              }}
            >
              Hola, soy Xelia...
            </motion.h1>
            <motion.h1 
              variants={item}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display leading-tight"
              style={{
                letterSpacing: '-0.025em',
                fontWeight: '600',
                lineHeight: '1.2',
              }}
            >
              ¡La IA que mueve tu mundo!
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-md mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            Tu asistente inteligente personalizado para automatizar la atención y ventas de tu empresa.
          </motion.p>
          
          <motion.div 
            className="mt-10 w-full flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Button 
              className="cta-button text-white font-medium px-8 py-6 rounded-xl text-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
              onClick={handleConfigureClick}
              style={{ backdropFilter: 'blur(12px)' }}
            >
              Comenzar <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        
        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="frosted-glass p-4 rounded-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.6 + (index * 0.1),
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-white font-medium mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
