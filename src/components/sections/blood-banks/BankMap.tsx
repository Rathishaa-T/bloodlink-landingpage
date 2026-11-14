import type { BloodBank } from '@/data/bloodBanks';
import { cx } from '@/lib/cx';

const LAND_PATH =
  'M60 60 C120 20 220 30 280 50 C340 70 370 120 360 180 C350 240 300 300 230 300 C160 300 110 280 80 240 C50 200 20 120 60 60 Z';
const RIVER_PATH = 'M30 220 C90 200 130 250 200 230 S310 190 380 210';

interface BankMapProps {
  banks: BloodBank[];
  activeId: string | null;
  onActivate: (id: string | null) => void;
}

export function BankMap({ banks, activeId, onActivate }: BankMapProps) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-ink-900/10 bg-blush-50 p-4 shadow-card">
      <svg viewBox="0 0 400 320" role="img" aria-label="Stylised map showing the locations of listed blood banks and hospitals" className="h-auto w-full">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0 L0 0 0 32" fill="none" stroke="#E8C9C4" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="400" height="320" rx="20" fill="url(#grid)" />
        <path d={LAND_PATH} fill="#FFFCFB" stroke="#D9B3AE" strokeWidth="1.5" />
        <path d={RIVER_PATH} fill="none" stroke="#E8C9C4" strokeWidth="6" strokeLinecap="round" />

        {banks.map((bank) => {
          const active = bank.id === activeId;
          return (
            <g
              key={bank.id}
              role="button"
              tabIndex={0}
              aria-label={bank.name}
              onMouseEnter={() => onActivate(bank.id)}
              onMouseLeave={() => onActivate(null)}
              onFocus={() => onActivate(bank.id)}
              onBlur={() => onActivate(null)}
              className="cursor-pointer focus:outline-none"
            >
              {active && <circle cx={bank.pin.x} cy={bank.pin.y} r={18} fill="#B3122B" fillOpacity={0.18} />}
              <circle
                cx={bank.pin.x}
                cy={bank.pin.y}
                r={active ? 8 : 6}
                fill={bank.type === 'Hospital' ? '#B3122B' : '#14090B'}
                stroke="#FFFCFB"
                strokeWidth={2}
                className={cx('transition-all duration-300')}
              />
              {active && (
                <text
                  x={bank.pin.x + 12}
                  y={bank.pin.y - 12}
                  fontSize="12"
                  fontWeight="600"
                  fill="#14090B"
                  style={{ paintOrder: 'stroke', stroke: '#FFFCFB', strokeWidth: 4 }}
                >
                  {bank.name.split(' ').slice(0, 2).join(' ')}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 px-2 text-xs text-ink-600">
        Stylised map, not to scale. Hover a listing to highlight it here.
      </figcaption>
    </figure>
  );
}
