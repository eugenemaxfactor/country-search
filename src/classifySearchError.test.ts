import { describe, expect, it } from 'vitest';

import { classifySearchError } from './classifySearchError';
import { HttpError } from './searchCountries';

describe('classifySearchError', () => {
  it('classifies a user cancellation as aborted', () => {
    const error = new DOMException('The request was aborted', 'AbortError');

    const errorType = classifySearchError(error);

    expect(errorType).toBe('aborted');
  });

  it('classifies a request timeout as timeout', () => {
    const error = new DOMException('The request timed out', 'TimeoutError');

    const errorType = classifySearchError(error);

    expect(errorType).toBe('timeout');
  });

  it('classifies an HttpError as http', () => {
    const error = new HttpError(500);

    const errorType = classifySearchError(error);

    expect(errorType).toBe('http');
  });

  it('classifies another error as unknown', () => {
    const error = new TypeError('Failed to fetch');

    const errorType = classifySearchError(error);

    expect(errorType).toBe('unknown');
  });
});
