import { ButtonProps } from "./Button.types";
import { getButtonClassName } from "./Button.utils";

export const Button: React.FC<ButtonProps> = (props) => {
	const { variant, children, ...rest } = props;

	return (
		<button {...rest} className={getButtonClassName(variant, rest.className)}>
			{children}
		</button>
	);
};
