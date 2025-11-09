"use client";

import type React from "react";
import { addSideEffect } from "@/lib/addSideEffect";
import { cx } from "@/lib/cx";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { useWeakState } from "@/lib/hooks/useWeakState";
import { useInputId, useLabelStyles } from "../Input/Input.utils";

export type Option<T = string> = {
  label: string;
  value: T;
};

export type SelectProps<T extends string = string> = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label?: string;
  required?: boolean;
  value?: T;
  onValueChange?: (value: T) => void;
  error?: string;
  options: Option<T>[];
};

export const Select = <T extends string = string>(props: SelectProps<T>) => {
  const { label, onValueChange, error, options, ...rest } = props;
  const id = useInputId(props.id);
  const focused = useBoolean();
  const [hasValue, setHasValue] = useWeakState(!!props.value);
  const labelClassName = useLabelStyles(focused.state, !!hasValue);

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    setHasValue(!!value);
    onValueChange?.(value as T);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative">
        {Boolean(label) && (
          <label htmlFor={id} className={labelClassName}>
            {Boolean(rest.required) && <sup className="text-red-500">*</sup>}
            {label}
          </label>
        )}

        <select
          {...rest}
          id={id}
          onChange={addSideEffect(onChange, props.onChange)}
          onFocus={addSideEffect(focused.setTrue, props.onFocus)}
          onBlur={addSideEffect(focused.setFalse, props.onBlur)}
          className={cx(
            "border border-[#F7F4E3] rounded-xl min-h-[48px] pl-2 pt-2 w-full appearance-none cursor-pointer transition-colors duration-200",
            "disabled:cursor-not-allowed disabled:border-[#C4C1B1] disabled:text-gray-300",
            error && "border-red-500",
            rest.className,
          )}
        >
          <option value="" hidden></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {Boolean(error) && <span className="text-red-500">{error}</span>}
    </div>
  );
};
