import { rejects } from "node:assert";

type F<A extends unknown[], R> = (...args: A) => R;
type Resolve<R> = (value: R) => void;

export const debounce = <A extends unknown[], R>(
  func: F<A, R>,
  wait: number,
): F<A, Promise<R>> => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let locked = false;
  const resolves: Resolve<R>[] = [];
  const rejected: Resolve<unknown>[] = [];

  const debounced = (...args: A) => {
    if (locked) {
      return new Promise<R>((res, rej) => {
        resolves.push(res);
        rejected.push(rej);
      });
    }

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    return new Promise<R>((res, rej) => {
      timeout = setTimeout(async () => {
        try {
          locked = true;
          const result = await func(...args);
          res(result);
          resolves.forEach((res) => res(result));
        } catch (err) {
          rej(err);
          rejected.forEach((rej) => rej(err));
        } finally {
          locked = false;
        }
      }, wait);
    });
  };

  return debounced;
};
