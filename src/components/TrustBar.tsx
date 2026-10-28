import React from 'react';
import { PRESS_ACCOLADES } from '../data/cabins';
import { Award, Compass, Shield, Sparkles } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-[#08090b] border-y border-white/5 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">
            Our <span className="font-serif-editorial italic text-neutral-200 font-normal">Trusted</span> Partners & Design Recognition
          </p>
        </div>

        {/* Minimalist press quotes & badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRESS_ACCOLADES.map((item) => (
            <div
              key={item.publication}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between"
            >
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4 italic">
                "{item.quote}"
              </p>
              <div className="flex items-center justify-between text-neutral-400 text-xs font-serif-editorial">
                <span className="tracking-wide text-neutral-200">{item.publication}</span>
                <span className="text-[10px] text-neutral-500 font-sans uppercase tracking-widest">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet architectural certs */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-neutral-500 text-xs font-light">
          <span className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-neutral-400" />
            100% Off-Grid Certified
          </span>
          <span className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-neutral-400" />
            Zero-Disturbance Floating Pylons
          </span>
          <span className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-neutral-400" />
            World Architecture Festival Nominee
          </span>
        </div>
      </div>
    </section>
  );
};
