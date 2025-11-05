"use client";

import Link from "next/link";
import { LinkButtonProps } from "./Button.types";
import { getButtonClassName } from "./Button.utils";
import { usePathname } from "next/navigation";

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { variant, activeVariant, children, ...rest } = props;
  const pathname = usePathname();
  const currentVariant =
    pathname === rest.href && activeVariant ? activeVariant : variant;

  return (
    <Link
      {...rest}
      className={getButtonClassName(currentVariant, rest.className)}
    >
      {children}
    </Link>
  );
};
