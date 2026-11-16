export function debounce(callback, delay) {
    let timeoutId;
    const debouncedCallback = (...arguments_) => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback(...arguments_);
        }, delay);
    };
    return debouncedCallback;
}
