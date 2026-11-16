import { classifySearchError } from './classifySearchError.js';
import { debounce } from './debounce.js';
import { mapCountryResponse } from './mapCountryResponse.js';
import { searchCountries } from './searchCountries.js';
export function createCountrySearchHandler(onResults, onError, delay) {
    let activeController;
    const runSearch = async (query) => {
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
        }
        catch (error) {
            const errorType = classifySearchError(error);
            if (errorType !== 'aborted') {
                onError(error);
            }
        }
    };
    const debouncedSearch = debounce(runSearch, delay);
    const handleSearchInput = (query) => {
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
