
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface WelcomeCircleProps {
  className?: string;
}

// Simplificado para evitar errores con three.js
const XeliaSphere = () => {
  return (
    <group>
      {/* Esfera principal blanca luminosa */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          roughness={0.1}
          metalness={0.2}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
          opacity={0.9}
          transparent
        />
      </mesh>
      
      {/* Resplandor exterior sutil */}
      <mesh>
        <sphereGeometry args={[1.05, 24, 24]} />
        <meshBasicMaterial
          color="#FFFFFF"
          opacity={0.2}
          transparent
        />
      </mesh>
    </group>
  );
};

const WelcomeCircle: React.FC<WelcomeCircleProps> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded after a small delay to allow for animation
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn('circle-container relative h-[280px] w-[280px]', className)}>
      {/* 3D sphere container */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 0.2,
          duration: 1.2, 
          ease: [0.23, 1, 0.32, 1]
        }}
      >
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FFFFFF" />
          <XeliaSphere />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </motion.div>

      {/* Avatar container on top of 3D */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 0.6, 
          duration: 1, 
          ease: [0.23, 1, 0.32, 1] 
        }}
      >
        <motion.div 
          className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-[0_8px_30px_rgba(255,255,255,0.3)]"
          animate={{ 
            boxShadow: isLoaded 
              ? '0 8px 30px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.2)'
              : '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img 
            src="/lovable-uploads/9f5bc4b9-a87a-4af7-88b1-e1249e0a7301.png" 
            alt="Xelia Avatar" 
            className="w-[100px] h-[100px] object-contain"
            style={{ 
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeCircle;
