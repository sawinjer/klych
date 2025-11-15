type Result<R> = [R, null] | [null, Error];

export const safeTryPromise = async <R>(
  promise: Promise<R>,
): Promise<Result<R>> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (err) {
    return [null, err as Error];
  }
};
