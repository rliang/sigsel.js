/**
 * A signal is a function
 * which resolves all select calls waiting on it.
 */
export interface Signal {
  (_?: any): void;
}

/**
 * Creates a signal.
 */
export function signal(): Signal;

/**
 * Waits for the first called signal.
 */
export function select(...sigs: Signal[]): Promise<Signal>;
