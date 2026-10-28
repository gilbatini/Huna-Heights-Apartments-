import React from 'react';
import { ArrowUp, MapPin, Mail, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 text-neutral-400 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif-editorial text-2xl text-white tracking-wider">HUNA HEIGHTS</span>
              <span className="font-serif-editorial italic text-sm text-neutral-400">apartments</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
              Modern apartments in Nairobi for long-term leasing and furnished stays.
            </p>
            <div className="text-xs text-neutral-500 space-y-1">
              <p>Nairobi, Kenya (full address to confirm)</p>
              <p>Enquiries: email to confirm</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-neutral-200 font-medium">Explore</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Residences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Huna Heights
                </button>
              </li>
            </ul>
          </div>

          {/* Reservation and Concierge */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-neutral-200 font-medium">Reservations</h5>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Now leasing two and three-bedroom apartments, with furnished stays available on request.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Book or Enquire
              </button>
              <button
                onClick={onOpenContact}
                className="px-4 py-2.5 border border-white/20 text-neutral-300 font-medium text-xs uppercase tracking-wider rounded-full hover:text-white hover:border-white transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Huna Heights Apartments. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms</span>
            <span className="hover:text-neutral-400 cursor-pointer">House Rules</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
