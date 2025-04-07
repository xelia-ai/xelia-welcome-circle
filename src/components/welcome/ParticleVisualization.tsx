
import React, { useEffect, useRef } from 'react';
import { useThreeJsSetup } from '../../hooks/useThreeJsSetup';
import { useAudioAnalyzer } from '../../hooks/useAudioAnalyzer';
import { animateParticles } from '../../utils/particleAnimation';

interface ParticleVisualizationProps {
  audioPermission: boolean;
  audioElement: HTMLAudioElement | null;
}

const ParticleVisualization: React.FC<ParticleVisualizationProps> = ({ 
  audioPermission, 
  audioElement 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Initialize Three.js setup
  const {
    scene,
    camera,
    renderer,
    animationFrameId,
    setAnimationFrameId,
    particles,
    particlePositions,
    particleVelocities
  } = useThreeJsSetup(canvasRef);
  
  // Initialize audio analyzer
  const { analyser, dataArray } = useAudioAnalyzer(audioElement, audioPermission);
  
  // Set up animation loop when audio is ready
  useEffect(() => {
    if (!audioPermission || !audioElement) return;
    
    animateParticles(
      analyser,
      dataArray,
      scene,
      camera,
      renderer,
      particles,
      particlePositions,
      particleVelocities,
      setAnimationFrameId
    );
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [
    audioPermission, 
    audioElement, 
    analyser, 
    dataArray, 
    scene, 
    camera, 
    renderer, 
    particles, 
    particlePositions, 
    particleVelocities, 
    animationFrameId, 
    setAnimationFrameId
  ]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default ParticleVisualization;
