import React from 'react';
import { Compass, Feather, Leaf, SunMedium } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#08090b] text-neutral-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-2">
            07. About Huna Heights
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-medium text-white tracking-tight leading-tight">
            Modern Living. <br />
            <span className="font-serif-editorial italic font-normal text-neutral-300">
              Made for Nairobi.
            </span>
          </h2>
        </div>

        {/* Narrative & Architectural Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
            <p className="text-base text-neutral-100 font-normal">
              Huna Heights is a contemporary residential building in Nairobi, with bright, generously glazed apartments, private balconies and a secure, well-kept setting.
            </p>
            <p>
              Choose a two or three-bedroom apartment on a long-term lease, or stay in our fully furnished two-bedroom residence for a few nights or a few months.
            </p>
            <p>
              Residents can also furnish their apartment in one step through our Interior Furnishing Collection: curated furniture and interior packages coordinated by our Property Manager.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Leaf className="w-5 h-5 text-neutral-300 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Long-Term Leasing</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Unfurnished two and three-bedroom apartments, with monthly rent and lease terms on request.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <SunMedium className="w-5 h-5 text-neutral-300 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Furnished Stays</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                A fully furnished two-bedroom residence for short and medium stays.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Feather className="w-5 h-5 text-neutral-300 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Interior Furnishing</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Essentials, complete and bespoke furniture packages, arranged by our Property Manager.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Compass className="w-5 h-5 text-neutral-300 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Easy to Reach Us</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Enquire online or chat with our team on WhatsApp to arrange a viewing.
              </p>
            </div>
          </div>
        </div>

        {/* Quantified Impact / Trust strip */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <span className="text-3xl sm:text-4xl font-light font-serif-editorial text-white block">2 & 3</span>
            <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">Bedroom Apartments</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-light font-serif-editorial text-white block">1</span>
            <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">Furnished Residence</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-light font-serif-editorial text-white block">3</span>
            <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">Furnishing Packages</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-light font-serif-editorial text-white block">24/7</span>
            <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">Security (To Confirm)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
