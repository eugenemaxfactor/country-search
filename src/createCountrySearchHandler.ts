export type ResultsHandler = (countries: unknown[]) => void;
export type ErrorHandler = (error: unknown) => void;

export function createCountrySearchHandler(
  onResults: ResultsHandler,
  onError: ErrorHandler,
  delay: number,
): (query: string) => void {
  void onResults;
  void onError;
  void delay;

  const handleSearchInput = (query: string): void => {
    void query;

    throw new Error('Not implemented');
  };

  return handleSearchInput;
}
