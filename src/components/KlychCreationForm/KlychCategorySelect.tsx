import { KlychCategory } from "@/lib/enums/KlychCategory";
import { type Option, Select, type SelectProps } from "../Select/Select";

type Props = Omit<SelectProps<KlychCategory>, "options">;

const optionsDict: Record<KlychCategory, string> = {
  [KlychCategory.Military]: "Віськова",
  [KlychCategory.Education]: "Освіта",
  [KlychCategory.Ecology]: "Екологія",
  [KlychCategory.Animals]: "Тварини",
  [KlychCategory.Art]: "Мистецтво",
  [KlychCategory.Other]: "Інші",
};

const options: Option<KlychCategory>[] = Object.entries(optionsDict).map(
  (entry) => {
    const [value, label] = entry as [KlychCategory, string];
    return { value, label };
  },
);

export const KlychCategorySelect: React.FC<Props> = (props) => {
  return <Select options={options} label="Категорія" {...props} />;
};
