import React from 'react';
import { AMENITIES, AMENITY_IMAGES, SERVICES } from '../data/estate';

const ToConfirm = () => (
  <span className="shrink-0 px-2 py-0.5 rounded-full border border-line-strong text-[10px] uppercase tracking-wider text-muted">
    To confirm
  </span>
);

export const AmenitiesSection: React.FC = () => (
  <section id="amenities" className="py-16 sm:py-24 bg-page text-ink border-t border-line">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-line">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-deep font-light block mb-2">
            04. Amenities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-ink tracking-tight">
            Life at <span className="font-serif-editorial italic font-normal text-gold-deep">Huna Heights</span>
          </h2>
        </div>
      </div>

      <div className="swipe-row flex overflow-x-auto snap-x snap-mandatory scroll-px-4 -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible gap-4 sm:grid sm:grid-cols-2 sm:gap-6 mb-16">
        {AMENITIES.map((a, i) => (
          <article
            key={a.name}
            className="shrink-0 w-[82%] snap-start sm:w-auto bg-surface border border-line rounded-3xl overflow-hidden flex flex-col"
          >
            <div className="aspect-[16/10] bg-sand overflow-hidden">
              <img
                src={AMENITY_IMAGES[i % AMENITY_IMAGES.length]}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-lg font-medium text-ink">{a.name}</h3>
                <ToConfirm />
              </div>
              <p className="text-sm text-muted font-light leading-relaxed">{a.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-line">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-deep font-light block mb-2">
            05. Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-ink tracking-tight">
            Ready and <span className="font-serif-editorial italic font-normal text-gold-deep">Waiting</span>
          </h2>
        </div>
      </div>

      <div className="swipe-row flex overflow-x-auto snap-x snap-mandatory scroll-px-4 -mx-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-px sm:bg-sand sm:border sm:border-line sm:rounded-3xl sm:overflow-hidden">
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className="shrink-0 w-[72%] snap-start rounded-2xl border border-line sm:w-auto sm:rounded-none sm:border-0 bg-surface p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <h3 className="text-base font-medium text-ink flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {s.name}
              </h3>
              <ToConfirm />
            </div>
            <p className="text-sm text-muted font-light leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
