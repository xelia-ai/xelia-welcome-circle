
import React, { useEffect, useState, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

interface WelcomeCircleProps {
  className?: string;
}

const XeliaSphere = () => {
  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
    >
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#5C6AFF"
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          opacity={0.8}
          transparent
        />
      </Sphere>
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]} scale={1.1}>
        <meshBasicMaterial
          color="#FFFFFF"
          opacity={0.4}
          transparent
        />
      </Sphere>
    </Float>
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
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#5C6AFF" />
          <Suspense fallback={null}>
            <XeliaSphere />
            <Environment preset="city" />
          </Suspense>
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
          className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-[0_8px_30px_rgba(92,106,255,0.3)]"
          animate={{ 
            boxShadow: isLoaded 
              ? '0 8px 30px rgba(92, 106, 255, 0.3), 0 0 15px rgba(92, 106, 255, 0.2)'
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
