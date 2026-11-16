import { HttpError } from './searchCountries.js';
export function classifySearchError(error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
        return 'aborted';
    }
    if (error instanceof DOMException && error.name === 'TimeoutError') {
        return 'timeout';
    }
    if (error instanceof HttpError) {
        return 'http';
    }
    return 'unknown';
}
