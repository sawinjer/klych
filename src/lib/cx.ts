import { twMerge } from "tailwind-merge";
type ClassName = string | number | boolean | null | undefined | ClassName[];

export const cx = (...classNames: ClassName[]) => {
  return twMerge(classNames.flat().filter(Boolean).join(" "));
};
