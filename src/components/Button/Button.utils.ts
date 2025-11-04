import { cx } from "@/lib/cx";
import { ButtonVariant } from "./Button.types";

export const getButtonClassName = (
  variant?: ButtonVariant,
  className?: string,
) => {
  return cx(
    "rounded-xl border border-solid py-5 px-8 font-bold cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed",
    variant === "outlined"
      ? "bg-transparent border-[#F7F4E3] text-[#F7F4E3] disabled:border-[#C4C1B1] disabled:text-[#C4C1B1]"
      : "bg-[#F7F4E3] text-background disabled:bg-[#C4C1B1] disabled:text-[#2A2A2A]",
    className,
  );
};
