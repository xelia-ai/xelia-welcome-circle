import { useEffect, useRef, useState } from 'react';

interface AudioAnalyzerResult {
  analyser: AnalyserNode | null;
  dataArray: Uint8Array | null;
}

// Keep track of audio contexts and connections across hook instances
const audioContextMap = new Map<HTMLAudioElement, AudioContext>();

export const useAudioAnalyzer = (
  audioElement: HTMLAudioElement | null,
  audioPermission: boolean
): AudioAnalyzerResult => {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!audioElement || !audioPermission || initialized) return;
    
    try {
      // Check if we already have an AudioContext for this element
      let audioContext: AudioContext;
      
      if (audioContextMap.has(audioElement)) {
        // Reuse existing AudioContext
        audioContext = audioContextMap.get(audioElement)!;
      } else {
        // Create a new AudioContext
        audioContext = new AudioContext();
        audioContextMap.set(audioElement, audioContext);
        
        // Create source only once per audio element
        const source = audioContext.createMediaElementSource(audioElement);
        
        // Create and connect analyzer
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // Store the analyzer and data array
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;
      }
      
      setInitialized(true);
      
      // Cleanup function
      return () => {
        // We don't close the audioContext here, as it might be used by other components
        // The browser will clean up when the page is unloaded
      };
    } catch (error) {
      console.error("Error initializing audio analyzer:", error);
    }
  }, [audioPermission, audioElement, initialized]);

  return {
    analyser: analyserRef.current,
    dataArray: dataArrayRef.current
  };
};
