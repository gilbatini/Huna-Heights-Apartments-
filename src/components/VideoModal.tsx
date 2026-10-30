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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-deep/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl bg-navy-deep border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-navy/80">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-beige/70 font-medium">Video Tour</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-white font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-beige/70" />
              Huna Heights · Nairobi
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-beige/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cinematic Preview & Visualizer */}
        <div className="relative aspect-video w-full bg-navy overflow-hidden group">
          <img
            src="/images/huna-heights-hero.jpg"
            alt="Huna Heights Apartments"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-navy-deep/40 pointer-events-none" />

          {/* Floating metadata overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-beige/70 mb-1">Video Coming Soon</p>
              <h3 className="text-2xl sm:text-3xl font-display-italiana text-white tracking-wide">
                A Look Inside Huna Heights
              </h3>
              <p className="text-sm text-beige/85 max-w-lg mt-1 font-light leading-relaxed">
                A video walk-through of the building, the apartments and the Furnished Residence will be added here.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  onBookNow();
                }}
                className="px-5 py-2.5 bg-gold text-navy text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#D4B873] transition-colors"
              >
                Book or Enquire
              </button>
            </div>
          </div>
        </div>

        {/* Feature quick specs bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-navy border-t border-white/10 text-xs text-beige/70">
          <div>
            <span className="block text-beige/60 uppercase tracking-wider text-[10px]">Apartments</span>
            <span className="text-white font-medium">2 & 3 Bedrooms</span>
          </div>
          <div>
            <span className="block text-beige/60 uppercase tracking-wider text-[10px]">Location</span>
            <span className="text-white font-medium">Nairobi, Kenya</span>
          </div>
          <div>
            <span className="block text-beige/60 uppercase tracking-wider text-[10px]">Furnished Stays</span>
            <span className="text-white font-medium">Two-Bedroom Residence</span>
          </div>
          <div>
            <span className="block text-beige/60 uppercase tracking-wider text-[10px]">Interiors</span>
            <span className="text-white font-medium">Furnishing Packages</span>
          </div>
        </div>
      </div>
    </div>
  );
};
