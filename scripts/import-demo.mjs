// Turns the scraped demo data (data/demo.json) into the site's sample unit list
// (src/data/estate.json). Only unit numbers, floors, sizes, beds, baths and
// status are used; the source's copy, prices and image URLs are not.
//
// Rents are indicative placeholders per apartment type, to confirm with the client.
//
// Run: npm run import:demo
import { readFileSync, writeFileSync } from 'node:fs';

// Indicative monthly rents in KES, to confirm. Replace with the client's figures.
const INDICATIVE_RENT_KES = {
  '2 Bedroom': 140000,
  '3 Bedroom': 190000,
};

// USD per KES from open.er-api.com, 30 Oct 2026 (1 USD = KES 129.65).
const RATES = { asOf: '2026-10-30', kesToUsd: 1.334844 / 173.066223 };

const bedroomsOf = (type) => Number(type.match(/\d+/)[0]);
const byBedrooms = Object.entries(INDICATIVE_RENT_KES).sort(([a], [b]) => bedroomsOf(a) - bedroomsOf(b));
byBedrooms.forEach(([type, kes], i) => {
  const [prevType, prevKes] = byBedrooms[i - 1] ?? [];
  if (prevKes !== undefined && kes <= prevKes) {
    throw new Error(`${type} rent (KES ${kes}) must be higher than ${prevType} rent (KES ${prevKes})`);
  }
});

const rents = Object.fromEntries(
  byBedrooms.map(([type, kes]) => [type, { kes, usd: Math.round((kes * RATES.kesToUsd) / 10) * 10 }]),
);

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
    rentPerMonth: u.status === 'available' ? (rents[type.name] ?? null) : null,
  })),
);

const estate = { rates: { asOf: RATES.asOf }, rents, units };
writeFileSync(new URL('../src/data/estate.json', import.meta.url), JSON.stringify(estate, null, 2) + '\n');
console.log(`Wrote ${units.length} sample units and rents for ${Object.keys(rents).join(', ')} to src/data/estate.json`);
