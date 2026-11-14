import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { MapPin } from 'lucide-react';
import { LOCATIONS } from '@/data/locations';
import { cx } from '@/lib/cx';

const MAX_SUGGESTIONS = 6;

interface CityAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  errorId?: string;
}

export function CityAutocomplete({ id, value, onChange, invalid, errorId }: CityAutocompleteProps) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const query = value.trim().toLowerCase();
  const suggestions = query
    ? LOCATIONS.filter((location) => location.toLowerCase().includes(query)).slice(0, MAX_SUGGESTIONS)
    : [];
  const showList = open && suggestions.length > 0;

  const select = (location: string) => {
    onChange(location);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showList) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      select(suggestions[activeIndex]);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden="true" />
      <input
        id={id}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={showList && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        autoComplete="off"
        placeholder="Area or city, e.g. Indiranagar, Bengaluru"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        className={cx('field pl-11', invalid && 'field-error')}
      />

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Matching areas"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-ink-900/10 bg-white py-1 shadow-card"
        >
          {suggestions.map((location, index) => (
            <li
              key={location}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => select(location)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cx(
                'flex min-h-11 cursor-pointer items-center px-4 text-[15px] text-ink-800',
                index === activeIndex && 'bg-blush text-brand-700',
              )}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
