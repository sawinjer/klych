import type React from "react";

type HtmlProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export type InputProps<T extends Suggestion> = HtmlProps & {
  label?: string;
  type?: "text" | "password" | "email" | "number";
  required?: boolean;
  onValueChange?: (value: string) => void;
  error?: string;
  suggestions?: T[];
  onSuggestionPick?: (suggestion: T) => void;
};

export type Suggestion = {
  name: string;
};
