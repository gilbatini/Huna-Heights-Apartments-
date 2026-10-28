/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ArchitecturalShowcase } from './components/ArchitecturalShowcase';
import { GallerySection } from './components/GallerySection';
import { BookingSystem } from './components/BookingSystem';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { ContactModal } from './components/ContactModal';
import { CABINS } from './data/cabins';
import { Cabin, BookingSearch } from './types';

export default function App() {
  const [selectedCabin, setSelectedCabin] = useState<Cabin>(CABINS[0]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [initialSearchDates, setInitialSearchDates] = useState<{
    checkIn: string;
    checkOut: string;
    guests: number;
  }>({
    checkIn: '2026-06-21',
    checkOut: '2026-06-25',
    guests: 2,
  });

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (search: BookingSearch) => {
    // If the search specified a known destination, select the matching cabin
    if (search.destination.includes('Naivasha')) {
      const c = CABINS.find((item) => item.id.includes('naivasha')) || CABINS[1];
      setSelectedCabin(c);
    } else if (search.destination.includes('Ngong')) {
      const c = CABINS.find((item) => item.id.includes('ngong')) || CABINS[2];
      setSelectedCabin(c);
    } else {
      setSelectedCabin(CABINS[0]);
    }

    setInitialSearchDates({
      checkIn: '2026-06-21',
      checkOut: '2026-06-25',
      guests: search.guests,
    });
  };

  const handleOpenBooking = () => {
    handleNavigate('booking');
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-[#e8eaed] font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section matching Reference */}
        <Hero
          onSearch={handleSearch}
          onOpenVideo={() => setIsVideoModalOpen(true)}
          onOpenBooking={handleOpenBooking}
        />

        {/* Press & Trusted Recognition */}
        <TrustBar />

        {/* Architectural Showcase ("Discover") */}
        <ArchitecturalShowcase
          onSelectCabin={(cabin) => setSelectedCabin(cabin)}
          onOpenBooking={handleOpenBooking}
        />

        {/* High-Quality Image Gallery */}
        <GallerySection />

        {/* Interactive Booking System */}
        <BookingSystem
          selectedCabin={selectedCabin}
          onCabinChange={(cabin) => setSelectedCabin(cabin)}
          initialSearchDates={initialSearchDates}
        />

        {/* Architectural Ethos & Story ("About Us") */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Cinematic Visual Tour Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onBookNow={handleOpenBooking}
      />

      {/* Concierge Inquiries Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
