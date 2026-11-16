export function debounce<TArguments extends unknown[]>(
  callback: (...arguments_: TArguments) => void,
  delay: number,
): (...arguments_: TArguments) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedCallback = (...arguments_: TArguments): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...arguments_);
    }, delay);
  };

  return debouncedCallback;
}
