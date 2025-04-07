
import * as THREE from 'three';

export const animateParticles = (
  analyser: AnalyserNode | null,
  dataArray: Uint8Array | null,
  scene: THREE.Scene | null,
  camera: THREE.PerspectiveCamera | null,
  renderer: THREE.WebGLRenderer | null,
  particles: THREE.Points | null,
  particlePositions: Float32Array | null,
  particleVelocities: Float32Array[] | null,
  setAnimationFrameId: (id: number | null) => void
) => {
  const animate = () => {
    if (!analyser || !dataArray || !scene || !camera || 
        !renderer || !particles || !particlePositions || !particleVelocities) {
      const animationFrameId = requestAnimationFrame(animate);
      setAnimationFrameId(animationFrameId);
      return;
    }
    
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate average volume
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    const normalizedVolume = average / 255;
    
    // Get the positions array from the buffer geometry
    const positions = particlePositions;
    const velocities = particleVelocities;
    const particleGeometry = particles.geometry as THREE.BufferGeometry;
    
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
    particleGeometry.getAttribute('position').needsUpdate = true;
    
    // Subtle overall movement
    particles.rotation.y += 0.001;
    
    renderer.render(scene, camera);
    
    const animationFrameId = requestAnimationFrame(animate);
    setAnimationFrameId(animationFrameId);
  };
  
  animate();
};
