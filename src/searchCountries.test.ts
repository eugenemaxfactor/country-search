import { afterEach, describe, expect, it, vi } from 'vitest';

import { searchCountries } from './searchCountries.js';

describe('searchCountries', () => {
  afterEach(() => {
    vi.restoreAllMocks();
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

  it('combines user cancellation and timeout signals', async () => {
    const response = new Response(JSON.stringify([]), { status: 200 });
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(response);
    const controller = new AbortController();
    const timeoutController = new AbortController();
    const combinedController = new AbortController();
    const timeoutSpy = vi
      .spyOn(AbortSignal, 'timeout')
      .mockReturnValue(timeoutController.signal);
    const anySpy = vi
      .spyOn(AbortSignal, 'any')
      .mockReturnValue(combinedController.signal);

    vi.stubGlobal('fetch', fetchMock);

    await searchCountries('united states', controller.signal);

    expect(timeoutSpy).toHaveBeenCalledWith(10_000);
    expect(anySpy).toHaveBeenCalledWith([
      controller.signal,
      timeoutController.signal,
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://countries.dev/name/united%20states',
      { signal: combinedController.signal },
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
