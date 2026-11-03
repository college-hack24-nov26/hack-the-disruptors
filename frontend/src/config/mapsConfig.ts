/**
 * Google Maps & Spatial Configuration Helper
 * Validates whether a genuine Google Maps API key is configured,
 * preventing initialization crashes from placeholder or dummy keys.
 */
export const getGoogleMapsApiKey = (): string => {
  return (
    (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ||
    (import.meta.env.VITE_GOOGLE_MAPS_BROWSER_API_KEY as string) ||
    (typeof window !== 'undefined' ? (window as any).GOOGLE_MAPS_API_KEY : '') ||
    ''
  ).trim();
};

export const hasValidGoogleMapsKey = (): boolean => {
  const key = getGoogleMapsApiKey();
  if (!key) return false;

  const lower = key.toLowerCase();
  if (
    lower.includes('your_google_maps') ||
    lower.includes('your-google-maps') ||
    lower.includes('placeholder') ||
    lower.includes('example') ||
    lower.includes('dummy') ||
    lower === 'undefined' ||
    lower === 'null'
  ) {
    return false;
  }

  // Real Google Maps Browser API keys start with 'AIza' and are typically 39 chars long
  if (!key.startsWith('AIza') || key.length < 25) {
    return false;
  }

  return true;
};

