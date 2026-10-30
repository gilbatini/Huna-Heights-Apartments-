import React, { useState } from 'react';
import { CABINS } from '../data/cabins';
import { Cabin } from '../types';
import { formatKes, formatUsd } from '../data/estate';
import { Sparkles, ArrowUpRight, Bed, Bath, Maximize2, ShieldCheck, Waves } from 'lucide-react';

interface ArchitecturalShowcaseProps {
  onSelectCabin: (cabin: Cabin) => void;
  onOpenBooking: () => void;
}

export const ArchitecturalShowcase: React.FC<ArchitecturalShowcaseProps> = ({
  onSelectCabin,
  onOpenBooking,
}) => {
  const [selectedId, setSelectedId] = useState(CABINS[0].id);
  const activeCabin = CABINS.find((c) => c.id === selectedId) || CABINS[0];

  const handleBookCabin = (cabin: Cabin) => {
    onSelectCabin(cabin);
    onOpenBooking();
  };

  return (
    <section id="discover" className="py-16 sm:py-24 bg-page text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-line">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-deep font-light block mb-2">
              01. The Residences
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-ink tracking-tight">
              A Home for <span className="font-serif-editorial italic font-normal text-gold-deep">Every Stay</span>
            </h2>
          </div>
          <p className="text-muted text-sm max-w-md font-light leading-relaxed">
            Lease a two or three-bedroom apartment for the long term, or stay in the fully furnished residence for a few nights or a few months.
          </p>
        </div>

        {/* Cabin Switcher - Minimalist clean tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CABINS.map((cabin) => (
            <button
              key={cabin.id}
              onClick={() => setSelectedId(cabin.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedId === cabin.id
                  ? 'bg-navy text-white shadow-soft'
                  : 'bg-sand/70 text-muted hover:text-ink hover:bg-sand border border-line'
              }`}
            >
              {cabin.name}
            </button>
          ))}
        </div>

        {/* Active Cabin Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-surface border border-line rounded-3xl p-6 sm:p-8 lg:p-10">
          {/* Left Column: Visual focal point */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-sand group">
              <img
                src={activeCabin.heroImage}
                alt={activeCabin.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 text-xs font-light text-ink">
                {activeCabin.location}
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/60 shadow-soft text-right">
                <span className="text-[10px] uppercase tracking-wider text-muted block">Indicative, To Confirm</span>
                {activeCabin.pricing.kind === 'monthly' ? (
                  <>
                    <span className="text-lg font-semibold text-ink font-mono tabular-nums">{formatKes(activeCabin.pricing.kes)}</span>
                    <span className="text-xs text-muted"> / month</span>
                    <span className="block text-[11px] text-muted tabular-nums">≈ {formatUsd(activeCabin.pricing.usd)}</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-semibold text-ink font-mono tabular-nums">${activeCabin.pricing.usd}</span>
                    <span className="text-xs text-muted"> / night</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Specs strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-line mt-6 text-xs text-muted">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-ink-soft" />
                <span>{activeCabin.sqft ? `${activeCabin.sqft.toLocaleString()} sq ft` : 'Size on request'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-ink-soft" />
                <span>{activeCabin.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-ink-soft" />
                <span>{activeCabin.bathrooms} Bathrooms</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Architectural Details */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-4 lg:pt-0 lg:pl-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted mb-2">
                <span>{activeCabin.subtitle}</span>
                <span>·</span>
                <span className="text-subtle">Huna Heights, Nairobi</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-medium text-ink mb-4">
                {activeCabin.name}
              </h3>

              <p className="text-ink-soft text-sm font-light leading-relaxed mb-8">
                {activeCabin.description}
              </p>

              {/* Architectural Highlights */}
              <div className="space-y-4 mb-8">
                <p className="text-xs uppercase tracking-widest text-muted font-medium">
                  Highlights
                </p>
                {activeCabin.architecturalHighlights.map((hl) => (
                  <div key={hl.title} className="p-3.5 rounded-xl bg-page border border-line">
                    <h4 className="text-xs font-semibold text-ink mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                      {hl.title}
                    </h4>
                    <p className="text-xs text-muted font-light leading-relaxed">
                      {hl.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-6 border-t border-line flex items-center gap-4">
              <button
                onClick={() => handleBookCabin(activeCabin)}
                className="flex-1 py-3.5 px-6 bg-navy hover:bg-navy-deep text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-soft cursor-pointer"
              >
                <span>Enquire About the {activeCabin.name.replace('The ', '')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
