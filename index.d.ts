/**
 * An unbuffered signal.
 */
export interface Signal<T> {
  /**
   * The signal's current value.
   */
  readonly value: T;
  /**
   * Updates the signal's value.
   *
   * @param v the new signal's value.
   */
  put(v: T): void;
}

/**
 * Creates a signal.
 *
 * @param v the signal's initial value.
 */
export function signal<T = null>(v: T): Signal<T>;

/**
 * Waits for a given set of signals to update.
 *
 * @param sigs the signals to await.
 * @return p promise that resolves to the first updated signal.
 */
export function select<S extends Signal<unknown>[]>(
  ...sigs: S
): Promise<S[number]>;
