import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, X, Compass, Globe } from 'lucide-react';
import { searchPlacesLive } from '../services/geoService';

export default function PlaceAutocomplete({
  value = '',
  onChange,
  onSelectLocation,
  placeholder = 'Place of Birth (e.g. Tezpur, Assam)',
  className = '',
  dateStr = '',
  required = false,
  disabled = false
}) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Synchronize internal state with external value prop
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Click outside listener to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch live suggestions with debouncing (300ms)
  const fetchSuggestions = (query) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchPlacesLive(query, dateStr);
        setSuggestions(results);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (err) {
        console.error('Error fetching live place suggestions:', err);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setHasInteracted(true);
    if (onChange) {
      onChange(e);
    }
    fetchSuggestions(val);
  };

  const handleSelect = (item) => {
    setInputValue(item.formatted);
    setIsOpen(false);
    setSuggestions([]);
    setSelectedIndex(-1);

    if (onChange) {
      onChange({ target: { value: item.formatted } });
    }

    if (onSelectLocation) {
      onSelectLocation(item);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setInputValue('');
    setSuggestions([]);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input Field Container */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400/80">
          <MapPin className="w-4 h-4" />
        </div>

        <input
          type="text"
          required={required}
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
            else if (inputValue.trim().length >= 2) fetchSuggestions(inputValue);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={
            className ||
            "w-full pl-10 pr-10 py-3 rounded-xl bg-[#231248]/80 border border-purple-600/40 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          }
        />

        {/* Right Status Indicator: Spinner or Clear Button */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
          ) : inputValue ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-purple-900/50 transition-colors"
              title="Clear location"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Live Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#170932]/95 backdrop-blur-md border border-amber-500/40 rounded-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-50 max-h-72 overflow-y-auto divide-y divide-purple-900/40">
          
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const formattedCoords = `${Math.abs(item.lat).toFixed(2)}°${item.lat >= 0 ? 'N' : 'S'}, ${Math.abs(item.lng).toFixed(2)}°${item.lng >= 0 ? 'E' : 'W'}`;
                const tzLabel = item.tz >= 0 ? `UTC+${item.tz}` : `UTC${item.tz}`;

                return (
                  <button
                    type="button"
                    key={item.id || idx}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected ? 'bg-amber-500/25 text-white' : 'text-slate-200 hover:bg-amber-500/15'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="mt-0.5 p-1 rounded bg-amber-500/10 text-amber-400 shrink-0">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-amber-200 truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {[item.district, item.state, item.country].filter(Boolean).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex flex-col items-end">
                      <span className="text-[10px] font-mono text-amber-300/90 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-400/20">
                        {formattedCoords}
                      </span>
                      <span className="text-[9px] text-slate-400 mt-0.5 font-mono">
                        {tzLabel}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Attribution Footer */}
              <div className="px-3 py-1.5 bg-[#120626] text-[10px] text-slate-400 flex items-center justify-between border-t border-purple-900/60">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-amber-400" />
                  <span>Live Global Map Search</span>
                </span>
                <span className="text-slate-500">Open-Meteo & OSM</span>
              </div>
            </>
          ) : hasInteracted && !isLoading && inputValue.trim().length >= 2 ? (
            <div className="px-4 py-3 text-xs text-slate-400 text-center flex flex-col items-center gap-1">
              <span className="text-amber-300">No exact map matches found</span>
              <span className="text-[11px] text-slate-500">You can still enter this location; default IST coordinates will be applied.</span>
            </div>
          ) : null}

        </div>
      )}
    </div>
  );
}
