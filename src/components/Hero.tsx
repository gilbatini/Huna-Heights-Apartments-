import React, { useState } from 'react';
import { Play, ChevronDown, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { BookingSearch } from '../types';

interface HeroProps {
  onSearch: (search: BookingSearch) => void;
  onOpenVideo: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenVideo, onOpenBooking }) => {
  const [destination, setDestination] = useState('The Furnished Residence');
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState('November 14, 2026');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [guestsCount, setGuestsCount] = useState(2);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const destinationsList = [
    { name: 'The Furnished Residence', region: 'Short stays', desc: 'Two bedrooms, furnished' },
    { name: 'Two-Bedroom Apartment', region: 'Long-term lease', desc: 'Unfurnished' },
    { name: 'Three-Bedroom Apartment', region: 'Long-term lease', desc: 'Unfurnished' },
  ];

  const handleSearchClick = () => {
    onSearch({
      destination,
      checkIn: checkInDate,
      checkOut: 'November 18, 2026',
      guests: guestsCount,
    });
    onOpenBooking();
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-navy">
      {/* Background Graphic & Visual Frame with HUNA HEIGHTS wording */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/huna-heights-hero.jpg"
          alt="Huna Heights Apartments, Nairobi"
          className="w-full h-full object-cover object-center scale-[1.01]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle depth overlays for high contrast legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-navy/45" />
        <div className="absolute inset-0 bg-navy/15" />
        {/* Soft dissolve into the ivory page below */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-page via-page/60 to-transparent" />
      </div>

      {/* Center Empty Spacer to let the glorious cabin and typography breathe */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1 flex flex-col justify-end pt-12 sm:pt-24 pb-8">
        {/* Middle Two-Column Context Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 sm:mb-14">
          {/* Left Column: Headline and Video preview card */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans tracking-tight text-white font-medium leading-[1.08] text-balance drop-shadow-md">
              Find Your Perfect <br />
              <span className="font-serif-editorial italic font-normal tracking-wide text-[#E3C982] drop-shadow-[0_2px_10px_rgba(22,30,51,0.75)]">Nairobi Home</span>
            </h1>

            {/* Video preview card matching reference */}
            <div 
              onClick={onOpenVideo}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpenVideo()}
              className="group relative cursor-pointer w-full max-w-[280px] sm:max-w-[310px] bg-navy/55 hover:bg-navy/75 backdrop-blur-md border border-white/20 hover:border-white/30 rounded-2xl p-2.5 transition-all duration-300 shadow-2xl"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-navy">
                <img
                  src="/images/huna-heights-hero.jpg"
                  alt="Take a look around Huna Heights"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-navy flex items-center justify-center pl-0.5 shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-navy" />
                  </div>
                </div>
              </div>

              <div className="pt-2 px-1 pb-0.5 flex items-center justify-between text-xs text-neutral-300 group-hover:text-white font-light">
                <span>Take a look around</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative intro copy matching reference */}
          <div className="lg:col-span-5 flex flex-col lg:items-end justify-end">
            <p className="text-neutral-200 text-sm sm:text-base font-light leading-relaxed max-w-sm lg:text-right drop-shadow">
              Modern apartments in Nairobi. Lease a home for the long term, or stay a while in our furnished residence.
            </p>
          </div>
        </div>

        {/* Floating Search & Booking Bar matching reference layout */}
        <div className="relative z-20 w-full bg-white/95 hover:bg-white backdrop-blur-xl border border-white/70 rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-lift transition-all">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
            
            {/* Destination Field */}
            <div className="relative sm:col-span-4 px-3 sm:px-5 py-2 sm:border-r sm:border-line">
              <span className="block text-[11px] uppercase tracking-wider text-muted font-light mb-0.5">
                Apartment
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsDestOpen(!isDestOpen);
                  setIsDateOpen(false);
                  setIsGuestsOpen(false);
                }}
                className="w-full flex items-center justify-between text-sm sm:text-base text-ink font-medium hover:text-ink transition-colors cursor-pointer text-left"
              >
                <span className="truncate">{destination}</span>
                <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isDestOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Destination Dropdown */}
              {isDestOpen && (
                <div className="absolute left-0 bottom-full mb-3 w-72 bg-surface border border-line-strong rounded-2xl shadow-lift p-2 z-50">
                  <div className="text-[10px] uppercase tracking-wider text-muted px-3 py-1 font-medium">
                    Our Apartments
                  </div>
                  {destinationsList.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => {
                        setDestination(d.name);
                        setIsDestOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-colors cursor-pointer flex items-start gap-2.5 ${
                        destination === d.name ? 'bg-sand text-ink' : 'hover:bg-sand/70 text-ink-soft'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium text-ink">{d.name}</div>
                        <div className="text-[11px] text-muted font-light">{d.region} · {d.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Field */}
            <div className="relative sm:col-span-4 px-3 sm:px-5 py-2 sm:border-r sm:border-line">
              <span className="block text-[11px] uppercase tracking-wider text-muted font-light mb-0.5">
                Date
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsDateOpen(!isDateOpen);
                  setIsDestOpen(false);
                  setIsGuestsOpen(false);
                }}
                className="w-full flex items-center justify-between text-sm sm:text-base text-ink font-medium hover:text-ink transition-colors cursor-pointer text-left"
              >
                <span className="truncate">{checkInDate}</span>
                <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isDateOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Date Quick Selector */}
              {isDateOpen && (
                <div className="absolute left-0 bottom-full mb-3 w-64 bg-surface border border-line-strong rounded-2xl shadow-lift p-3 z-50">
                  <div className="text-[10px] uppercase tracking-wider text-muted px-1 py-1 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Select a Date
                  </div>
                  <div className="space-y-1 mt-1">
                    {['November 14, 2026', 'December 5, 2026', 'January 9, 2027', 'February 6, 2027'].map((dt) => (
                      <button
                        key={dt}
                        onClick={() => {
                          setCheckInDate(dt);
                          setIsDateOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                          checkInDate === dt ? 'bg-sand text-ink font-medium' : 'text-ink-soft hover:bg-sand/70'
                        }`}
                      >
                        <span>{dt}</span>
                        <span className="text-[10px] text-subtle">4 Nights</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Guests Field */}
            <div className="relative sm:col-span-2 px-3 sm:px-5 py-2">
              <span className="block text-[11px] uppercase tracking-wider text-muted font-light mb-0.5">
                Guests
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsGuestsOpen(!isGuestsOpen);
                  setIsDestOpen(false);
                  setIsDateOpen(false);
                }}
                className="w-full flex items-center justify-between text-sm sm:text-base text-ink font-medium hover:text-ink transition-colors cursor-pointer text-left"
              >
                <span>{guestsCount} {guestsCount === 1 ? 'Adult' : 'Adults'}</span>
                <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isGuestsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Guests Selector */}
              {isGuestsOpen && (
                <div className="absolute left-0 bottom-full mb-3 w-48 bg-surface border border-line-strong rounded-2xl shadow-lift p-3 z-50">
                  <div className="text-[10px] uppercase tracking-wider text-muted px-1 py-1 font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Party Size
                  </div>
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-xs text-ink-soft">Adults</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        className="w-7 h-7 rounded-lg bg-sand text-ink hover:bg-beige flex items-center justify-center font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-ink w-4 text-center">{guestsCount}</span>
                      <button
                        onClick={() => setGuestsCount(Math.min(4, guestsCount + 1))}
                        className="w-7 h-7 rounded-lg bg-sand text-ink hover:bg-beige flex items-center justify-center font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Find Cabin CTA Button matching reference styling (white pill, dark cursive-accented text) */}
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-navy hover:bg-navy-deep text-white font-semibold rounded-full shadow-soft transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-sans text-sm tracking-tight">Find</span>
                <span className="font-serif-editorial italic text-base font-normal">Home</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
