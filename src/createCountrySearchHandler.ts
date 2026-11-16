import { classifySearchError } from './classifySearchError';
import { debounce } from './debounce';
import { searchCountries } from './searchCountries';

export type ResultsHandler = (countries: unknown[]) => void;
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
      const countries = await searchCountries(query, controller.signal);

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
