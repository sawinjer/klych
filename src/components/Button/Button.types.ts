import { LinkProps } from "next/link";
import React from "react";

export type ButtonVariant = "contained" | "outlined";

export type ButtonProps = React.PropsWithChildren<{
  variant?: ButtonVariant;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type LinkButtonProps = React.PropsWithChildren<{
  variant?: ButtonVariant;
}> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps<any>> &
  LinkProps<any>;
