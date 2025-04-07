
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
  const particlePositionsRef = useRef<Float32Array | null>(null);
  const particleVelocitiesRef = useRef<Float32Array[] | null>(null);

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
    const particleCount = 300;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    // Create velocity array for organic movement
    const velocities: Float32Array[] = [];
    
    // Position particles in a sphere-like organic form
    for (let i = 0; i < particleCount; i++) {
      // Create a more organic, varying distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 1.2; // Varying radius
      const height = (Math.random() - 0.5) * 2;
      
      positions[i * 3] = Math.cos(angle) * radius; // x
      positions[i * 3 + 1] = height; // y
      positions[i * 3 + 2] = Math.sin(angle) * radius; // z
      
      // Create individual velocity vectors for organic movement
      velocities.push(new Float32Array([
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      ]));
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create a circular texture for round particles
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    
    if (context) {
      // Draw a circle
      context.beginPath();
      context.arc(16, 16, 15, 0, Math.PI * 2);
      context.fillStyle = 'white';
      context.fill();
    }
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const points = new THREE.Points(particles, material);
    scene.add(points);
    particlesRef.current = points;
    particlePositionsRef.current = positions;
    particleVelocitiesRef.current = velocities;

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
      if (!analyserRef.current || !dataArrayRef.current || !sceneRef.current || !cameraRef.current || 
          !rendererRef.current || !particlesRef.current || !particlePositionsRef.current || !particleVelocitiesRef.current) {
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
      const normalizedVolume = average / 255;
      
      // Get the positions array from the buffer geometry
      const positions = particlePositionsRef.current;
      const velocities = particleVelocitiesRef.current;
      const particles = particlesRef.current.geometry as THREE.BufferGeometry;
      
      // Animate particles in an organic, living fashion
      for (let i = 0; i < positions.length / 3; i++) {
        // Update positions based on velocities
        positions[i * 3] += velocities[i][0];
        positions[i * 3 + 1] += velocities[i][1];
        positions[i * 3 + 2] += velocities[i][2];
        
        // Apply audio reactivity - pulsing effect
        const pulseScale = 1 + normalizedVolume * 0.3;
        
        // Apply volume-based movement intensity
        velocities[i][0] += (Math.random() - 0.5) * 0.0015 * normalizedVolume;
        velocities[i][1] += (Math.random() - 0.5) * 0.0015 * normalizedVolume;
        velocities[i][2] += (Math.random() - 0.5) * 0.0015 * normalizedVolume;
        
        // Add some randomness for natural movement
        if (Math.random() > 0.95) {
          velocities[i][0] = (Math.random() - 0.5) * 0.005;
          velocities[i][1] = (Math.random() - 0.5) * 0.005;
          velocities[i][2] = (Math.random() - 0.5) * 0.005;
        }
        
        // Limit the distance from center (boundary)
        const distance = Math.sqrt(
          positions[i * 3] ** 2 + 
          positions[i * 3 + 1] ** 2 + 
          positions[i * 3 + 2] ** 2
        );
        
        if (distance > 2.5) {
          // Nudge particles back toward center
          velocities[i][0] -= positions[i * 3] * 0.002;
          velocities[i][1] -= positions[i * 3 + 1] * 0.002;
          velocities[i][2] -= positions[i * 3 + 2] * 0.002;
        }
        
        // Dampen velocities to prevent excessive movement
        velocities[i][0] *= 0.99;
        velocities[i][1] *= 0.99;
        velocities[i][2] *= 0.99;
      }
      
      // Update the buffer
      particles.getAttribute('position').needsUpdate = true;
      
      // Subtle overall movement
      particlesRef.current.rotation.y += 0.001;
      
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center"
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

