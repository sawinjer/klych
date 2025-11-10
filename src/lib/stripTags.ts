export const stripTags = (value: string) => {
  return value.replaceAll(/(<([^>]+)>)/gi, "");
};
