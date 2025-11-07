import type { ButtonProps } from "./Button.types";
import { getButtonClassName } from "./Button.utils";
import { ButtonIcon } from "./ButtonIcon";

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant, icon, children, ...rest } = props;

  return (
    <button {...rest} className={getButtonClassName(variant, rest.className)}>
      <ButtonIcon>{icon}</ButtonIcon>
      {children}
    </button>
  );
};
