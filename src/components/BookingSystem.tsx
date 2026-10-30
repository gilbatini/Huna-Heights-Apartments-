import React, { useState } from 'react';
import { CABINS, ADD_ONS } from '../data/cabins';
import { Cabin, AddOn, ReservationConfirmation } from '../types';
import { formatKes, formatUsd } from '../data/estate';
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
  const [checkInDate, setCheckInDate] = useState('2026-11-14');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-18');
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

  // Leased apartments take a viewing request; only furnished stays are priced by the night.
  const pricing = activeCabin.pricing;
  const isViewing = pricing.kind === 'monthly';
  const nights = isViewing ? 0 : calculateNights();
  const nightlyTotal = pricing.kind === 'nightly' ? pricing.usd * nights : 0;
  const cleaningFee = isViewing ? 0 : 140;
  const serviceFee = Math.round(nightlyTotal * 0.08);

  const activeAddOnsList = isViewing ? [] : ADD_ONS.filter((a) => selectedAddOns.includes(a.id));
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
    if (!isViewing && end <= start) errors.dates = 'Check-out date must be after check-in date';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `HH-${Math.floor(100000 + Math.random() * 900000)}`;
      const conf: ReservationConfirmation = {
        bookingId: code,
        requestType: isViewing ? 'viewing' : 'stay',
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
    const title = encodeURIComponent(
      `${confirmation.requestType === 'viewing' ? 'Viewing' : 'Stay'} at ${confirmation.cabin.name}`,
    );
    const details = encodeURIComponent(
      `Booking Reference: ${confirmation.bookingId}\nLocation: ${confirmation.cabin.location}\nGuests: ${confirmation.guests}\nDirect Concierge: concierge@hunaheights.com`
    );
    const location = encodeURIComponent(confirmation.cabin.location);
    const day = confirmation.checkIn.replace(/-/g, '');
    const sDate = confirmation.requestType === 'viewing' ? `${day}T070000Z` : `${day}T150000Z`;
    const eDate =
      confirmation.requestType === 'viewing' ? `${day}T080000Z` : confirmation.checkOut.replace(/-/g, '') + 'T110000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${sDate}/${eDate}&details=${details}&location=${location}`;
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-page text-ink scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-line">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-deep font-light block mb-2">
              06. Book or Enquire
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-ink tracking-tight">
              Plan Your <span className="font-serif-editorial italic font-normal text-gold-deep">Stay or Viewing</span>
            </h2>
          </div>
          <p className="text-muted text-sm max-w-md font-light leading-relaxed">
            Request dates at the Furnished Residence, or tell us when you would like to view an apartment. Our team will confirm availability and pricing with you directly.
          </p>
        </div>

        {/* Confirmation Screen */}
        {confirmation ? (
          <div className="max-w-3xl mx-auto bg-surface border border-line-strong rounded-3xl p-8 sm:p-12 shadow-lift animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-700 font-semibold">
                Request Received
              </span>
              <h3 className="text-2xl sm:text-3xl font-display-italiana text-ink mt-1">
                We Will Be in Touch Soon
              </h3>
              <p className="text-muted text-xs mt-2">
                Reference: <span className="font-mono font-bold text-ink text-sm">{confirmation.bookingId}</span>
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-page border border-line rounded-2xl p-6 mb-8 divide-y divide-line text-xs">
              <div className="pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-muted block text-[11px]">Selected Apartment</span>
                  <span className="text-base font-semibold text-ink">{confirmation.cabin.name}</span>
                  <p className="text-muted flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-subtle" />
                    {confirmation.cabin.location}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-muted block text-[11px]">Your Details</span>
                  <span className="text-ink font-medium">{confirmation.guestName}</span>
                  <p className="text-muted">{confirmation.guestEmail}</p>
                </div>
              </div>

              {confirmation.requestType === 'viewing' ? (
              <div className="py-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-subtle uppercase tracking-wider text-[10px] block">Preferred Viewing Date</span>
                  <span className="text-ink font-medium">{confirmation.checkIn}</span>
                </div>
                <div>
                  <span className="text-subtle uppercase tracking-wider text-[10px] block">Request</span>
                  <span className="text-ink font-medium">Viewing, long-term lease</span>
                </div>
              </div>
              ) : (
              <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-subtle uppercase tracking-wider text-[10px] block">Check-In</span>
                  <span className="text-ink font-medium">{confirmation.checkIn}</span>
                  <span className="text-subtle block text-[10px]">From 3:00 PM</span>
                </div>
                <div>
                  <span className="text-subtle uppercase tracking-wider text-[10px] block">Check-Out</span>
                  <span className="text-ink font-medium">{confirmation.checkOut}</span>
                  <span className="text-subtle block text-[10px]">Until 11:00 AM</span>
                </div>
                <div>
                  <span className="text-subtle uppercase tracking-wider text-[10px] block">Duration</span>
                  <span className="text-ink font-medium">{confirmation.nights} Nights</span>
                </div>
                <div>
                  <span className="text-subtle uppercase tracking-wider text-[10px] block">Party</span>
                  <span className="text-ink font-medium">{confirmation.guests} Guests</span>
                </div>
              </div>
              )}

              {confirmation.addOns.length > 0 && (
                <div className="py-4">
                  <span className="text-subtle uppercase tracking-wider text-[10px] block mb-2">
                    Requested Extras
                  </span>
                  <div className="space-y-1.5">
                    {confirmation.addOns.map((add) => (
                      <div key={add.id} className="flex justify-between text-ink-soft">
                        <span>{add.name}</span>
                        <span className="font-mono text-muted">${add.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                {confirmation.cabin.pricing.kind === 'monthly' ? (
                  <div>
                    <span className="text-muted block text-[11px]">Monthly Rent (Indicative, To Confirm)</span>
                    <span className="text-xl font-bold font-mono text-ink">{formatKes(confirmation.cabin.pricing.kes)}</span>
                    <span className="block text-[11px] text-muted">≈ {formatUsd(confirmation.cabin.pricing.usd)} / month</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-muted block text-[11px]">Estimated Total (To Confirm)</span>
                    <span className="text-xl font-bold font-mono text-ink">${confirmation.grandTotal.toLocaleString()}</span>
                  </div>
                )}
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[11px] font-medium">
                  Awaiting Confirmation
                </span>
              </div>
            </div>

            {/* Confirmation actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={createCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-navy text-white font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-navy-deep transition-colors flex items-center justify-center gap-2 text-center"
              >
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </a>
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-6 py-3 bg-sand text-ink font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-beige transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Print Confirmation
              </button>
              <button
                onClick={() => setConfirmation(null)}
                className="w-full sm:w-auto px-6 py-3 border border-line-strong text-ink-soft font-semibold text-xs uppercase tracking-wider rounded-full hover:text-ink hover:border-navy transition-colors"
              >
                Make Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form & Add-ons */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Cabin Picker */}
              <div className="bg-surface border border-line rounded-2xl p-6">
                <label className="block text-xs uppercase tracking-widest text-muted font-medium mb-4">
                  1. Choose Your Apartment
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CABINS.map((cabin) => (
                    <button
                      type="button"
                      key={cabin.id}
                      onClick={() => handleSelectCabin(cabin)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        activeCabin.id === cabin.id
                          ? 'border-navy bg-sand shadow-soft'
                          : 'border-line bg-surface hover:border-navy/40 text-muted'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-semibold text-ink block truncate">{cabin.name}</span>
                        <span className="text-[11px] text-muted block truncate">{cabin.location.split(',')[0]}</span>
                      </div>
                      <div className="mt-4 pt-2 border-t border-line flex items-center justify-between gap-2 text-xs">
                        {cabin.pricing.kind === 'monthly' ? (
                          <>
                            <span className="font-mono text-ink font-medium">{formatKes(cabin.pricing.kes)}</span>
                            <span className="text-[10px] text-muted">/ month</span>
                          </>
                        ) : (
                          <>
                            <span className="font-mono text-ink font-medium">${cabin.pricing.usd}</span>
                            <span className="text-[10px] text-muted">/ night</span>
                          </>
                        )}
                      </div>
                      <span className="mt-1 text-[10px] text-subtle">Indicative, to confirm</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Dates & Party size */}
              <div className="bg-surface border border-line rounded-2xl p-6">
                <label className="block text-xs uppercase tracking-widest text-muted font-medium mb-4">
                  {isViewing ? '2. Preferred Viewing Date' : '2. Dates & Guests'}
                </label>
                {isViewing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] text-muted mb-1.5 font-light">Viewing Date</label>
                      <input
                        type="date"
                        value={checkInDate}
                        min="2026-01-01"
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full bg-field border border-line-strong rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-navy transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] text-muted mb-1.5 font-light">Check-In</label>
                    <input
                      type="date"
                      value={checkInDate}
                      min="2026-01-01"
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-field border border-line-strong rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted mb-1.5 font-light">Check-Out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      min={checkInDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-field border border-line-strong rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted mb-1.5 font-light">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-field border border-line-strong rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-navy transition-colors cursor-pointer"
                    >
                      {Array.from({ length: activeCabin.guestsMax }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num} className="bg-field text-ink">
                          {num} {num === 1 ? 'Guest' : 'Guests'} (Max {activeCabin.guestsMax})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                )}
                {formErrors.dates && (
                  <p className="text-red-700 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.dates}
                  </p>
                )}
              </div>

              {/* Step 3: Curated Add-ons (furnished stays only) */}
              {!isViewing && (
              <div className="bg-surface border border-line rounded-2xl p-6">
                <label className="block text-xs uppercase tracking-widest text-muted font-medium mb-1">
                  3. Extras for Furnished Stays
                </label>
                <p className="text-xs text-muted mb-4 font-light">
                  Optional services for stays at the Furnished Residence.
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
                            ? 'bg-sand border-navy'
                            : 'bg-surface border-line hover:border-line-strong'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isSelected ? 'bg-navy text-white border-navy' : 'border-navy/40 bg-transparent'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className="text-xs font-medium text-ink block">{addon.name}</span>
                            <span className="text-[11px] text-muted font-light block leading-relaxed mt-0.5">
                              {addon.description}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium text-ink shrink-0">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              )}

              {/* Step 4: Your Details Details */}
              <div className="bg-surface border border-line rounded-2xl p-6">
                <label className="block text-xs uppercase tracking-widest text-muted font-medium mb-4">
                  {isViewing ? '3. Your Details' : '4. Your Details'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] text-muted mb-1 font-light">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Julian Vance"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-field border border-line-strong rounded-xl px-3.5 py-2.5 text-xs text-ink placeholder:text-faint focus:outline-none focus:border-navy"
                    />
                    {formErrors.name && (
                      <span className="text-red-700 text-[10px] mt-1 block">{formErrors.name}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted mb-1 font-light">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. julian@studio.co"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-field border border-line-strong rounded-xl px-3.5 py-2.5 text-xs text-ink placeholder:text-faint focus:outline-none focus:border-navy"
                    />
                    {formErrors.email && (
                      <span className="text-red-700 text-[10px] mt-1 block">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] text-muted mb-1 font-light">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +254 712 345 678"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-field border border-line-strong rounded-xl px-3.5 py-2.5 text-xs text-ink placeholder:text-faint focus:outline-none focus:border-navy"
                  />
                  {formErrors.phone && (
                    <span className="text-red-700 text-[10px] mt-1 block">{formErrors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] text-muted mb-1 font-light">
                    Special Inquiries or Dietary Preferences (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Preferred viewing times, move-in date, arrival time..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-field border border-line-strong rounded-xl px-3.5 py-2 text-xs text-ink placeholder:text-faint focus:outline-none focus:border-navy"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Live Price Card & Instant Booking Action */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-surface border border-line-strong rounded-3xl p-6 sm:p-8 shadow-lift">
                {/* Property thumbnail header */}
                <div className="flex gap-4 items-center pb-6 border-b border-line">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-sand shrink-0 border border-line">
                    <img
                      src={activeCabin.heroImage}
                      alt={activeCabin.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink text-base">{activeCabin.name}</h4>
                    <p className="text-xs text-muted font-light">{activeCabin.location}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-muted">
                      {isViewing ? (
                        <span>Viewing request · {checkInDate}</span>
                      ) : (
                        <>
                          <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                          <span>·</span>
                          <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {pricing.kind === 'monthly' ? (
                <div className="py-6 flex items-baseline justify-between">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted">Monthly Rent</span>
                    <span className="text-[11px] text-subtle font-light">Indicative, to confirm</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-ink tabular-nums">
                      {formatKes(pricing.kes)}
                    </span>
                    <span className="block text-xs text-muted tabular-nums">≈ {formatUsd(pricing.usd)}</span>
                  </div>
                </div>
                ) : (
                <>
                {/* Price Breakdown */}
                <div className="py-6 space-y-3 text-xs border-b border-line">
                  <div className="flex justify-between text-ink-soft">
                    <span>${pricing.usd} × {nights} Nights</span>
                    <span className="font-mono text-ink tabular-nums">${nightlyTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <span>Cleaning</span>
                    <span className="font-mono text-ink tabular-nums">${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <span>Service Fee</span>
                    <span className="font-mono text-ink tabular-nums">${serviceFee}</span>
                  </div>
                  {activeAddOnsList.length > 0 && (
                    <div className="flex justify-between text-ink-soft">
                      <span>Extras ({activeAddOnsList.length})</span>
                      <span className="font-mono text-ink tabular-nums">+${addOnsTotal}</span>
                    </div>
                  )}
                </div>

                {/* Grand Total */}
                <div className="py-6 flex items-baseline justify-between">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted">Estimated Total</span>
                    <span className="text-[11px] text-subtle font-light">Indicative, to be confirmed</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-ink tabular-nums">
                      ${grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
                </>
                )}

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleCompleteReservation}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-navy hover:bg-navy-deep text-white font-semibold text-xs uppercase tracking-widest rounded-full shadow-lift transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>{isViewing ? 'Request a Viewing' : 'Send Request'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Guarantee trust points */}
                <div className="mt-6 pt-4 border-t border-line space-y-2 text-[11px] text-muted font-light">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-ink-soft" />
                    <span>No payment is taken online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-ink-soft" />
                    <span>Our team confirms by phone or email</span>
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
