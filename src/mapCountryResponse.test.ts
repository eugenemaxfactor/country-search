import { describe, expect, it } from 'vitest';

import {
  mapCountryResponse,
  type RawCountryResponse,
} from './mapCountryResponse';

describe('mapCountryResponse', () => {
  it('maps API data to country data used by the application', () => {
    const rawCountry: RawCountryResponse = {
      name: 'Spain',
      flag: '🇪🇸',
      capital: 'Madrid',
      region: 'Europe',
      population: 47351567,
      languages: [{ name: 'Spanish' }, { name: 'Catalan' }],
    };

    const country = mapCountryResponse(rawCountry);

    expect(country).toEqual({
      name: 'Spain',
      flag: '🇪🇸',
      capital: 'Madrid',
      region: 'Europe',
      population: 47351567,
      languages: ['Spanish', 'Catalan'],
    });
  });

  it('returns an empty language list when the API language list is empty', () => {
    const rawCountry: RawCountryResponse = {
      name: 'Test Country',
      flag: '🏳️',
      capital: 'Test Capital',
      region: 'Test Region',
      population: 1000,
      languages: [],
    };

    const country = mapCountryResponse(rawCountry);

    expect(country.languages).toEqual([]);
  });

  it('does not change the source API object', () => {
    const rawCountry: RawCountryResponse = {
      name: 'Spain',
      flag: '🇪🇸',
      capital: 'Madrid',
      region: 'Europe',
      population: 47351567,
      languages: [{ name: 'Spanish' }],
    };
    const originalCountry = structuredClone(rawCountry);

    mapCountryResponse(rawCountry);

    expect(rawCountry).toEqual(originalCountry);
  });
});
