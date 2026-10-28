import React from 'react';
import { X, MapPin, Maximize2, ShieldCheck, Compass } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onBookNow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl bg-[#0d0f12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08090b]/80">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Cinematic Tour</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-neutral-200 font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              Huna Heights · Tigoni, Nairobi
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cinematic Preview & Visualizer */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          <img
            src="/images/huna-heights-hero.jpg"
            alt="HUNA HEIGHTS luxury cabin floating on twilight lake"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

          {/* Floating metadata overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Architectural Film</p>
              <h3 className="text-2xl sm:text-3xl font-display-italiana text-white tracking-wide">
                Where Structure Dissolves into Water
              </h3>
              <p className="text-sm text-neutral-300 max-w-lg mt-1 font-light leading-relaxed">
                Experience the 270-degree acoustic horizon, hand-charred cedar cladding, and floating foundation engineered for absolute stillness in the Nairobi highlands.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  onBookNow();
                }}
                className="px-5 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors"
              >
                Reserve Stay
              </button>
            </div>
          </div>
        </div>

        {/* Feature quick specs bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0a0c0f] border-t border-white/5 text-xs text-neutral-400">
          <div>
            <span className="block text-neutral-500 uppercase tracking-wider text-[10px]">Architecture</span>
            <span className="text-neutral-200 font-medium">Cantilevered Timber Monolith</span>
          </div>
          <div>
            <span className="block text-neutral-500 uppercase tracking-wider text-[10px]">Elevation</span>
            <span className="text-neutral-200 font-medium">2,200m (Tigoni Highlands)</span>
          </div>
          <div>
            <span className="block text-neutral-500 uppercase tracking-wider text-[10px]">Acoustic Rating</span>
            <span className="text-neutral-200 font-medium">STC 58 Isolated Glass</span>
          </div>
          <div>
            <span className="block text-neutral-500 uppercase tracking-wider text-[10px]">Power & Water</span>
            <span className="text-neutral-200 font-medium">100% Off-Grid Solar & Spring</span>
          </div>
        </div>
      </div>
    </div>
  );
};
