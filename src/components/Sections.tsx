import React, { useEffect, useState } from 'react';
import { ArrowRight, BedDouble, Bath, Ruler, Menu, X, Car, ShieldCheck, Droplets, Zap, Box, MapPin, Phone, Mail } from 'lucide-react';
import {
  BRAND, CONTACTS, PHOTOS, INTRO, FACTS, UNITS, FURNISHED, FURNISHING, GALLERY,
  SHOW_FURNISHED_RESIDENCE, SHOW_FURNISHING_COLLECTION, whatsappLink, EnquiryType,
} from '../data/site';
import { Wordmark, Eyebrow, Title, Photo, Button, Confirm, WhatsAppIcon, Monogram } from './ui';

const container = 'max-w-[1240px] mx-auto px-5 sm:px-8';

export const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/* Header */
export function Header({ onEnquire }: { onEnquire: (t: EnquiryType) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const links = [
    { id: 'residences', label: 'Residences' },
    ...(SHOW_FURNISHED_RESIDENCE ? [{ id: 'furnished', label: 'Furnished stay' }] : []),
    ...(SHOW_FURNISHING_COLLECTION ? [{ id: 'furnishing', label: 'Interiors' }] : []),
    { id: 'gallery', label: 'Gallery' },
    { id: 'location', label: 'Location' },
  ];
  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[var(--stone)]/92 backdrop-blur-md border-b border-[var(--navy)]/8' : 'bg-transparent'
      }`}
    >
      <div className={`${container} h-[76px] flex items-center justify-between gap-6`}>
        <button onClick={() => go('top')} aria-label="Huna Heights home" className="cursor-pointer">
          <Wordmark />
        </button>
        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="text-[14px] text-[var(--navy)]/75 hover:text-[var(--navy)] transition-colors cursor-pointer">
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={whatsappLink('Hello Huna Heights, I would like to know more about your apartments.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 text-[13px] text-[var(--navy)] border border-[var(--navy)]/20 hover:border-[var(--navy)] transition-colors"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          <button
            onClick={() => onEnquire('leasing')}
            className="hidden sm:inline-flex items-center h-10 px-5 text-[13px] font-medium bg-[var(--navy)] text-white hover:bg-[#1b2a4a] transition-colors cursor-pointer"
          >
            Enquire
          </button>
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-[var(--navy)] cursor-pointer" aria-label="Open menu">
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--stone)] flex flex-col">
          <div className={`${container} h-[76px] flex items-center justify-between w-full`}>
            <Wordmark />
            <button onClick={() => setOpen(false)} className="p-2 text-[var(--navy)] cursor-pointer" aria-label="Close menu">
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
          <div className={`${container} flex-1 flex flex-col justify-center gap-6 w-full`}>
            {links.map((l, i) => (
              <button key={l.id} onClick={() => go(l.id)} className="text-left font-display uppercase tracking-[0.08em] text-[38px] text-[var(--navy)] cursor-pointer">
                <span className="text-[12px] tracking-[0.2em] text-[var(--copper)] mr-4 align-middle font-sans">0{i + 1}</span>
                {l.label}
              </button>
            ))}
          </div>
          <div className={`${container} pb-10 grid grid-cols-2 gap-3 w-full`}>
            <Button href={whatsappLink('Hello Huna Heights, I would like to know more about your apartments.')} variant="outline" external>
              <WhatsAppIcon /> WhatsApp
            </Button>
            <Button onClick={() => { setOpen(false); onEnquire('leasing'); }} variant="navy">
              Enquire
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* Hero */
export function Hero({ onEnquire }: { onEnquire: (t: EnquiryType) => void }) {
  return (
    <section id="top" className="relative pt-[76px] bg-[var(--stone)]">
      <div className={`${container} grid lg:grid-cols-12 gap-10 lg:gap-14 items-end pt-12 sm:pt-20 pb-16 lg:pb-24`}>
        <div className="lg:col-span-5 lg:pb-6">
          <Eyebrow>{BRAND.welcome}</Eyebrow>
          <h1 className="font-display uppercase text-[var(--navy)] tracking-[0.05em] leading-[0.95] text-[56px] sm:text-[80px] lg:text-[96px] mt-6">
            Huna
            <br />
            Heights
          </h1>
          <p className="text-[17px] sm:text-[18px] leading-relaxed text-[var(--ink)]/75 mt-7 max-w-[440px]">
            Modern apartments in {BRAND.city.split(',')[0]}. Lease a home for the long term, or stay a while in our furnished residence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <Button onClick={() => onEnquire('leasing')} variant="primary">
              Book a viewing <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </Button>
            <Button href={whatsappLink('Hello Huna Heights, I would like to book a viewing.')} variant="outline" external>
              <WhatsAppIcon /> Chat on WhatsApp
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <Photo src={PHOTOS.hero} label="Building exterior" className="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[6/5] w-full" />
          <div className="absolute -bottom-6 left-5 sm:left-8 bg-white px-6 py-5 shadow-[0_20px_50px_-20px_rgba(15,27,51,0.25)] max-w-[300px]">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[var(--navy)]/55">Now leasing</p>
            <p className="text-[15px] text-[var(--navy)] mt-2">
              Two and three-bedroom apartments<Confirm show />
            </p>
          </div>
        </div>
      </div>
      {/* Signature stripe, used once */}
      <div className="h-[6px] stripe" />
    </section>
  );
}

/* Intro + facts */
const factIcons = [Car, ShieldCheck, Droplets, Zap];

export function Intro() {
  return (
    <section className="bg-white">
      <div className={`${container} py-24 lg:py-32 grid lg:grid-cols-12 gap-12`}>
        <div className="lg:col-span-5">
          <Eyebrow>The building</Eyebrow>
          <Title>A quiet address in the city</Title>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
          <p className="text-[22px] sm:text-[26px] leading-snug text-[var(--navy)] font-light">{INTRO.heading}</p>
          {INTRO.body.map((p) => (
            <p key={p} className="text-[16px] leading-relaxed text-[var(--ink)]/70 mt-6">
              {p}
            </p>
          ))}
        </div>
      </div>
      <div className="bg-[var(--navy)]">
        <div className={`${container} grid grid-cols-2 lg:grid-cols-4`}>
          {FACTS.map((f, i) => {
            const Icon = factIcons[i % factIcons.length];
            return (
              <div key={f.title} className={`py-10 sm:py-12 pr-6 ${i > 0 ? 'lg:pl-8 lg:border-l border-white/10' : ''} ${i % 2 === 1 ? 'pl-6 border-l border-white/10 lg:pl-8' : ''}`}>
                <Icon className="w-6 h-6 text-[#E2B59A]" strokeWidth={1.25} />
                <p className="text-white text-[16px] mt-5">
                  {f.title}
                  <Confirm show={f.confirm} className="!text-[#E2B59A] !border-[#E2B59A]/60" />
                </p>
                <p className="text-white/55 text-[14px] leading-relaxed mt-2">{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Residences: long-term leasing */
export function Residences({ onEnquire }: { onEnquire: (t: EnquiryType, unit?: string) => void }) {
  return (
    <section id="residences" className="bg-[var(--stone)]">
      <div className={`${container} py-24 lg:py-32`}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <Eyebrow>Long-term leasing</Eyebrow>
            <Title>The residences</Title>
          </div>
          <p className="text-[16px] leading-relaxed text-[var(--ink)]/70 max-w-[420px]">
            Unfurnished apartments for long-term lease, each with full-height glazing, a fitted kitchen and a private balcony.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mt-16">
          {UNITS.map((u) => (
            <article key={u.id} className="bg-white group">
              <Photo src={u.photo} label={u.name} className="aspect-[4/3]" />
              <div className="p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display uppercase tracking-[0.06em] text-[28px] sm:text-[32px] text-[var(--navy)] leading-none">
                    {u.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-[14px] text-[var(--ink)]/65">
                  <span className="inline-flex items-center gap-2"><BedDouble className="w-4 h-4" strokeWidth={1.25} />{u.beds} bedrooms</span>
                  <span className="inline-flex items-center gap-2"><Bath className="w-4 h-4" strokeWidth={1.25} />{u.baths} bathrooms</span>
                  <span className="inline-flex items-center gap-2"><Ruler className="w-4 h-4" strokeWidth={1.25} />{u.size}</span>
                </div>
                <ul className="mt-6 space-y-2">
                  {u.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[15px] text-[var(--ink)]/80">
                      <span className="w-1 h-1 bg-[var(--copper)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--navy)]/10">
                  <div>
                    <p className="text-[16px] text-[var(--navy)]">{u.rent}<Confirm show={u.confirm} /></p>
                    <p className="text-[13px] text-[var(--ink)]/55 mt-1">{u.availability}</p>
                  </div>
                  <Button onClick={() => onEnquire('leasing', u.name)} variant="navy" className="!h-11">
                    Enquire
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Furnished residence: short stays (placeholder offering) */
export function FurnishedResidence({ onEnquire }: { onEnquire: (t: EnquiryType) => void }) {
  if (!SHOW_FURNISHED_RESIDENCE) return null;
  return (
    <section id="furnished" className="bg-[var(--navy)] text-white overflow-hidden">
      <div className={`${container} py-24 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center`}>
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Eyebrow light>{FURNISHED.eyebrow}</Eyebrow>
          <Title light>{FURNISHED.heading}</Title>
          <p className="text-[17px] leading-relaxed text-white/70 mt-7 max-w-[500px]">{FURNISHED.body}</p>
          <ul className="mt-8 space-y-3">
            {FURNISHED.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] text-white/85">
                <span className="w-1 h-1 bg-[#E2B59A]" />
                {p}
              </li>
            ))}
          </ul>
          <p className="text-[15px] text-white/60 mt-8">
            {FURNISHED.rate}
            <Confirm show className="!text-[#E2B59A] !border-[#E2B59A]/60" />
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button onClick={() => onEnquire('stays')} variant="light">
              Request your dates <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </Button>
            {FURNISHED.tourUrl ? (
              <Button href={FURNISHED.tourUrl} variant="ghostLight" external>
                <Box className="w-4 h-4" strokeWidth={1.5} /> Take the 3D tour
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 h-12 px-6 text-[14px] text-white/45 border border-white/15">
                <Box className="w-4 h-4" strokeWidth={1.5} /> 3D tour coming soon
              </span>
            )}
          </div>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2">
          <Photo src={FURNISHED.photo} label="Furnished residence" className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] w-full opacity-95" />
        </div>
      </div>
    </section>
  );
}

/* Interior furnishing collection (placeholder offering) */
export function FurnishingCollection({ onEnquire }: { onEnquire: (t: EnquiryType) => void }) {
  if (!SHOW_FURNISHING_COLLECTION) return null;
  return (
    <section id="furnishing" className="bg-white">
      <div className={`${container} py-24 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <Photo src={FURNISHING.photo} label="Furnishing collection" className="aspect-[4/5] w-full" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Eyebrow>{FURNISHING.eyebrow}</Eyebrow>
          <Title>{FURNISHING.heading}</Title>
          <p className="text-[17px] leading-relaxed text-[var(--ink)]/70 mt-7">{FURNISHING.body}</p>
          <div className="mt-10 divide-y divide-[var(--navy)]/10 border-y border-[var(--navy)]/10">
            {FURNISHING.packages.map((p, i) => (
              <div key={p.name} className="py-6 flex gap-6">
                <span className="text-[12px] tracking-[0.2em] text-[var(--copper)] pt-1">0{i + 1}</span>
                <div>
                  <p className="text-[18px] text-[var(--navy)]">{p.name}</p>
                  <p className="text-[15px] text-[var(--ink)]/65 mt-1">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-9">
            <Button onClick={() => onEnquire('furnishing')} variant="navy">
              Ask the Property Manager <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Gallery */
export function Gallery() {
  return (
    <section id="gallery" className="bg-[var(--stone)]">
      <div className={`${container} py-24 lg:py-32`}>
        <Eyebrow>Gallery</Eyebrow>
        <Title>Inside Huna Heights</Title>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-14">
          {GALLERY.map((g, i) => (
            <figure key={g.label} className={g.wide ? (i === GALLERY.length - 1 ? 'col-span-2 lg:col-span-3' : 'col-span-2') : ''}>
              <Photo src={g.src} label={g.label} className={g.wide ? 'aspect-[16/9] lg:aspect-[2/1]' : 'aspect-square lg:aspect-[4/5]'} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Location */
export function Location() {
  return (
    <section id="location" className="bg-white">
      <div className={`${container} py-24 lg:py-32 grid lg:grid-cols-12 gap-12`}>
        <div className="lg:col-span-4">
          <Eyebrow>Location</Eyebrow>
          <Title>Find us in Nairobi</Title>
          <div className="mt-10 space-y-5 text-[15px] text-[var(--ink)]/75">
            <p className="flex gap-3"><MapPin className="w-5 h-5 text-[var(--copper)] shrink-0" strokeWidth={1.25} />{CONTACTS.address.text}<Confirm show={CONTACTS.address.confirm} /></p>
            <p className="flex gap-3"><Phone className="w-5 h-5 text-[var(--copper)] shrink-0" strokeWidth={1.25} /><a href={`tel:${CONTACTS.phone.number}`} className="hover:text-[var(--navy)]">{CONTACTS.phone.display}</a><Confirm show={CONTACTS.phone.confirm} /></p>
            <p className="flex gap-3"><Mail className="w-5 h-5 text-[var(--copper)] shrink-0" strokeWidth={1.25} /><a href={`mailto:${CONTACTS.general.email}`} className="hover:text-[var(--navy)] break-all">{CONTACTS.general.email}</a><Confirm show={CONTACTS.general.confirm} /></p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="aspect-[4/3] sm:aspect-[16/9] w-full bg-[var(--sand)] overflow-hidden">
            <iframe
              title="Map of Huna Heights"
              src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACTS.address.mapQuery)}&output=embed`}
              className="w-full h-full border-0 grayscale-[35%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Footer */
export function Footer({ onEnquire }: { onEnquire: (t: EnquiryType) => void }) {
  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className={`${container} py-16 grid md:grid-cols-12 gap-10`}>
        <div className="md:col-span-5">
          <Wordmark tone="light" />
          <p className="text-white/55 text-[14px] leading-relaxed mt-6 max-w-[340px]">
            Modern apartments in Nairobi for long-term leasing and furnished stays.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.28em] uppercase text-white/45">Enquiries</p>
          <ul className="mt-5 space-y-3 text-[14px] text-white/75">
            <li><button className="hover:text-white cursor-pointer" onClick={() => onEnquire('leasing')}>Leasing</button></li>
            {SHOW_FURNISHED_RESIDENCE && <li><button className="hover:text-white cursor-pointer" onClick={() => onEnquire('stays')}>Furnished stays</button></li>}
            {SHOW_FURNISHING_COLLECTION && <li><button className="hover:text-white cursor-pointer" onClick={() => onEnquire('furnishing')}>Furnishing packages</button></li>}
            <li><button className="hover:text-white cursor-pointer" onClick={() => onEnquire('general')}>General</button></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[11px] tracking-[0.28em] uppercase text-white/45">Contact</p>
          <ul className="mt-5 space-y-3 text-[14px] text-white/75">
            <li>{CONTACTS.address.text}</li>
            <li><a className="hover:text-white" href={`tel:${CONTACTS.phone.number}`}>{CONTACTS.phone.display}</a></li>
            <li><a className="hover:text-white" href={`mailto:${CONTACTS.general.email}`}>{CONTACTS.general.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="h-[6px] stripe" />
      <div className={`${container} py-6 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-white/40`}>
        <p>© {new Date().getFullYear()} Huna Heights Apartments. All rights reserved.</p>
        <button className="text-left sm:text-right hover:text-white cursor-pointer" onClick={() => scrollTo('top')}>Back to top</button>
      </div>
    </footer>
  );
}

export { Monogram };
