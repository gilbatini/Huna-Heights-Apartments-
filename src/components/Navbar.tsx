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

  const onDark = !isScrolled;
  const tone = onDark
    ? { text: 'text-on-dark/85 hover:text-on-dark', strong: 'text-on-dark', icon: 'text-on-dark/70', underline: 'after:bg-on-dark/50', chip: 'hover:bg-on-dark/10', menu: 'bg-on-dark/10 hover:bg-on-dark/20 border-on-dark/20 text-on-dark' }
    : { text: 'text-ink/80 hover:text-royal', strong: 'text-ink', icon: 'text-muted', underline: 'after:bg-royal', chip: 'hover:bg-royal-tint', menu: 'bg-surface hover:bg-royal-tint border-line text-ink hover:text-royal' };

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-line py-3.5 shadow-soft'
            : 'bg-gradient-to-b from-ink/80 via-ink/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left Navigation Zone - matching reference */}
          <button
            onClick={() => handleLinkClick(navLinks[0].target)}
            className={`md:hidden font-serif-editorial text-lg tracking-wider ${tone.strong} whitespace-nowrap cursor-pointer`}
          >
            HUNA HEIGHTS
          </button>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className={`text-sm font-light ${tone.text} transition-colors tracking-wide whitespace-nowrap cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px ${tone.underline} after:scale-x-0 hover:after:scale-x-100 after:transition-transform`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Zone - Menu Icon, Soundscape, Language, Contact Us */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Ambient soundscape player */}
            <Soundscape onDark={onDark} />

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className={`flex items-center gap-1 text-xs uppercase tracking-wider ${tone.text} py-1.5 px-2.5 rounded-lg ${tone.chip} transition-colors cursor-pointer`}
                aria-expanded={languageOpen}
              >
                <span>{currentLang}</span>
                <ChevronDown className={`w-3.5 h-3.5 ${tone.icon}`} />
              </button>

              {languageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-surface border border-line rounded-xl shadow-lift py-1 text-xs text-ink/80 z-50">
                  {['EN', 'DE', 'FR', 'ID', 'JA'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLanguageOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-royal-tint transition-colors flex items-center justify-between ${
                        currentLang === lang ? 'text-royal font-medium bg-royal-tint' : ''
                      }`}
                    >
                      <span>{lang === 'EN' ? 'English' : lang === 'DE' ? 'Deutsch' : lang === 'FR' ? 'Français' : lang === 'ID' ? 'Bahasa' : '日本語'}</span>
                      <span className="text-[10px] text-muted">{lang}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Us button */}
            <button
              onClick={onOpenContact}
              className={`text-xs tracking-wider uppercase font-medium ${tone.text} transition-colors hidden sm:block whitespace-nowrap px-3 py-1.5 cursor-pointer`}
            >
              Contact Us
            </button>

            {/* Direct Booking CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-royal text-on-dark rounded-full hover:bg-royal-hover transition-all cursor-pointer shadow-soft"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book or Enquire</span>
            </button>

            {/* Hamburger button matching reference styling (dark square container with 2 horizontal lines) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-lg border ${tone.menu} transition-all cursor-pointer flex flex-col justify-center items-center gap-1 w-9 h-9`}
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <>
                  <span className="w-4 h-0.5 bg-current rounded-full block"></span>
                  <span className="w-4 h-0.5 bg-current rounded-full block"></span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Full Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ivory/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-serif-editorial text-2xl tracking-wider text-ink">HUNA HEIGHTS</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-royal-tint text-royal hover:bg-royal hover:text-on-dark transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 my-auto">
            {navLinks.map((link, idx) => (
              <div key={link.label}>
                <button
                  onClick={() => handleLinkClick(link.target)}
                  className="font-display-italiana text-4xl sm:text-5xl text-ink/80 hover:text-royal transition-colors block text-left"
                >
                  <span className="text-xs text-royal mr-4 font-sans font-light">0{idx + 1}</span>
                  {link.label}
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="px-6 py-3 bg-royal text-on-dark font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-royal-hover transition-colors"
              >
                Book or Enquire
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="px-5 py-3 border border-royal text-royal bg-surface text-xs uppercase tracking-wider rounded-full hover:bg-royal-tint transition-colors"
              >
                Contact Us
              </button>
            </div>
            <p className="text-xs text-muted font-light">
              Huna Heights Apartments · Nairobi, Kenya
            </p>
          </div>
        </div>
      )}
    </>
  );
};
