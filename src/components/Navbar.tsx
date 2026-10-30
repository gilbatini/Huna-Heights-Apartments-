import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, PhoneCall, Calendar, Globe, Sparkles } from 'lucide-react';
import { Soundscape } from './Soundscape';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenBooking, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Residences', target: 'discover' },
    { label: 'Availability', target: 'availability' },
    { label: 'Amenities', target: 'amenities' },
    { label: 'About Us', target: 'about' },
    { label: 'Gallery', target: 'gallery' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090b]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left Navigation Zone - matching reference */}
          <button
            onClick={() => handleLinkClick(navLinks[0].target)}
            className="md:hidden font-serif-editorial text-lg tracking-wider text-white whitespace-nowrap cursor-pointer"
          >
            HUNA HEIGHTS
          </button>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className="text-sm font-light text-neutral-300 hover:text-white transition-colors tracking-wide whitespace-nowrap cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-white/40 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Zone - Menu Icon, Soundscape, Language, Contact Us */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Ambient soundscape player */}
            <Soundscape />

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-1 text-xs uppercase tracking-wider text-neutral-300 hover:text-white py-1.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-expanded={languageOpen}
              >
                <span>{currentLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {languageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#12151a] border border-white/10 rounded-xl shadow-2xl py-1 text-xs text-neutral-300 z-50">
                  {['EN', 'DE', 'FR', 'ID', 'JA'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLanguageOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors flex items-center justify-between ${
                        currentLang === lang ? 'text-white font-medium bg-white/5' : ''
                      }`}
                    >
                      <span>{lang === 'EN' ? 'English' : lang === 'DE' ? 'Deutsch' : lang === 'FR' ? 'Français' : lang === 'ID' ? 'Bahasa' : '日本語'}</span>
                      <span className="text-[10px] text-neutral-500">{lang}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Us button */}
            <button
              onClick={onOpenContact}
              className="text-xs tracking-wider uppercase font-medium text-neutral-300 hover:text-white transition-colors hidden sm:block whitespace-nowrap px-3 py-1.5 cursor-pointer"
            >
              Contact Us
            </button>

            {/* Direct Booking CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black rounded-full hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book or Enquire</span>
            </button>

            {/* Hamburger button matching reference styling (dark square container with 2 horizontal lines) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer flex flex-col justify-center items-center gap-1 w-9 h-9"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <>
                  <span className="w-4 h-0.5 bg-neutral-200 rounded-full block"></span>
                  <span className="w-4 h-0.5 bg-neutral-200 rounded-full block"></span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Full Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#08090b]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-serif-editorial text-2xl tracking-wider text-white">HUNA HEIGHTS</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 my-auto">
            {navLinks.map((link, idx) => (
              <div key={link.label}>
                <button
                  onClick={() => handleLinkClick(link.target)}
                  className="font-display-italiana text-4xl sm:text-5xl text-neutral-300 hover:text-white transition-colors block text-left"
                >
                  <span className="text-xs text-neutral-600 mr-4 font-sans font-light">0{idx + 1}</span>
                  {link.label}
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors"
              >
                Book or Enquire
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="px-5 py-3 border border-white/20 text-white text-xs uppercase tracking-wider rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
            <p className="text-xs text-neutral-500 font-light">
              Huna Heights Apartments · Nairobi, Kenya
            </p>
          </div>
        </div>
      )}
    </>
  );
};
