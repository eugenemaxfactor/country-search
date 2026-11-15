export function debounce<TArguments extends unknown[]>(
  callback: (...arguments_: TArguments) => void,
  delay: number,
): (...arguments_: TArguments) => void {
  void callback;
  void delay;

  throw new Error('Not implemented');
}
