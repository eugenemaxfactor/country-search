import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce.js';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays the callback until the delay has elapsed', () => {
    const callback = vi.fn();
    const debouncedCallback = debounce(callback, 300);

    debouncedCallback();
    vi.advanceTimersByTime(299);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledOnce();
  });

  it('resets the timer when called again before the delay elapses', () => {
    const callback = vi.fn();
    const debouncedCallback = debounce(callback, 300);

    debouncedCallback();
    vi.advanceTimersByTime(200);
    debouncedCallback();
    vi.advanceTimersByTime(299);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledOnce();
  });

  it('calls the callback with the latest arguments', () => {
    const callback = vi.fn<(query: string) => void>();
    const debouncedCallback = debounce(callback, 300);

    debouncedCallback('spa');
    debouncedCallback('spain');
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith('spain');
  });
});
