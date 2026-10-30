import React from 'react';
import { PRESS_ACCOLADES } from '../data/cabins';
import { Award, Compass, Shield, Sparkles } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-page border-y border-line py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-deep font-light">
            Living at <span className="font-serif-editorial italic text-ink font-normal">Huna Heights</span>
          </p>
        </div>

        {/* Minimalist press quotes & badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRESS_ACCOLADES.map((item) => (
            <div
              key={item.publication}
              className="p-5 rounded-xl bg-surface border border-line hover:border-line transition-colors flex flex-col justify-between"
            >
              <p className="text-xs text-ink-soft font-light leading-relaxed mb-4 italic">
                {item.quote}
              </p>
              <div className="flex items-center justify-between text-muted text-xs font-serif-editorial">
                <span className="tracking-wide text-ink">{item.publication}</span>
                <span className="text-[10px] text-subtle font-sans uppercase tracking-widest">To confirm</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet architectural certs */}
        <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-subtle text-xs font-light">
          <span className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-muted" />
            Two & Three-Bedroom Apartments
          </span>
          <span className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-muted" />
            Furnished Short Stays
          </span>
          <span className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-muted" />
            Nairobi, Kenya
          </span>
        </div>
      </div>
    </section>
  );
};
