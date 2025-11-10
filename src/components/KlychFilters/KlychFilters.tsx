import { CategoryFilter } from "./CategoryFilter";
import { DateOfOccuranceFilter } from "./DateOfOccuranceFilter";
import { LocationFilter } from "./LocationFilter";

export const KlychFilters: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <LocationFilter />
      <CategoryFilter />
      <DateOfOccuranceFilter />
    </div>
  );
};
