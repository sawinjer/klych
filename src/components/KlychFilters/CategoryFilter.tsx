"use client";

import type { KlychCategory } from "@/lib/enums/KlychCategory";
import { toggleInArray } from "@/lib/toggleInArray";
import { useSearchKlych } from "@/providers/SearchKlychProvider/SearchKlychProvider";
import { Checkbox } from "../Checkbox/Checkbox";
import { categoriesOptions } from "../KlychCreationForm/KlychCategorySelect";
import { FilterWithTitle } from "./FilterWithTitle";

export const CategoryFilter: React.FC = () => {
  const { categories, setCategories } = useSearchKlych();

  const toggleCategory = (category: KlychCategory) => () => {
    setCategories((prevCategory) => toggleInArray(prevCategory).item(category));
  };

  return (
    <FilterWithTitle title="Тематика">
      <div className="flex flex-col gap-1.5 max-w-[240px]">
        {categoriesOptions.map((option) => (
          <Checkbox
            value={categories.includes(option.value)}
            label={option.label}
            key={option.value}
            onToggle={toggleCategory(option.value)}
            className="w-full justify-between"
          />
        ))}
      </div>
    </FilterWithTitle>
  );
};
