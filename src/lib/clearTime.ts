export const clearTime = (date: Date) => {
  const result = new Date(date.getTime());

  result.setHours(0);
  result.setMinutes(0);
  result.setSeconds(0);

  return result;
};
