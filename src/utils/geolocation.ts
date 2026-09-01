import { JournalLocation } from '../types';

export async function reverseGeocode(latitude: number, longitude: number): Promise<{
  placeName: string;
  city?: string;
  region?: string;
  country?: string;
}> {
  try {
    // Attempt fast client reverse geocoding via BigDataCloud client API (no API key required, fast & CORS friendly)
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || '';
      const region = data.principalSubdivision || '';
      const country = data.countryName || '';
      
      const parts = [data.locality, city, region, country].filter(Boolean);
      // Deduplicate consecutive identical parts
      const uniqueParts = parts.filter((item, index) => parts.indexOf(item) === index);
      const placeName = uniqueParts.slice(0, 2).join(', ') || `${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°`;

      return {
        placeName,
        city: city || undefined,
        region: region || undefined,
        country: country || undefined,
      };
    }
  } catch (err) {
    console.warn('Primary reverse geocoding failed, attempting fallback...', err);
  }

  try {
    // Fallback to OSM Nominatim
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=14`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const city = addr.city || addr.town || addr.village || addr.suburb || '';
      const state = addr.state || '';
      const country = addr.country || '';
      const placeName = [city, state, country].filter(Boolean).slice(0, 2).join(', ') || data.name || `${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°`;

      return {
        placeName,
        city: city || undefined,
        region: state || undefined,
        country: country || undefined,
      };
    }
  } catch (err) {
    console.warn('Fallback reverse geocoding failed:', err);
  }

  // Graceful coordinate string
  return {
    placeName: `${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°`,
  };
}

export function getCurrentLocation(): Promise<JournalLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const details = await reverseGeocode(latitude, longitude);
        resolve({
          latitude,
          longitude,
          accuracy: Math.round(accuracy),
          placeName: details.placeName,
          city: details.city,
          region: details.region,
          country: details.country,
        });
      },
      (error) => {
        let msg = 'Unable to retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}
