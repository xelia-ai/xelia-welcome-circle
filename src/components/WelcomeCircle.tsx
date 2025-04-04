
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WelcomeCircleProps {
  className?: string;
}

const WelcomeCircle: React.FC<WelcomeCircleProps> = ({ className }) => {
  const circleRef = useRef<HTMLDivElement>(null);

  // Handle subtle mouse follow effect for desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleRef.current) return;
      
      const rect = circleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const distX = (e.clientX - centerX) / 20;
      const distY = (e.clientY - centerY) / 20;
      
      // Apply subtle movement based on mouse position
      circleRef.current.style.transform = `translate(${distX}px, ${distY}px)`;
    };
    
    const handleMouseLeave = () => {
      if (!circleRef.current) return;
      // Reset position when mouse leaves
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
      <div className="circle-backdrop animate-pulse"></div>
      <div 
        ref={circleRef}
        className="xelia-circle animate-circle-breathe circle-glow transition-transform duration-200 ease-out"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Pulsating ring */}
          <div className="absolute w-[170px] h-[170px] rounded-full border border-xelia-accent/20 animate-pulse"></div>
          
          {/* Xelia avatar */}
          <div className="w-[120px] h-[120px] rounded-full bg-white/90 flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/9f5bc4b9-a87a-4af7-88b1-e1249e0a7301.png" 
              alt="Xelia Avatar" 
              className="w-[100px] h-[100px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCircle;
