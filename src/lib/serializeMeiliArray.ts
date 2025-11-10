export const serializeMeiliArray = (values: string[]) => {
  const singleColumn = /'/g;
  const slash = "\\";
  const valuesString = values
    .filter(Boolean)
    .map(
      (value) => `'${value.toString().replaceAll(singleColumn, `${slash}'`)}'`,
    )
    .join(", ");

  return `[${valuesString}]`;
};
