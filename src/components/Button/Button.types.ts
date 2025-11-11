import type { LinkProps } from "next/link";
import type React from "react";

export type ButtonVariant = "contained" | "outlined";

export type ButtonProps = React.PropsWithChildren<{
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  tooltip?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type LinkButtonProps = React.PropsWithChildren<{
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  activeVariant?: ButtonVariant;
}> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps;
