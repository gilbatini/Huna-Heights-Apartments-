import React from 'react';
import { AMENITIES, AMENITY_IMAGES, SERVICES } from '../data/estate';

const ToConfirm = () => (
  <span className="shrink-0 px-2 py-0.5 rounded-full border border-white/15 text-[10px] uppercase tracking-wider text-neutral-400">
    To confirm
  </span>
);

export const AmenitiesSection: React.FC = () => (
  <section id="amenities" className="py-16 sm:py-24 bg-[#08090b] text-neutral-100 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-2">
            04. Amenities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-white tracking-tight">
            Life at <span className="font-serif-editorial italic font-normal text-neutral-200">Huna Heights</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {AMENITIES.map((a, i) => (
          <article key={a.name} className="bg-[#0d0f14] border border-white/10 rounded-3xl overflow-hidden flex flex-col">
            <div className="aspect-[16/10] bg-black overflow-hidden">
              <img
                src={AMENITY_IMAGES[i % AMENITY_IMAGES.length]}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-lg font-medium text-white">{a.name}</h3>
                <ToConfirm />
              </div>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">{a.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-2">
            05. Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-white tracking-tight">
            Ready and <span className="font-serif-editorial italic font-normal text-neutral-200">Waiting</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
        {SERVICES.map((s) => (
          <div key={s.name} className="bg-[#0d0f14] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h3 className="text-base font-medium text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                {s.name}
              </h3>
              <ToConfirm />
            </div>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
