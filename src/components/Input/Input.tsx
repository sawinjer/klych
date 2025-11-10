"use client";

import { Eye, EyeOff } from "@deemlol/next-icons";
import type React from "react";
import { useState } from "react";
import { addSideEffect } from "@/lib/addSideEffect";
import { cx } from "@/lib/cx";
import { useBoolean } from "@/lib/hooks/useBoolean";
import type { InputProps, Suggestion } from "./Input.types";
import { useHasValue, useInputId, useLabelStyles } from "./Input.utils";
import { SuggestionsList } from "./SuggestionsList";

export const Input = <T extends Suggestion>(props: InputProps<T>) => {
  const {
    label,
    onValueChange,
    error,
    suggestions,
    onSuggestionPick,
    iconLeft,
    ...rest
  } = props;
  const id = useInputId(props.id);
  const [type, setType] = useState(rest.type || "text");
  const focused = useBoolean();
  const [hasValue, handleHasValue] = useHasValue(Boolean(rest.value));
  const labelClassName = useLabelStyles(focused.state, hasValue);

  const onInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    onValueChange?.(target.value);
  };

  const toggleType = () => {
    setType((prevType) => {
      if (prevType === "password") {
        return "text";
      }

      return "password";
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className={
        cx(
          "flex gap-2 items-center relative pl-2",
          "border border-[#F7F4E3] transition-colors duration-200 rounded-xl h-[48px]",
          focused.state && "border-ring ring-ring/50 ring-[3px]",
          rest.disabled && "cursor-not-allowed border-[#C4C1B1] text-gray-300"
        )
      }>
        {Boolean(label) && (
          <label htmlFor={id} className={labelClassName}>
            {Boolean(rest.required) && <sup className="text-red-500">*</sup>}
            {label}
          </label>
        )}
        {iconLeft}
        <input
          {...rest}
          className={cx(
            "w-full outline-none",
            label && "pt-2",
            rest.type === "password" && "pr-12",
            error && "border-red-500",
            rest.className,
          )}
          onFocus={addSideEffect(focused.setTrue, props.onFocus)}
          onBlur={addSideEffect(focused.setFalse, props.onBlur)}
          onInput={addSideEffect(
            onInput,
            addSideEffect(handleHasValue, props.onInput),
          )}
          type={type}
          id={id}
        />
        {(focused.state || hasValue) && rest.type === "password" && (
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
            onClick={toggleType}
            type="button"
          >
            {type === "password" ? <Eye /> : <EyeOff />}
          </button>
        )}
        {suggestions && (
          <SuggestionsList
            suggestions={suggestions}
            onPick={onSuggestionPick}
          />
        )}
      </div>
      {Boolean(error) && <span className="text-red-500">{error}</span>}
    </div>
  );
};
