
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJsSetupResult {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  animationFrameId: number | null;
  setAnimationFrameId: (id: number | null) => void;
  particles: THREE.Points | null;
  particlePositions: Float32Array | null;
  particleVelocities: Float32Array[] | null;
}

export const useThreeJsSetup = (canvasRef: React.RefObject<HTMLCanvasElement>): ThreeJsSetupResult => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlePositionsRef = useRef<Float32Array | null>(null);
  const particleVelocitiesRef = useRef<Float32Array[] | null>(null);

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
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
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
      // Avoid placing particles at the exact center (0,0,0)
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
      // Draw a gradient circle for better-looking particles
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); // Slightly more transparent at center
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(16, 16, 16, 0, Math.PI * 2);
      context.fill();
    }
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.10, // Reduced size to make particles less prominent
      transparent: true,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
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
  }, [canvasRef]);

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    animationFrameId: animationFrameRef.current,
    setAnimationFrameId: (id) => {
      animationFrameRef.current = id;
    },
    particles: particlesRef.current,
    particlePositions: particlePositionsRef.current,
    particleVelocities: particleVelocitiesRef.current
  };
};
