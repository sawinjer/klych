import type React from "react";

type HtmlProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export type InputProps = HtmlProps & {
  label?: string;
  type?: "text" | "password" | "email";
  required?: boolean;
  onValueChange?: (value: string) => void;
  error?: string;
};
