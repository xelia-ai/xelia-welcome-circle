
import { useEffect, useRef } from 'react';

interface AudioAnalyzerResult {
  analyser: AnalyserNode | null;
  dataArray: Uint8Array | null;
}

export const useAudioAnalyzer = (
  audioElement: HTMLAudioElement | null,
  audioPermission: boolean
): AudioAnalyzerResult => {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!audioElement || !audioPermission) return;
    
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
    
    return () => {
      audioContext.close();
    };
  }, [audioPermission, audioElement]);

  return {
    analyser: analyserRef.current,
    dataArray: dataArrayRef.current
  };
};
