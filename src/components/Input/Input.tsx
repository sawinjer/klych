"use client";

import React, { useState } from "react";
import { InputProps } from "./Input.types";
import { useHasValue, useInputId, useLabelStyles } from "./Input.utils";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { addSideEffect } from "@/lib/addSideEffect";
import { cx } from "@/lib/cx";
import { Eye, EyeOff } from "@deemlol/next-icons";

export const Input: React.FC<InputProps> = (props) => {
	const { label, onValueChange, error, ...rest } = props;
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
		<div className="flex flex-col gap-2">
			<div className="relative">
				{Boolean(label) && (
					<label htmlFor={id} className={labelClassName}>
						{Boolean(rest.required) && <sup className="text-red-500">*</sup>}
						{label}
					</label>
				)}
				<input
					{...rest}
					className={cx(
						"border-1 border-[#F7F4E3] rounded-xl min-h-[72px] px-6 pt-2 w-full",
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
			</div>
			{Boolean(error) && <span className="text-red-500">{error}</span>}
		</div>
	);
};
