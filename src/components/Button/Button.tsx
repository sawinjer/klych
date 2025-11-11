import styles from "./Button.styles.module.css";
import type { ButtonProps } from "./Button.types";
import { getButtonClassName } from "./Button.utils";
import { ButtonIcon } from "./ButtonIcon";

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant, icon, children, tooltip, ...rest } = props;

  return (
    <button {...rest} className={getButtonClassName(variant, rest.className)}>
      <ButtonIcon>{icon}</ButtonIcon>
      {children}
      {tooltip && <p className={styles.tooltip}>{tooltip}</p>}
    </button>
  );
};
