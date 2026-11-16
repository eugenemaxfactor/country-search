const REQUEST_TIMEOUT_MS = 10_000;

export class HttpError extends Error {
  public readonly status: number;

  constructor(status: number) {
    super(`HTTP error: ${status}`);

    this.status = status;
    this.name = 'HttpError';
  }
}

export async function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<unknown[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://countries.dev/name/${encodedQuery}`;
  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const requestSignal = AbortSignal.any([signal, timeoutSignal]);
  const response = await fetch(url, { signal: requestSignal });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  const countries = (await response.json()) as unknown[];

  return countries;
}
