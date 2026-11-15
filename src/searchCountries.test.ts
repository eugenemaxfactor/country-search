import { afterEach, describe, expect, it, vi } from 'vitest';

import { searchCountries } from './searchCountries';

describe('searchCountries', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns countries from a successful response', async () => {
    const countries = [{ name: 'Spain' }];
    const response = new Response(JSON.stringify(countries), { status: 200 });
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(response);
    const controller = new AbortController();

    vi.stubGlobal('fetch', fetchMock);

    const result = await searchCountries('spain', controller.signal);

    expect(result).toEqual(countries);
  });

  it('passes the encoded query and signal to fetch', async () => {
    const response = new Response(JSON.stringify([]), { status: 200 });
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(response);
    const controller = new AbortController();

    vi.stubGlobal('fetch', fetchMock);

    await searchCountries('united states', controller.signal);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://countries.dev/name/united%20states',
      { signal: controller.signal },
    );
  });

  it('returns an empty array when the response status is 404', async () => {
    const response = new Response(null, { status: 404 });
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(response);
    const controller = new AbortController();

    vi.stubGlobal('fetch', fetchMock);

    const result = await searchCountries('unknown', controller.signal);

    expect(result).toEqual([]);
  });

  it('throws an HttpError for other unsuccessful responses', async () => {
    const response = new Response(null, { status: 500 });
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(response);
    const controller = new AbortController();

    vi.stubGlobal('fetch', fetchMock);

    const searchPromise = searchCountries('spain', controller.signal);

    await expect(searchPromise).rejects.toMatchObject({
      name: 'HttpError',
      status: 500,
    });
  });
});
