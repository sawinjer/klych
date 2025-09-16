export function addSideEffect<Args extends any[], Return>(
  effect: () => void,
  mainFunction: (...args: Args) => Return,
): (...args: Args) => Return;

export function addSideEffect(
  effect: () => void,
  mainFunction: undefined,
): () => void;

export function addSideEffect<Args extends any[], Return>(
  effect: () => void,
  mainFunction: ((...args: Args) => Return) | undefined,
): ((...args: Args) => Return) | (() => void);

export function addSideEffect<Args extends any[], Return>(
  effect: (...args: Args) => Return,
  mainFunction: ((...args: Args) => Return) | undefined,
): (...args: Args) => Return;

export function addSideEffect<Args extends any[], Return>(
  effect: (() => void) | ((...args: Args) => Return),
  mainFunction: ((...args: Args) => Return) | undefined,
): ((...args: Args) => Return) | (() => void) {
  if (!mainFunction) {
    return effect;
  }

  return (...args: Args): Return => {
    effect(...args);
    return mainFunction(...args);
  };
}
