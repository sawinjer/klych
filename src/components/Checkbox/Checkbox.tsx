import { cx } from "@/lib/cx";
import { Check } from "lucide-react";
import { useId } from "react";

interface Props {
  onToggle: () => void;
  value: boolean;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<Props> = (props) => {
  const id = useId();
  const { value, onToggle } = props;

  return (
    <>
      <label
        htmlFor={id}
        className={cx(
          "flex items-center gap-2 cursor-pointer w-fit",
          props.className,
        )}
      >
        {props.label && <p>{props.label}</p>}
        <div className="w-[25px] aspect-square rounded-md border-1 border-white flex items-center justify-center">
          {value && <Check size={20} />}
        </div>
      </label>
      <input
        className="hidden"
        id={id}
        type="checkbox"
        checked={value}
        onChange={onToggle}
      />
    </>
  );
};
