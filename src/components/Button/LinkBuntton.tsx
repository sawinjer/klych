import Link from "next/link";
import { LinkButtonProps } from "./Button.types";
import { getButtonClassName } from "./Button.utils";

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
	const { variant, children, ...rest } = props;

	return (
		<Link {...rest} className={getButtonClassName(variant, rest.className)}>
			{children}
		</Link>
	);
};
