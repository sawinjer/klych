import type { Option } from "@/components/Select/Select";
import { Gender } from "@/lib/enums/Gender";

export const gendersOptions: Option<Gender>[] = [
  { label: "Чоловік", value: Gender.Male },
  { label: "Жінка", value: Gender.Female },
];
