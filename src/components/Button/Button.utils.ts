import { cx } from "@/lib/cx";
import { ButtonVariant } from "./Button.types";

export const getButtonClassName = (
  variant?: ButtonVariant,
  className?: string,
) => {
  return cx(
    "rounded-xl border-1 border-solid py-5 px-8 font-bold cursor-pointer",
    variant === "outlined"
      ? "bg-transparent border-[#F7F4E3] text-[#F7F4E3]"
      : "bg-[#F7F4E3] text-background",
    className,
  );
};
