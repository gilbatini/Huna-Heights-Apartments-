import React, { useState } from 'react';
import { RATES, RENTS, UNITS, Unit, UnitStatus, formatKes, formatUsd } from '../data/estate';

const PREVIEW_COUNT = 6;
const DEFAULT_TYPE = '2 Bedroom';

const STATUS_ORDER: Record<UnitStatus, number> = { available: 0, reserved: 1, let: 2 };

const STATUS_STYLES: Record<UnitStatus, string> = {
  available: 'bg-white text-black',
  reserved: 'bg-white/10 text-neutral-300 border border-white/10',
  let: 'bg-transparent text-neutral-500 border border-white/10',
};

// Available units first, then higher floors.
const sortUnits = (units: Unit[]) =>
  [...units].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || b.floor - a.floor);

const TYPES = Array.from(new Set(UNITS.map((u) => u.type)))
  .map((type) => {
    const units = sortUnits(UNITS.filter((u) => u.type === type));
    const sqft = units.map((u) => u.sizeSqft);
    const [min, max] = [Math.min(...sqft), Math.max(...sqft)];
    return {
      type,
      units,
      bedrooms: units[0].bedrooms,
      available: units.filter((u) => u.status === 'available').length,
      size: min === max ? `${min.toLocaleString()} sq ft` : `${min.toLocaleString()}–${max.toLocaleString()} sq ft`,
      rent: RENTS[type] ?? null,
    };
  })
  .sort((a, b) => a.bedrooms - b.bedrooms);

const SampleBadge = () => (
  <span className="shrink-0 px-2.5 py-1 rounded-full border border-white/20 text-[10px] uppercase tracking-wider text-neutral-200">
    Sample
  </span>
);

export const AvailabilitySection: React.FC = () => {
  const [type, setType] = useState(TYPES.some((t) => t.type === DEFAULT_TYPE) ? DEFAULT_TYPE : TYPES[0].type);
  const [expanded, setExpanded] = useState(false);
  const active = TYPES.find((t) => t.type === type) ?? TYPES[0];
  const shown = expanded ? active.units : active.units.slice(0, PREVIEW_COUNT);
  const hidden = active.units.length - PREVIEW_COUNT;

  const selectType = (next: string) => {
    setType(next);
    setExpanded(false);
  };

  return (
    <section id="availability" className="py-16 sm:py-24 bg-[#0a0c10] text-neutral-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">02. Availability</span>
              <span className="px-2.5 py-1 rounded-full border border-white/20 text-[10px] uppercase tracking-wider text-neutral-200">
                Sample availability
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-white tracking-tight">
              Apartments <span className="font-serif-editorial italic font-normal text-neutral-200">by Type</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Sample data until the real unit list is supplied. Rents are indicative and to confirm, per month in Kenyan
            shillings with the US dollar equivalent at the {RATES.asOf} exchange rate.
          </p>
        </div>

        {/* One summary card per type; selecting a card filters the table below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" role="tablist" aria-label="Apartment type">
          {TYPES.map((t) => {
            const selected = t.type === active.type;
            return (
              <button
                key={t.type}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="availability-units"
                onClick={() => selectType(t.type)}
                className={`text-left rounded-2xl border p-5 transition-all cursor-pointer ${
                  selected
                    ? 'border-white bg-white/10 shadow-lg'
                    : 'border-white/10 bg-[#0d0f14] hover:border-white/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-base font-medium text-white">{t.type}</span>
                  <SampleBadge />
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-neutral-500">Available</dt>
                    <dd className="text-white tabular-nums mt-0.5">
                      {t.available} of {t.units.length}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-neutral-500">Size</dt>
                    <dd className="text-white tabular-nums mt-0.5">{t.size}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-[10px] uppercase tracking-wider text-neutral-500">Rent / month · indicative</dt>
                    <dd className="mt-0.5">
                      {t.rent ? (
                        <>
                          <span className="font-mono tabular-nums text-white text-sm">{formatKes(t.rent.kes)}</span>
                          <span className="text-neutral-400 tabular-nums"> ≈ {formatUsd(t.rent.usd)}</span>
                        </>
                      ) : (
                        <span className="text-neutral-300">On request</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </button>
            );
          })}
        </div>

        <div id="availability-units" role="tabpanel" className="bg-[#0d0f14] border border-white/10 rounded-3xl overflow-hidden">
          <table className="w-full text-xs sm:text-sm text-left">
            <caption className="sr-only">{active.type} units, sample data</caption>
            <thead className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-white/10">
              <tr>
                <th scope="col" className="px-2.5 sm:px-5 py-4 font-medium">Apt</th>
                <th scope="col" className="hidden sm:table-cell px-5 py-4 font-medium">Floor</th>
                <th scope="col" className="px-2.5 sm:px-5 py-4 font-medium">Size</th>
                <th scope="col" className="hidden md:table-cell px-5 py-4 font-medium">Beds</th>
                <th scope="col" className="hidden md:table-cell px-5 py-4 font-medium">Baths</th>
                <th scope="col" className="px-2.5 sm:px-5 py-4 font-medium text-right">Rent / month</th>
                <th scope="col" className="px-2.5 sm:px-5 py-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light text-neutral-300">
              {shown.map((u) => (
                <tr key={u.number} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-2.5 sm:px-5 py-3.5 font-mono tabular-nums text-white">{u.number}</td>
                  <td className="hidden sm:table-cell px-5 py-3.5 tabular-nums">{u.floor}</td>
                  <td className="px-2.5 sm:px-5 py-3.5 tabular-nums whitespace-nowrap">
                    {u.sizeSqft.toLocaleString()} sq ft
                    <span className="hidden lg:inline text-neutral-500"> / {u.sizeSqm} m²</span>
                  </td>
                  <td className="hidden md:table-cell px-5 py-3.5 tabular-nums">{u.bedrooms}</td>
                  <td className="hidden md:table-cell px-5 py-3.5 tabular-nums">{u.bathrooms}</td>
                  <td className="px-2.5 sm:px-5 py-3.5 text-right whitespace-nowrap">
                    {u.rentPerMonth ? (
                      <>
                        <span className="font-mono tabular-nums text-white">{formatKes(u.rentPerMonth.kes)}</span>
                        <span className="block text-xs text-neutral-500 tabular-nums">≈ {formatUsd(u.rentPerMonth.usd)}</span>
                      </>
                    ) : u.status === 'available' ? (
                      <span className="text-xs text-neutral-400">On request</span>
                    ) : (
                      <span className="text-neutral-600">—</span>
                    )}
                  </td>
                  <td className="px-2.5 sm:px-5 py-3.5 text-right">
                    <span className={`inline-block px-2 sm:px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider ${STATUS_STYLES[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {hidden > 0 && (
            <div className="border-t border-white/10 p-4 flex justify-center">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls="availability-units"
                onClick={() => setExpanded((v) => !v)}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-wider font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {expanded ? 'Show fewer' : `View all ${active.units.length} units`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
