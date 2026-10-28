import React, { useState } from 'react';
import { REVIEW_MODE } from '../data/site';

// HH monogram built from angled stripes, echoing the brochure mark.
export function Monogram({ className = 'w-9 h-9', tone = 'navy' }: { className?: string; tone?: 'navy' | 'light' }) {
  const fill = tone === 'navy' ? 'var(--navy)' : '#ffffff';
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g fill={fill}>
        <polygon points="4,4 9,4 9,36 4,36" />
        <polygon points="13,4 18,4 18,36 13,36" />
        <polygon points="22,4 27,4 27,36 22,36" />
        <polygon points="31,4 36,4 36,36 31,36" />
      </g>
      <polygon points="4,24 36,14 36,19 4,29" fill="var(--copper)" />
    </svg>
  );
}

export function Wordmark({ tone = 'navy' }: { tone?: 'navy' | 'light' }) {
  const color = tone === 'navy' ? 'text-[var(--navy)]' : 'text-white';
  return (
    <span className={`flex items-center gap-3 ${color}`}>
      <Monogram tone={tone} />
      <span className="leading-none">
        <span className="font-display block text-[19px] tracking-[0.18em] uppercase">Huna Heights</span>
        <span className="block text-[9px] tracking-[0.5em] uppercase opacity-70 mt-1">Apartments</span>
      </span>
    </span>
  );
}

// Small tag shown on placeholder content while REVIEW_MODE is on.
export function Confirm({ show, className = '' }: { show?: boolean; className?: string }) {
  if (!REVIEW_MODE || !show) return null;
  return (
    <span
      className={`inline-flex items-center align-middle text-[10px] font-medium tracking-wide uppercase text-[var(--copper)] border border-dashed border-[var(--copper)]/60 rounded px-1.5 py-0.5 ml-2 ${className}`}
      title="Placeholder: confirm with the client"
    >
      to confirm
    </span>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase ${light ? 'text-[#E2B59A]' : 'text-[var(--copper)]'}`}>
      <span className={`h-px w-8 ${light ? 'bg-[#E2B59A]' : 'bg-[var(--copper)]'}`} />
      {children}
    </p>
  );
}

export function Title({ children, light = false, className = '' }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <h2
      className={`font-display uppercase tracking-[0.06em] leading-[1.02] text-[40px] sm:text-[52px] lg:text-[60px] mt-5 ${
        light ? 'text-white' : 'text-[var(--navy)]'
      } ${className}`}
    >
      {children}
    </h2>
  );
}

// Image with a graceful placeholder until the client's photo is added.
export function Photo({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[var(--sand)] ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={label}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--navy)]/45 placeholder-lines">
          <Monogram className="w-8 h-8 opacity-40" />
          <span className="text-[11px] tracking-[0.25em] uppercase">{label}</span>
          {REVIEW_MODE && <span className="text-[10px] text-[var(--navy)]/40">Photo to come</span>}
        </div>
      )}
    </div>
  );
}

export function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
  external = false,
}: {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'navy' | 'outline' | 'light' | 'ghostLight';
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const styles = {
    primary: 'bg-[var(--copper)] text-white hover:bg-[#a04d26]',
    navy: 'bg-[var(--navy)] text-white hover:bg-[#1b2a4a]',
    outline: 'border border-[var(--navy)]/25 text-[var(--navy)] hover:border-[var(--navy)] bg-transparent',
    light: 'bg-white text-[var(--navy)] hover:bg-[var(--stone)]',
    ghostLight: 'border border-white/35 text-white hover:border-white bg-transparent',
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 h-12 px-6 text-[14px] font-medium tracking-wide transition-colors ${styles} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}
