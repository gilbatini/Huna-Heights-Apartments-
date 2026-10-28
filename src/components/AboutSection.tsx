import React from 'react';
import { Compass, Feather, Leaf, SunMedium } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#08090b] text-neutral-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-2">
            04. The Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-medium text-white tracking-tight leading-tight">
            Designed for Silence. <br />
            <span className="font-serif-editorial italic font-normal text-neutral-300">
              Anchored in Stillness.
            </span>
          </h2>
        </div>

        {/* Narrative & Architectural Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
            <p className="text-base text-neutral-100 font-normal">
              Huna Heights was conceived by Kenyan architects and environmentalists with a solitary conviction: modern architectural luxury should not dominate East Africa’s wild topography—it should listen to it.
            </p>
            <p>
              Tucked within the misty, emerald tea ridges of Tigoni just 35 minutes outside Nairobi, each cabin is built from sustainably harvested East African cedar timber treated with Shou Sugi Ban, an ancient charring ritual that immunizes wood naturally against equatorial highland moisture without toxic chemical sealants.
            </p>
            <p>
              Our floating foundation system eliminates conventional heavy trenching on fragile watershed slopes. Resting on submerged micro-pylons, each structure sways imperceptibly with the tranquil surface of the water, leaving indigenous aquatic habitats and surrounding bamboo forests completely undisturbed.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Leaf className="w-5 h-5 text-neutral-300 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Zero Ground Footprint</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Submerged micro-pylons touch the lakebed with minimal disruption, preserving aquatic life and shoreline fauna.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <SunMedium className="w-5 h-5 text-neutral-300 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Microgrid Autonomy</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Bi-facial rooftop solar arrays and integrated battery banks provide uninterrupted, silent clean energy year-round.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Feather className="w-5 h-5 text-neutral-300 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Acoustic Purity</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Triple-glazed insulated acoustic envelopes ensure interior decibel readings stay below 22dB—pure serene quietude.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Compass className="w-5 h-5 text-neutral-300 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Private Wilderness Reach</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Accessible solely by private wooden solar shuttle, safeguarding total seclusion and uninterrupted retreat.
              </p>
            </div>
          </div>
        </div>

        {/* Quantified Impact / Trust strip */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <span className="text-3xl sm:text-4xl font-light font-serif-editorial text-white block">100%</span>
            <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">Renewable Power</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-light font-serif-editorial text-white block">270°</span>
            <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">Glazed Horizon</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-light font-serif-editorial text-white block">0.0t</span>
            <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">Net Carbon Stays</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-light font-serif-editorial text-white block">4.98</span>
            <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">Guest Review Score</span>
          </div>
        </div>

      </div>
    </section>
  );
};
