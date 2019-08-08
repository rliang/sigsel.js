export interface Signal<T> { readonly value: T, put(v: T): void };

export function signal<T = null>(v: T): Signal<T>;

export function select<S extends Signal<unknown>[]>(...chs: S): Promise<S[number]>;
