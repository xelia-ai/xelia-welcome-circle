
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// The welcome text that will be typed out
const welcomeScript = `Hola, soy Xelia, tu asistente virtual de inteligencia artificial. Estoy aquí para ayudarte a automatizar la atención y ventas de tu empresa con tecnología avanzada y personalizada.`;

// Timing for text rendering (milliseconds per character)
const TYPING_SPEED = 60;

const WelcomeExperience: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Setup Three.js scene with particles
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    // Position particles in a circle
    const radius = 2;
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true
    });
    
    const points = new THREE.Points(particles, material);
    scene.add(points);
    particlesRef.current = points;

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Initialize audio context and analyzer
  useEffect(() => {
    if (!audioRef.current || !audioPermission) return;
    
    const audioElement = audioRef.current;
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;
    
    // Start audio playback
    audioElement.play();
    
    // Start the animation
    const animate = () => {
      if (!analyserRef.current || !dataArrayRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        sum += dataArrayRef.current[i];
      }
      const average = sum / dataArrayRef.current.length;
      
      // Use volume to affect the particle animation
      const normalizedVolume = average / 255;
      const scale = 1 + normalizedVolume * 0.3;
      
      particlesRef.current.rotation.y += 0.003;
      particlesRef.current.scale.set(scale, scale, scale);
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Set up the typing animation based on audio time
    const handleTimeUpdate = () => {
      if (!audioElement) return;
      
      const progress = audioElement.currentTime / audioElement.duration;
      const textLength = Math.floor(welcomeScript.length * progress);
      
      if (textLength <= welcomeScript.length) {
        setDisplayedText(welcomeScript.substring(0, textLength));
      } else {
        setAnimationComplete(true);
      }
    };
    
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.pause();
      audioContext.close();
    };
  }, [audioPermission]);

  // Start experience on user interaction (to comply with browser autoplay policies)
  const startExperience = () => {
    setAudioPermission(true);
  };

  return (
    <div className="relative w-full h-full">
      {/* Audio element */}
      <audio 
        ref={audioRef}
        src="/lovable-uploads/mensaje-oficial-xelia.mp3" 
        preload="auto"
      />

      {/* Three.js canvas for particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Text container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full max-w-2xl px-6">
        <div className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
          {displayedText}
          <span className={`inline-block w-2 h-5 bg-white ml-1 ${animationComplete ? 'opacity-0' : 'animate-pulse'}`}></span>
        </div>
      </div>

      {/* Start button (only shown before permission is granted) */}
      {!audioPermission && (
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <button
            onClick={startExperience}
            className="cta-button text-white font-medium px-8 py-6 rounded-xl text-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            Comenzar Experiencia
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default WelcomeExperience;
