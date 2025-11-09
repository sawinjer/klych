import { cx } from "@/lib/cx";
import type { Suggestion } from "./Input.types";

type Props<T extends Suggestion> = {
  suggestions: T[];
  onPick?: (suggestion: T) => void;
};

export const SuggestionsList = <T extends Suggestion>(props: Props<T>) => {
  const { suggestions } = props;

  const onPick = (suggestion: T) => () => {
    props.onPick?.(suggestion);
  };

  if (!suggestions.length) {
    return null;
  }

  return (
    <ul className="absolute -bottom-2 right-0 left-0 translate-y-full bg-[#373737] rounded-md max-h-[250px] overflow-auto">
      {suggestions.map((suggestion, index) => (
        <li key={suggestion.name}>
          <button
            type="button"
            className={cx(
              "w-full text-left cursor-pointer p-3 rounded-md hover:bg-[rgba(255,255,255,0.3)]",
              index + 1 !== suggestions.length &&
                "border-b-1 border-white rounded-b-none",
              index !== 0 && "rounded-t-none",
            )}
            onClick={onPick(suggestion)}
          >
            {suggestion.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
