import { Check } from "lucide-react";
import { useId } from "react";
import type { BooleanState } from "@/lib/hooks/useBoolean";

interface Props {
  state: BooleanState;
  label?: string;
}

export const Checkbox: React.FC<Props> = (props) => {
  const id = useId();
  const state = props.state;

  return (
    <>
      <label
        htmlFor={id}
        className="flex items-center gap-2 cursor-pointer w-fit"
      >
        {props.label && <p>{props.label}</p>}
        <div className="w-[25px] aspect-square rounded-md border-1 border-white flex items-center justify-center">
          {state.state && <Check size={20} />}
        </div>
      </label>
      <input
        className="hidden"
        id={id}
        type="checkbox"
        checked={state.state}
        onChange={state.toggle}
      />
    </>
  );
};
