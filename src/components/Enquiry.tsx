import React, { useEffect, useState } from 'react';
import { CONTACTS, ENQUIRY_TYPES, EnquiryType, UNITS, PHOTOS, whatsappLink } from '../data/site';
import { Eyebrow, Title, Photo, WhatsAppIcon, Confirm } from './ui';

const field =
  'w-full h-12 bg-white border border-[var(--navy)]/15 px-4 text-[15px] text-[var(--navy)] placeholder:text-[var(--ink)]/35 focus:outline-none focus:border-[var(--navy)] transition-colors';

export function Enquiry({ type, unit }: { type: EnquiryType; unit?: string }) {
  const [form, setForm] = useState({ type, name: '', phone: '', email: '', unit: unit || '', date: '', message: '' });

  useEffect(() => {
    setForm((f) => ({ ...f, type, unit: unit ?? f.unit }));
  }, [type, unit]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const contact = CONTACTS[form.type];
  const typeLabel = ENQUIRY_TYPES.find((t) => t.id === form.type)?.label ?? 'Enquiry';
  const dateLabel = form.type === 'stays' ? 'Arrival date' : form.type === 'leasing' ? 'Preferred move-in date' : 'Preferred date';

  const summary = [
    `Enquiry: ${typeLabel}`,
    form.name && `Name: ${form.name}`,
    form.phone && `Phone: ${form.phone}`,
    form.email && `Email: ${form.email}`,
    form.type === 'leasing' && form.unit && `Apartment: ${form.unit}`,
    form.date && `${dateLabel}: ${form.date}`,
    form.message && `Message: ${form.message}`,
  ]
    .filter(Boolean)
    .join('\n');

  const valid = form.name.trim() && (form.phone.trim() || form.email.trim());
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Huna Heights: ${typeLabel}`)}&body=${encodeURIComponent(summary)}`;

  return (
    <section id="enquire" className="bg-[var(--stone)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-24 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Enquire</Eyebrow>
          <Title>Arrange a viewing</Title>
          <p className="text-[16px] leading-relaxed text-[var(--ink)]/70 mt-7 max-w-[420px]">
            Tell us what you are looking for and the right person on our team will get back to you, usually within one working day.
          </p>
          <Photo src={PHOTOS.kitchen} label="Kitchen" className="aspect-[4/3] mt-10 hidden lg:block" />
        </div>

        <form className="lg:col-span-7 bg-white p-6 sm:p-10" onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend className="text-[11px] tracking-[0.28em] uppercase text-[var(--navy)]/55">I'm interested in</legend>
            <div className="grid sm:grid-cols-2 gap-2 mt-4">
              {ENQUIRY_TYPES.map((t) => (
                <label
                  key={t.id}
                  className={`flex items-center gap-3 h-12 px-4 border cursor-pointer text-[14px] transition-colors ${
                    form.type === t.id ? 'border-[var(--navy)] text-[var(--navy)] bg-[var(--stone)]' : 'border-[var(--navy)]/15 text-[var(--ink)]/70 hover:border-[var(--navy)]/40'
                  }`}
                >
                  <input type="radio" name="type" value={t.id} checked={form.type === t.id} onChange={set('type')} className="accent-[var(--copper)]" />
                  {t.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <label className="block">
              <span className="text-[13px] text-[var(--ink)]/65">Full name</span>
              <input className={`${field} mt-2`} value={form.name} onChange={set('name')} autoComplete="name" required />
            </label>
            <label className="block">
              <span className="text-[13px] text-[var(--ink)]/65">Phone</span>
              <input className={`${field} mt-2`} value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder="+254" />
            </label>
            <label className="block">
              <span className="text-[13px] text-[var(--ink)]/65">Email</span>
              <input className={`${field} mt-2`} value={form.email} onChange={set('email')} type="email" autoComplete="email" />
            </label>
            <label className="block">
              <span className="text-[13px] text-[var(--ink)]/65">{dateLabel}</span>
              <input className={`${field} mt-2`} value={form.date} onChange={set('date')} type="date" />
            </label>
            {form.type === 'leasing' && (
              <label className="block sm:col-span-2">
                <span className="text-[13px] text-[var(--ink)]/65">Apartment</span>
                <select className={`${field} mt-2`} value={form.unit} onChange={set('unit')}>
                  <option value="">Either / not sure yet</option>
                  {UNITS.map((u) => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </label>
            )}
            <label className="block sm:col-span-2">
              <span className="text-[13px] text-[var(--ink)]/65">Message (optional)</span>
              <textarea className={`${field} mt-2 h-28 py-3 resize-none`} value={form.message} onChange={set('message')} />
            </label>
          </div>

          <p className="text-[13px] text-[var(--ink)]/55 mt-6">
            Goes to: {contact.label}, {contact.email}
            <Confirm show={contact.confirm} />
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <a
              href={valid ? whatsappLink(summary) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!valid}
              className={`inline-flex items-center justify-center gap-2 h-12 text-[14px] font-medium transition-colors ${
                valid ? 'bg-[var(--copper)] text-white hover:bg-[#a04d26]' : 'bg-[var(--copper)]/35 text-white pointer-events-none'
              }`}
            >
              <WhatsAppIcon /> Send on WhatsApp
            </a>
            <a
              href={valid ? mailto : undefined}
              aria-disabled={!valid}
              className={`inline-flex items-center justify-center h-12 text-[14px] font-medium border transition-colors ${
                valid ? 'border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white' : 'border-[var(--navy)]/20 text-[var(--navy)]/35 pointer-events-none'
              }`}
            >
              Send by email
            </a>
          </div>
          {!valid && <p className="text-[12px] text-[var(--ink)]/45 mt-3">Add your name and a phone number or email to send.</p>}
        </form>
      </div>
    </section>
  );
}
