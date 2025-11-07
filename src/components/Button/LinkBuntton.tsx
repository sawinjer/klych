"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkButtonProps } from "./Button.types";
import { getButtonClassName } from "./Button.utils";
import { ButtonIcon } from "./ButtonIcon";

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { variant, icon, activeVariant, children, ...rest } = props;
  const pathname = usePathname();
  const currentVariant =
    pathname === rest.href && activeVariant ? activeVariant : variant;

  return (
    <Link
      {...rest}
      className={getButtonClassName(currentVariant, rest.className)}
    >
      <ButtonIcon>{icon}</ButtonIcon>
      {children}
    </Link>
  );
};
