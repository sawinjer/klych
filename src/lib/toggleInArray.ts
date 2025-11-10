export const toggleInArray = <T>(items: T[]) => {
  const defaultPredicate: Predicat<T> = (item1, item2) => item1 === item2;

  return {
    item(item: T, compare = defaultPredicate) {
      let shouldInsert = true;
      const result: T[] = [];

      for (const existingItem of items) {
        if (compare(item, existingItem)) {
          shouldInsert = false;

          continue;
        }

        result.push(existingItem);
      }

      if (shouldInsert) {
        return [...items, item];
      }

      return result;
    },
  };
};

type Predicat<T> = (item1: T, item2: T) => boolean;
