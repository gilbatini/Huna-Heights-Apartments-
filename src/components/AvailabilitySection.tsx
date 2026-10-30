import React, { useMemo, useState } from 'react';
import { RATES, UNITS, UnitStatus, formatKes, formatUsd } from '../data/estate';

const TYPES = ['All', ...Array.from(new Set(UNITS.map((u) => u.type)))];

const STATUS_STYLES: Record<UnitStatus, string> = {
  available: 'bg-white text-black',
  reserved: 'bg-white/10 text-neutral-300 border border-white/10',
  let: 'bg-transparent text-neutral-500 border border-white/10',
};

export const AvailabilitySection: React.FC = () => {
  const [type, setType] = useState('All');
  const units = useMemo(() => (type === 'All' ? UNITS : UNITS.filter((u) => u.type === type)), [type]);
  const available = units.filter((u) => u.status === 'available').length;

  return (
    <section id="availability" className="py-24 sm:py-32 bg-[#0a0c10] text-neutral-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">02. Availability</span>
              <span className="px-2.5 py-1 rounded-full border border-white/20 text-[10px] uppercase tracking-wider text-neutral-200">
                Sample availability
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium text-white tracking-tight">
              Apartments <span className="font-serif-editorial italic font-normal text-neutral-200">by Unit</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Sample data: {available} of {units.length} apartments shown as available. Rents are indicative and to
            confirm, per month in Kenyan shillings with the US dollar equivalent at the {RATES.asOf} exchange rate.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
                type === t
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-[#0d0f14] border border-white/10 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm text-left">
              <thead className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-white/10">
                <tr>
                  <th scope="col" className="px-5 py-4 font-medium">Apt</th>
                  <th scope="col" className="px-5 py-4 font-medium">Floor</th>
                  <th scope="col" className="px-5 py-4 font-medium">Size</th>
                  <th scope="col" className="px-5 py-4 font-medium">Beds</th>
                  <th scope="col" className="px-5 py-4 font-medium">Baths</th>
                  <th scope="col" className="px-5 py-4 font-medium text-right">Rent / month (indicative)</th>
                  <th scope="col" className="px-5 py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light text-neutral-300">
                {units.map((u) => (
                  <tr key={u.number} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-mono tabular-nums text-white">{u.number}</td>
                    <td className="px-5 py-4 tabular-nums">{u.floor}</td>
                    <td className="px-5 py-4 tabular-nums whitespace-nowrap">
                      {u.sizeSqm} m² <span className="text-neutral-500">/ {u.sizeSqft.toLocaleString()} sq ft</span>
                    </td>
                    <td className="px-5 py-4 tabular-nums">{u.bedrooms}</td>
                    <td className="px-5 py-4 tabular-nums">{u.bathrooms}</td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
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
                    <td className="px-5 py-4 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${STATUS_STYLES[u.status]}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
