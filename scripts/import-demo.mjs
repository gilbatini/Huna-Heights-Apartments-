// Turns the scraped demo data (data/demo.json) into the site's estate data
// (src/data/estate.json): units, services and amenities, rebranded for
// Huna Heights, with weekly GBP rents converted to monthly KES and USD.
// Image URLs are dropped; the site uses its own photos.
//
// Run: npm run import:demo
import { readFileSync, writeFileSync } from 'node:fs';

// GBP rates from open.er-api.com, 30 Oct 2026. Update and re-run to refresh.
const RATES = { asOf: '2026-10-30', gbpToKes: 173.066223, gbpToUsd: 1.334844 };
const WEEKS_PER_MONTH = 52 / 12;

const REPLACEMENTS = [
  [/The Shard/g, 'Huna Heights'],
  [/Shard Place/g, 'Huna Heights'],
  [/London/g, 'Nairobi'],
];

const rebrand = (text) => REPLACEMENTS.reduce((t, [from, to]) => t.replace(from, to), text ?? '');

const roundTo = (value, step) => Math.round(value / step) * step;

function monthlyRent(weekly) {
  const gbp = Number(String(weekly).replace(/[^\d.]/g, ''));
  if (!gbp) return null;
  const monthlyGbp = gbp * WEEKS_PER_MONTH;
  return {
    kes: roundTo(monthlyGbp * RATES.gbpToKes, 1000),
    usd: roundTo(monthlyGbp * RATES.gbpToUsd, 10),
  };
}

const demo = JSON.parse(readFileSync(new URL('../data/demo.json', import.meta.url), 'utf8'));

const units = demo.apartments.flatMap((type) =>
  type.units.map((u) => ({
    number: u.apartment,
    type: type.name,
    floor: Number(u.floor),
    sizeSqm: u.size_sqm,
    sizeSqft: u.size_sqft,
    bedrooms: Number(u.bedrooms),
    bathrooms: Number(u.bathrooms),
    status: u.status,
    rentPerMonth: monthlyRent(u.rent_per_week),
  })),
);

const services = demo.services.map((s) => ({
  name: rebrand(s.name),
  description: rebrand(s.short_description),
}));

const amenities = demo.amenities.map((a) => ({
  name: rebrand(a.name),
  description: rebrand(a.description),
}));

const estate = { rates: RATES, units, services, amenities };
const out = new URL('../src/data/estate.json', import.meta.url);
writeFileSync(out, JSON.stringify(estate, null, 2) + '\n');
console.log(`Wrote ${units.length} units, ${services.length} services, ${amenities.length} amenities to src/data/estate.json`);
