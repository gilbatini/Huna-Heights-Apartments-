import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

// onDark: the nav is over the hero photo (light text) rather than scrolled onto the page.
export const Soundscape: React.FC<{ onDark?: boolean }> = ({ onDark = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Brown noise for gentle water waves
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low pass filter to simulate tranquil water and distant breeze
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, ctx.currentTime);

      // Gentle LFO modulating the wave sound
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec wave cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(140, ctx.currentTime);

      lfo.connect(filter.frequency);
      whiteNoise.connect(filter);
      filter.connect(masterGain);

      whiteNoise.start();
      lfo.start();

      setIsPlaying(true);
    } catch {
      // AudioContext policy fallback
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (audioCtxRef.current) {
      if (gainNodeRef.current && audioCtxRef.current.state === 'running') {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 500);
      } else {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      className={`group relative flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-full border transition-all text-xs font-medium ${
        onDark
          ? 'bg-on-dark/5 hover:bg-on-dark/10 border-on-dark/10 hover:border-on-dark/20 text-on-dark/85 hover:text-on-dark'
          : 'bg-surface hover:bg-royal-tint border-line hover:border-royal/40 text-ink/80 hover:text-royal'
      }`}
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-royal"></span>
          </span>
          <Volume2 className={`w-3.5 h-3.5 ${onDark ? 'text-on-dark' : 'text-royal'}`} />
          <span className="hidden sm:inline">Ambiance On</span>
        </>
      ) : (
        <>
          <VolumeX className={`w-3.5 h-3.5 ${onDark ? 'text-on-dark/70 group-hover:text-on-dark' : 'text-muted group-hover:text-royal'}`} />
          <span className="hidden sm:inline">Play Ambiance</span>
        </>
      )}
    </button>
  );
};
