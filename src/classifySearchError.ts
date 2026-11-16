export type SearchErrorType = 'aborted' | 'timeout' | 'http' | 'unknown';

export function classifySearchError(error: unknown): SearchErrorType {
  void error;

  throw new Error('Not implemented');
}
