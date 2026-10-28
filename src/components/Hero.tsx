import React, { useState } from 'react';
import { Play, ChevronDown, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { BookingSearch } from '../types';

interface HeroProps {
  onSearch: (search: BookingSearch) => void;
  onOpenVideo: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenVideo, onOpenBooking }) => {
  const [destination, setDestination] = useState('Tigoni, Nairobi');
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState('June 21, 2026');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [guestsCount, setGuestsCount] = useState(2);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const destinationsList = [
    { name: 'Tigoni, Nairobi', region: 'Highlands', desc: 'Obsidian Lake Monolith' },
    { name: 'Lake Naivasha', region: 'Rift Valley', desc: 'Oloiden Horizon Monolith' },
    { name: 'Ngong Hills', region: 'Greater Nairobi', desc: 'Ridge Forest Pavilion' },
  ];

  const handleSearchClick = () => {
    onSearch({
      destination,
      checkIn: checkInDate,
      checkOut: 'June 25, 2026',
      guests: guestsCount,
    });
    onOpenBooking();
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#08090b]">
      {/* Background Graphic & Visual Frame with HUNA HEIGHTS wording */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/huna-heights-hero.jpg"
          alt="HUNA HEIGHTS floating luxury architectural cabin on water"
          className="w-full h-full object-cover object-center scale-[1.01]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle depth overlays for high contrast legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-black/50" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Center Empty Spacer to let the glorious cabin and typography breathe */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1 flex flex-col justify-end pt-12 sm:pt-24 pb-8">
        {/* Middle Two-Column Context Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 sm:mb-14">
          {/* Left Column: Headline and Video preview card */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans tracking-tight text-white font-medium leading-[1.08] text-balance drop-shadow-md">
              Find Your Perfect <br />
              <span className="font-serif-editorial italic font-normal tracking-wide text-neutral-100">Cabin Escape</span>
            </h1>

            {/* Video preview card matching reference */}
            <div 
              onClick={onOpenVideo}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpenVideo()}
              className="group relative cursor-pointer w-full max-w-[280px] sm:max-w-[310px] bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 hover:border-white/30 rounded-2xl p-2.5 transition-all duration-300 shadow-2xl"
            >
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-900">
                <img
                  src="/images/huna-heights-hero.jpg"
                  alt="Discover our latest cabins"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center pl-0.5 shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-black" />
                  </div>
                </div>
              </div>

              <div className="pt-2 px-1 pb-0.5 flex items-center justify-between text-xs text-neutral-300 group-hover:text-white font-light">
                <span>Discover our latest cabins</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative intro copy matching reference */}
          <div className="lg:col-span-5 flex flex-col lg:items-end justify-end">
            <p className="text-neutral-200 text-sm sm:text-base font-light leading-relaxed max-w-sm lg:text-right drop-shadow">
              Unwind in handpicked luxury cabins surrounded by Nairobi's misty highlands, tea estates, and Great Rift Valley views.
            </p>
          </div>
        </div>

        {/* Floating Search & Booking Bar matching reference layout */}
        <div className="relative z-20 w-full bg-[#111317]/85 hover:bg-[#111317]/95 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-2xl transition-all">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
            
            {/* Destination Field */}
            <div className="relative sm:col-span-4 px-3 sm:px-5 py-2 sm:border-r sm:border-white/10">
              <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-light mb-0.5">
                Destination
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsDestOpen(!isDestOpen);
                  setIsDateOpen(false);
                  setIsGuestsOpen(false);
                }}
                className="w-full flex items-center justify-between text-sm sm:text-base text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                <span className="truncate">{destination}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isDestOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Destination Dropdown */}
              {isDestOpen && (
                <div className="absolute left-0 bottom-full mb-3 w-72 bg-[#14171d] border border-white/15 rounded-2xl shadow-2xl p-2 z-50">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400 px-3 py-1 font-medium">
                    Available Sanctuaries
                  </div>
                  {destinationsList.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => {
                        setDestination(d.name);
                        setIsDestOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-colors cursor-pointer flex items-start gap-2.5 ${
                        destination === d.name ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-neutral-300'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium text-white">{d.name}</div>
                        <div className="text-[11px] text-neutral-400 font-light">{d.region} · {d.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Field */}
            <div className="relative sm:col-span-4 px-3 sm:px-5 py-2 sm:border-r sm:border-white/10">
              <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-light mb-0.5">
                Date
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsDateOpen(!isDateOpen);
                  setIsDestOpen(false);
                  setIsGuestsOpen(false);
                }}
                className="w-full flex items-center justify-between text-sm sm:text-base text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                <span className="truncate">{checkInDate}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isDateOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Date Quick Selector */}
              {isDateOpen && (
                <div className="absolute left-0 bottom-full mb-3 w-64 bg-[#14171d] border border-white/15 rounded-2xl shadow-2xl p-3 z-50">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400 px-1 py-1 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Select Travel Window
                  </div>
                  <div className="space-y-1 mt-1">
                    {['June 21, 2026', 'July 15, 2026', 'August 08, 2026', 'September 12, 2026'].map((dt) => (
                      <button
                        key={dt}
                        onClick={() => {
                          setCheckInDate(dt);
                          setIsDateOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                          checkInDate === dt ? 'bg-white/10 text-white font-medium' : 'text-neutral-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{dt}</span>
                        <span className="text-[10px] text-neutral-500">4 Nights</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Guests Field */}
            <div className="relative sm:col-span-2 px-3 sm:px-5 py-2">
              <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-light mb-0.5">
                Guests
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsGuestsOpen(!isGuestsOpen);
                  setIsDestOpen(false);
                  setIsDateOpen(false);
                }}
                className="w-full flex items-center justify-between text-sm sm:text-base text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer text-left"
              >
                <span>{guestsCount} {guestsCount === 1 ? 'Adult' : 'Adults'}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isGuestsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Guests Selector */}
              {isGuestsOpen && (
                <div className="absolute left-0 bottom-full mb-3 w-48 bg-[#14171d] border border-white/15 rounded-2xl shadow-2xl p-3 z-50">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400 px-1 py-1 font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Party Size
                  </div>
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-xs text-neutral-300">Adults</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        className="w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-white w-4 text-center">{guestsCount}</span>
                      <button
                        onClick={() => setGuestsCount(Math.min(4, guestsCount + 1))}
                        className="w-7 h-7 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold text-sm"
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
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-neutral-100 text-[#0c0e12] font-semibold rounded-full shadow-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-sans text-sm tracking-tight">Find</span>
                <span className="font-serif-editorial italic text-base font-normal">Cabin</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
