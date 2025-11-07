import type React from "react";

export const ButtonIcon: React.FC<React.PropsWithChildren> = (props) => {
  if (!props.children) {
    return null;
  }

  return (
    <div className="absolute left-2 top-0 bottom-0 flex items-center">
      {props.children}
    </div>
  );
};
