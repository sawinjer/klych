import styles from "./Button.styles.module.css";
import type { ButtonProps } from "./Button.types";
import { getButtonClassName } from "./Button.utils";

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant, icon, children, tooltip, ...rest } = props;

  return (
    <button
      {...rest}
      className={getButtonClassName({
        variant,
        className: rest.className,
        hasIcon: !!icon,
      })}
    >
      {icon}
      {children}
      {!!icon && <span></span>}
      {tooltip && <p className={styles.tooltip}>{tooltip}</p>}
    </button>
  );
};
