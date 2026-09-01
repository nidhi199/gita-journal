import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  X, 
  Check, 
  Trash2, 
  Loader2, 
  Compass, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { JournalLocation } from '../types';
import { getCurrentLocation } from '../utils/geolocation';

interface GeotagModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: JournalLocation | null;
  onSaveLocation: (location: JournalLocation | null) => void;
}

const SANCTUARY_PRESETS = [
  'Home Sanctuary',
  'Garden of Stillness',
  'Meditation Corner',
  'Sacred Temple / Ashram',
  'Mountain Retreat',
  'Riverside / Ganga Ghat',
  'Forest Trail',
  'Quiet Library Oasis',
];

export const GeotagModal: React.FC<GeotagModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSaveLocation,
}) => {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<JournalLocation | null>(currentLocation);
  const [placeName, setPlaceName] = useState<string>(currentLocation?.placeName || '');

  if (!isOpen) return null;

  const handleDetect = async () => {
    setIsLocating(true);
    setError(null);
    try {
      const loc = await getCurrentLocation();
      setDetectedLocation(loc);
      setPlaceName(loc.placeName || '');
    } catch (err: any) {
      console.error('Geolocation error:', err);
      setError(err.message || 'Unable to retrieve location. You can type a custom location name below.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleApplyPreset = (preset: string) => {
    setPlaceName(preset);
  };

  const handleSave = () => {
    if (!placeName.trim() && !detectedLocation) {
      onSaveLocation(null);
      onClose();
      return;
    }

    const finalLocation: JournalLocation = {
      latitude: detectedLocation?.latitude || 0,
      longitude: detectedLocation?.longitude || 0,
      placeName: placeName.trim() || detectedLocation?.placeName || 'Reflective Sanctuary',
      city: detectedLocation?.city,
      region: detectedLocation?.region,
      country: detectedLocation?.country,
      accuracy: detectedLocation?.accuracy,
    };

    onSaveLocation(finalLocation);
    onClose();
  };

  const handleRemove = () => {
    onSaveLocation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl border border-amber-500/30 bg-zinc-900 shadow-2xl p-6 text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-classical text-lg font-semibold tracking-wide text-zinc-100">
                Geotag Reflection Sanctuary
              </h2>
              <p className="text-xs text-zinc-400">
                Anchor this moment of contemplation to a sacred place or coordinates.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-5">
          
          {/* GPS Auto-Detect Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5">
            <div className="flex items-center space-x-3">
              <Compass className="h-5 w-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-medium text-zinc-200">Automatic GPS Detection</p>
                <p className="text-[11px] text-zinc-400">
                  {detectedLocation && detectedLocation.latitude !== 0
                    ? `Coordinates: ${detectedLocation.latitude.toFixed(4)}°, ${detectedLocation.longitude.toFixed(4)}°`
                    : 'Fetch current coordinates & nearest locality'}
                </p>
              </div>
            </div>

            <button
              id="detect-gps-location-btn"
              type="button"
              onClick={handleDetect}
              disabled={isLocating}
              className="flex items-center justify-center space-x-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-3 py-1.5 text-xs font-medium text-amber-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLocating ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Locating...</span>
                </>
              ) : (
                <>
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Detect GPS</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-start space-x-2 rounded-lg border border-amber-900/50 bg-amber-950/30 p-2.5 text-xs text-amber-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Place Name Input */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Place / Sanctuary Label
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                id="geotag-place-name-input"
                type="text"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="e.g. Home Balcony, Rishikesh Ghats, Bengaluru Office..."
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-2 pl-9 pr-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Sanctuary Quick Presets */}
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-2">
              Sanctuary Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SANCTUARY_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all ${
                    placeName === preset
                      ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                      : 'border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Details badge if coordinates available */}
          {detectedLocation && detectedLocation.latitude !== 0 && (
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-2.5 text-[11px] text-zinc-400 flex items-center justify-between">
              <div>
                <span>Lat: <strong className="text-zinc-300">{detectedLocation.latitude.toFixed(4)}</strong></span>
                <span className="mx-2">•</span>
                <span>Lng: <strong className="text-zinc-300">{detectedLocation.longitude.toFixed(4)}</strong></span>
                {detectedLocation.accuracy && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Accuracy: ±{detectedLocation.accuracy}m</span>
                  </>
                )}
              </div>
              {(detectedLocation.city || detectedLocation.country) && (
                <span className="text-amber-400/80 font-medium">
                  {[detectedLocation.city, detectedLocation.country].filter(Boolean).join(', ')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
          {currentLocation ? (
            <button
              id="remove-geotag-btn"
              type="button"
              onClick={handleRemove}
              className="flex items-center space-x-1.5 rounded-lg border border-red-500/20 bg-red-950/20 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-900/40 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove Tag</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>
            <button
              id="save-geotag-btn"
              type="button"
              onClick={handleSave}
              disabled={!placeName.trim() && !detectedLocation}
              className="flex items-center space-x-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-4 py-1.5 text-xs font-semibold text-zinc-950 transition-colors disabled:opacity-40 cursor-pointer shadow-md shadow-amber-950/50"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Attach Geotag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
