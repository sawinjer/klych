export const copyTime = (from: Date, to: Date): Date => {
  const hours = from?.getHours();
  const minutes = from?.getMinutes();
  const seconds = from?.getSeconds();

  const result = new Date(to.getTime());

  if (hours !== undefined) {
    result.setHours(hours);
  }

  if (minutes !== undefined) {
    result.setMinutes(minutes);
  }

  if (seconds !== undefined) {
    result.setSeconds(seconds);
  }

  return result;
};
