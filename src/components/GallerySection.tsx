import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_PHOTOS } from '../data/cabins';
import { GalleryPhoto } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'architecture' | 'interiors' | 'outdoor' | 'evening'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = filter === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === filter);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#0a0c10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-2">
              03. Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-white tracking-tight">
              Inside <span className="font-serif-editorial italic font-normal text-neutral-200">Huna Heights</span>
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full overflow-x-auto no-scrollbar">
            {(['all', 'architecture', 'interiors', 'outdoor', 'evening'] as const)
              .filter((cat) => cat === 'all' || GALLERY_PHOTOS.some((p) => p.category === cat))
              .map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors capitalize whitespace-nowrap cursor-pointer ${
                  filter === cat
                    ? 'bg-white text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Photos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between text-white mb-1">
                    <h3 className="font-medium text-sm text-balance">{photo.title}</h3>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 font-light line-clamp-1">{photo.caption}</p>
                </div>
              </div>

              {/* Bottom Caption always visible for clean editorial aesthetic */}
              <div className="p-4 bg-[#0d0f14] border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-medium truncate pr-2">{photo.title}</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 shrink-0 font-sans">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Controls */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-mono">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[75vh] w-auto overflow-hidden rounded-2xl shadow-2xl border border-white/10">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-6 text-center max-w-2xl px-4">
              <h3 className="text-xl font-medium text-white mb-2">{activePhoto.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-2">
                {activePhoto.caption}
              </p>
              <p className="text-[11px] text-neutral-500 font-sans tracking-wide">
                {activePhoto.details}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
