import { classifySearchError } from './classifySearchError.js';
import { debounce } from './debounce.js';
import { mapCountryResponse, type Country } from './mapCountryResponse.js';
import { searchCountries } from './searchCountries.js';

export type ResultsHandler = (countries: Country[]) => void;
export type ErrorHandler = (error: unknown) => void;

export function createCountrySearchHandler(
  onResults: ResultsHandler,
  onError: ErrorHandler,
  delay: number,
): (query: string) => void {
  let activeController: AbortController | undefined;

  const runSearch = async (query: string): Promise<void> => {
    if (query === '') {
      return;
    }

    const controller = new AbortController();
    activeController = controller;

    try {
      const rawCountries = await searchCountries(query, controller.signal);
      const countries = rawCountries.map((rawCountry) => {
        const country = mapCountryResponse(rawCountry);

        return country;
      });

      onResults(countries);
    } catch (error) {
      const errorType = classifySearchError(error);

      if (errorType !== 'aborted') {
        onError(error);
      }
    }
  };

  const debouncedSearch = debounce(runSearch, delay);

  const handleSearchInput = (query: string): void => {
    if (activeController !== undefined) {
      activeController.abort();
    }

    const normalizedQuery = query.trim();

    if (normalizedQuery === '') {
      onResults([]);
    }

    debouncedSearch(normalizedQuery);
  };

  return handleSearchInput;
}
