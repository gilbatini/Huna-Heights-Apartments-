import React, { useState } from 'react';
import { CABINS, ADD_ONS } from '../data/cabins';
import { Cabin, AddOn, ReservationConfirmation } from '../types';
import {
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
  Share2,
  Clock,
  MapPin,
  Utensils,
  Flame,
  Wine,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface BookingSystemProps {
  selectedCabin?: Cabin;
  onCabinChange?: (cabin: Cabin) => void;
  initialSearchDates?: { checkIn: string; checkOut: string; guests: number };
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  selectedCabin = CABINS[0],
  onCabinChange,
  initialSearchDates,
}) => {
  const [activeCabin, setActiveCabin] = useState<Cabin>(selectedCabin);
  
  // Date states
  const [checkInDate, setCheckInDate] = useState('2026-06-21');
  const [checkOutDate, setCheckOutDate] = useState('2026-06-25');
  const [guests, setGuests] = useState(initialSearchDates?.guests || 2);
  
  // Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['nordic-sauna-ritual']);
  
  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string; dates?: string }>({});

  // Confirmation state
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync when prop updates
  React.useEffect(() => {
    setActiveCabin(selectedCabin);
  }, [selectedCabin]);

  const calculateNights = () => {
    try {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 4;
    }
  };

  const nights = calculateNights();
  const nightlyTotal = activeCabin.pricePerNight * nights;
  const cleaningFee = 140;
  const serviceFee = Math.round(nightlyTotal * 0.08);

  const activeAddOnsList = ADD_ONS.filter((a) => selectedAddOns.includes(a.id));
  const addOnsTotal = activeAddOnsList.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = nightlyTotal + cleaningFee + serviceFee + addOnsTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectCabin = (cabin: Cabin) => {
    setActiveCabin(cabin);
    if (onCabinChange) onCabinChange(cabin);
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string; dates?: string } = {};
    if (!guestName.trim()) errors.name = 'Full name is required';
    if (!guestEmail.trim() || !/\S+@\S+\.\S+/.test(guestEmail)) errors.email = 'Valid email is required';
    if (!guestPhone.trim()) errors.phone = 'Contact number is required';
    
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    if (end <= start) errors.dates = 'Check-out date must be after check-in date';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `BIN-${Math.floor(100000 + Math.random() * 900000)}`;
      const conf: ReservationConfirmation = {
        bookingId: code,
        cabin: activeCabin,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        guests,
        addOns: activeAddOnsList,
        nightlyTotal,
        cleaningFee,
        serviceFee,
        tax: serviceFee,
        grandTotal,
        guestName,
        guestEmail,
        specialRequests,
        createdAt: new Date().toISOString(),
      };
      setConfirmation(conf);
      setIsSubmitting(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const createCalendarUrl = () => {
    if (!confirmation) return '#';
    const title = encodeURIComponent(`Stay at ${confirmation.cabin.name}`);
    const details = encodeURIComponent(
      `Booking Reference: ${confirmation.bookingId}\nLocation: ${confirmation.cabin.location}\nGuests: ${confirmation.guests}\nDirect Concierge: concierge@bincabnb.com`
    );
    const location = encodeURIComponent(confirmation.cabin.location);
    const sDate = confirmation.checkIn.replace(/-/g, '') + 'T150000Z';
    const eDate = confirmation.checkOut.replace(/-/g, '') + 'T110000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${sDate}/${eDate}&details=${details}&location=${location}`;
  };

  return (
    <section id="booking" className="py-24 sm:py-32 bg-[#08090b] text-neutral-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-2">
              03. Reservation Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-white tracking-tight">
              Curate Your <span className="font-serif-editorial italic font-normal text-neutral-200">Private Retreat</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Reserve direct with bincabnb for guaranteed panoramic water vistas, private pontoon access, and personalized wilderness concierge service.
          </p>
        </div>

        {/* Confirmation Screen */}
        {confirmation ? (
          <div className="max-w-3xl mx-auto bg-[#0d0f14] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-display-italiana text-white mt-1">
                Your Sanctuary Awaits
              </h3>
              <p className="text-neutral-400 text-xs mt-2">
                Confirmation code: <span className="font-mono font-bold text-white text-sm">{confirmation.bookingId}</span>
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-[#12151b] border border-white/10 rounded-2xl p-6 mb-8 divide-y divide-white/10 text-xs">
              <div className="pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Selected Property</span>
                  <span className="text-base font-semibold text-white">{confirmation.cabin.name}</span>
                  <p className="text-neutral-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    {confirmation.cabin.location}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-neutral-400 block text-[11px]">Primary Guest</span>
                  <span className="text-white font-medium">{confirmation.guestName}</span>
                  <p className="text-neutral-400">{confirmation.guestEmail}</p>
                </div>
              </div>

              <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Check-In</span>
                  <span className="text-white font-medium">{confirmation.checkIn}</span>
                  <span className="text-neutral-500 block text-[10px]">From 3:00 PM</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Check-Out</span>
                  <span className="text-white font-medium">{confirmation.checkOut}</span>
                  <span className="text-neutral-500 block text-[10px]">Until 11:00 AM</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Duration</span>
                  <span className="text-white font-medium">{confirmation.nights} Nights</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Party</span>
                  <span className="text-white font-medium">{confirmation.guests} Guests</span>
                </div>
              </div>

              {confirmation.addOns.length > 0 && (
                <div className="py-4">
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px] block mb-2">
                    Included Experiences
                  </span>
                  <div className="space-y-1.5">
                    {confirmation.addOns.map((add) => (
                      <div key={add.id} className="flex justify-between text-neutral-300">
                        <span>{add.name}</span>
                        <span className="font-mono text-neutral-400">${add.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Total Paid & Guaranteed</span>
                  <span className="text-xl font-bold font-mono text-white">${confirmation.grandTotal.toLocaleString()}</span>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[11px] font-medium">
                  Verified Booking
                </span>
              </div>
            </div>

            {/* Confirmation actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={createCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-center"
              >
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </a>
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 text-white font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Print Confirmation
              </button>
              <button
                onClick={() => setConfirmation(null)}
                className="w-full sm:w-auto px-6 py-3 border border-white/20 text-neutral-300 font-semibold text-xs uppercase tracking-wider rounded-full hover:text-white hover:border-white transition-colors"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form & Add-ons */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Cabin Picker */}
              <div className="bg-[#0d0f14] border border-white/10 rounded-2xl p-6">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-medium mb-4">
                  1. Choose Your Sanctuary
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CABINS.map((cabin) => (
                    <button
                      type="button"
                      key={cabin.id}
                      onClick={() => handleSelectCabin(cabin)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        activeCabin.id === cabin.id
                          ? 'border-white bg-white/10 shadow-lg'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/30 text-neutral-400'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-semibold text-white block truncate">{cabin.name}</span>
                        <span className="text-[11px] text-neutral-400 block truncate">{cabin.location.split(',')[0]}</span>
                      </div>
                      <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="font-mono text-white font-medium">${cabin.pricePerNight}</span>
                        <span className="text-[10px] text-neutral-400">/ night</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Dates & Party size */}
              <div className="bg-[#0d0f14] border border-white/10 rounded-2xl p-6">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-medium mb-4">
                  2. Travel Dates & Guests
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1.5 font-light">Check-In</label>
                    <input
                      type="date"
                      value={checkInDate}
                      min="2026-01-01"
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1.5 font-light">Check-Out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      min={checkInDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1.5 font-light">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      {Array.from({ length: activeCabin.guestsMax }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num} className="bg-[#14171d] text-white">
                          {num} {num === 1 ? 'Guest' : 'Guests'} (Max {activeCabin.guestsMax})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {formErrors.dates && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.dates}
                  </p>
                )}
              </div>

              {/* Step 3: Curated Add-ons */}
              <div className="bg-[#0d0f14] border border-white/10 rounded-2xl p-6">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1">
                  3. Elevate Your Stay
                </label>
                <p className="text-xs text-neutral-400 mb-4 font-light">
                  Tailored wellness rituals and bespoke wilderness provisions.
                </p>

                <div className="space-y-3">
                  {ADD_ONS.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-white/10 border-white'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isSelected ? 'bg-white text-black border-white' : 'border-white/30 bg-transparent'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className="text-xs font-medium text-white block">{addon.name}</span>
                            <span className="text-[11px] text-neutral-400 font-light block leading-relaxed mt-0.5">
                              {addon.description}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium text-white shrink-0">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Primary Guest Details */}
              <div className="bg-[#0d0f14] border border-white/10 rounded-2xl p-6">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-medium mb-4">
                  4. Guest Credentials
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1 font-light">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Julian Vance"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                    />
                    {formErrors.name && (
                      <span className="text-red-400 text-[10px] mt-1 block">{formErrors.name}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1 font-light">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. julian@studio.co"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                    />
                    {formErrors.email && (
                      <span className="text-red-400 text-[10px] mt-1 block">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-neutral-400 mb-1 font-light">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                  />
                  {formErrors.phone && (
                    <span className="text-red-400 text-[10px] mt-1 block">{formErrors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1 font-light">
                    Special Inquiries or Dietary Preferences (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Boat shuttle coordination, private chef dietary allergies..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Live Price Card & Instant Booking Action */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-[#0d0f14] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
                {/* Property thumbnail header */}
                <div className="flex gap-4 items-center pb-6 border-b border-white/10">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                    <img
                      src={activeCabin.heroImage}
                      alt={activeCabin.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-base">{activeCabin.name}</h4>
                    <p className="text-xs text-neutral-400 font-light">{activeCabin.location}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                      <span className="text-amber-300">★ {activeCabin.rating}</span>
                      <span>·</span>
                      <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                      <span>·</span>
                      <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="py-6 space-y-3 text-xs border-b border-white/10">
                  <div className="flex justify-between text-neutral-300">
                    <span>${activeCabin.pricePerNight} × {nights} Nights</span>
                    <span className="font-mono text-white tabular-nums">${nightlyTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Cleaning & Sanitization</span>
                    <span className="font-mono text-white tabular-nums">${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Off-Grid Facility & Concierge Fee</span>
                    <span className="font-mono text-white tabular-nums">${serviceFee}</span>
                  </div>
                  {activeAddOnsList.length > 0 && (
                    <div className="flex justify-between text-neutral-300">
                      <span>Curated Add-ons ({activeAddOnsList.length})</span>
                      <span className="font-mono text-white tabular-nums">+${addOnsTotal}</span>
                    </div>
                  )}
                </div>

                {/* Grand Total */}
                <div className="py-6 flex items-baseline justify-between">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-neutral-400">Total Due</span>
                    <span className="text-[11px] text-neutral-500 font-light">Taxes & fees included</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                      ${grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleCompleteReservation}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-widest rounded-full shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Securing Dates...</span>
                  ) : (
                    <>
                      <span>Complete Reservation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Guarantee trust points */}
                <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-[11px] text-neutral-400 font-light">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Free cancellation up to 14 days before arrival</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Instant automated calendar confirmation</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
