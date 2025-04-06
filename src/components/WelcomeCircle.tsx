
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useAnimation } from 'framer-motion';

interface WelcomeCircleProps {
  className?: string;
}

const WelcomeCircle: React.FC<WelcomeCircleProps> = ({ className }) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Animate in on mount
  useEffect(() => {
    controls.start({
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1] // Apple-like easing
      }
    });
  }, [controls]);

  // Handle subtle mouse follow effect for desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleRef.current) return;
      
      const rect = circleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (max 40px movement)
      const maxDistance = 15;
      const distX = ((e.clientX - centerX) / window.innerWidth) * maxDistance;
      const distY = ((e.clientY - centerY) / window.innerHeight) * maxDistance;
      
      // Apply subtle movement based on mouse position with smooth transition
      circleRef.current.style.transform = `translate(${distX}px, ${distY}px)`;
    };
    
    const handleMouseLeave = () => {
      if (!circleRef.current) return;
      // Return to center with smooth transition
      circleRef.current.style.transform = 'translate(0, 0)';
    };
    
    // Only add these effects for non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={cn('circle-container', className)}>
      <motion.div 
        className="circle-backdrop"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      />
      
      <motion.div 
        ref={circleRef}
        className="xelia-circle circle-glow"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={controls}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer ring with subtle animation */}
          <motion.div 
            className="absolute w-[170px] h-[170px] rounded-full border border-xelia-accent/30"
            animate={{ 
              boxShadow: isHovered 
                ? '0 0 15px 0 rgba(92, 106, 255, 0.3)'
                : '0 0 10px 0 rgba(92, 106, 255, 0.2)'
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* White background container for avatar with subtle shadow */}
          <motion.div 
            className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-elegant"
            animate={{ 
              scale: isHovered ? 1.02 : 1,
              boxShadow: isHovered 
                ? '0 6px 20px rgba(0, 0, 0, 0.15)'
                : '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeCircle;
