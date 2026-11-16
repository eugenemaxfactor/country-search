import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCountrySearchHandler } from './createCountrySearchHandler';

describe('createCountrySearchHandler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('starts a request only after the debounce delay', async () => {
    const response = new Response(JSON.stringify([]), { status: 200 });
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(response);
    const onResults = vi.fn();
    const onError = vi.fn();

    vi.stubGlobal('fetch', fetchMock);

    const handleSearchInput = createCountrySearchHandler(
      onResults,
      onError,
      300,
    );

    handleSearchInput('spain');
    await vi.advanceTimersByTimeAsync(299);

    expect(fetchMock).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);

    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('aborts the active request immediately after new input', async () => {
    let requestSignal: AbortSignal | undefined;
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockImplementation((_url, options) => {
        requestSignal = options?.signal ?? undefined;

        return new Promise((_resolve, reject) => {
          requestSignal?.addEventListener('abort', () => {
            reject(requestSignal?.reason);
          });
        });
      });
    const handleSearchInput = createCountrySearchHandler(vi.fn(), vi.fn(), 300);

    vi.stubGlobal('fetch', fetchMock);

    handleSearchInput('sp');
    await vi.advanceTimersByTimeAsync(300);
    handleSearchInput('spain');

    expect(requestSignal?.aborted).toBe(true);
  });

  it('clears results and does not request an empty query', async () => {
    const fetchMock = vi.fn<typeof fetch>();
    const onResults = vi.fn();
    const handleSearchInput = createCountrySearchHandler(
      onResults,
      vi.fn(),
      300,
    );

    vi.stubGlobal('fetch', fetchMock);

    handleSearchInput('spa');
    handleSearchInput('');
    await vi.advanceTimersByTimeAsync(300);

    expect(onResults).toHaveBeenCalledWith([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not report AbortError to the error handler', async () => {
    const abortError = new DOMException(
      'The request was aborted',
      'AbortError',
    );
    const fetchMock = vi.fn<typeof fetch>().mockRejectedValue(abortError);
    const onError = vi.fn();
    const handleSearchInput = createCountrySearchHandler(vi.fn(), onError, 300);

    vi.stubGlobal('fetch', fetchMock);

    handleSearchInput('spain');
    await vi.advanceTimersByTimeAsync(300);

    expect(onError).not.toHaveBeenCalled();
  });

  it('reports another error to the error handler', async () => {
    const networkError = new TypeError('Failed to fetch');
    const fetchMock = vi.fn<typeof fetch>().mockRejectedValue(networkError);
    const onError = vi.fn();
    const handleSearchInput = createCountrySearchHandler(vi.fn(), onError, 300);

    vi.stubGlobal('fetch', fetchMock);

    handleSearchInput('spain');
    await vi.advanceTimersByTimeAsync(300);

    expect(onError).toHaveBeenCalledWith(networkError);
  });

  it('keeps only the latest result when requests finish out of order', async () => {
    let resolveFirstRequest: (response: Response) => void = () => undefined;
    let rejectFirstRequest: (reason: unknown) => void = () => undefined;
    let resolveSecondRequest: (response: Response) => void = () => undefined;
    let firstRequestSignal: AbortSignal | undefined;

    const firstRequest = new Promise<Response>((resolve, reject) => {
      resolveFirstRequest = resolve;
      rejectFirstRequest = reject;
    });
    const secondRequest = new Promise<Response>((resolve) => {
      resolveSecondRequest = resolve;
    });
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockImplementationOnce((_url, options) => {
        firstRequestSignal = options?.signal ?? undefined;
        firstRequestSignal?.addEventListener('abort', () => {
          rejectFirstRequest(firstRequestSignal?.reason);
        });

        return firstRequest;
      })
      .mockImplementationOnce(() => secondRequest);
    const onResults = vi.fn();
    const onError = vi.fn();
    const handleSearchInput = createCountrySearchHandler(
      onResults,
      onError,
      300,
    );

    vi.stubGlobal('fetch', fetchMock);

    handleSearchInput('sp');
    await vi.advanceTimersByTimeAsync(300);

    handleSearchInput('spain');
    await vi.advanceTimersByTimeAsync(300);

    const latestCountries = [{ name: 'Spain' }];
    const latestResponse = new Response(JSON.stringify(latestCountries), {
      status: 200,
    });

    resolveSecondRequest(latestResponse);
    await vi.advanceTimersByTimeAsync(0);

    const oldCountries = [{ name: 'Old result' }];
    const oldResponse = new Response(JSON.stringify(oldCountries), {
      status: 200,
    });

    resolveFirstRequest(oldResponse);
    await vi.advanceTimersByTimeAsync(0);

    expect(firstRequestSignal?.aborted).toBe(true);
    expect(onResults).toHaveBeenCalledOnce();
    expect(onResults).toHaveBeenCalledWith(latestCountries);
    expect(onError).not.toHaveBeenCalled();
  });
});
