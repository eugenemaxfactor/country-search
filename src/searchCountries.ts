export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP error: ${status}`);
    this.name = 'HttpError';
  }
}

export async function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<unknown[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://countries.dev/name/${encodedQuery}`;
  const response = await fetch(url, { signal });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  const countries = (await response.json()) as unknown[];

  return countries;
}
