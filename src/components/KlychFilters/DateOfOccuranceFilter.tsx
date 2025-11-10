"use client";

import { useSearchKlych } from "@/providers/SearchKlychProvider/SearchKlychProvider";
import { Calendar24 } from "../ui/datepicker";
import { FilterWithTitle } from "./FilterWithTitle";

export const DateOfOccuranceFilter: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useSearchKlych();

  return (
    <FilterWithTitle title="Дата та час">
      <p>Починаючи з</p>
      <Calendar24 date={startDate} onDateChange={setStartDate} />
      <p>Закінчуючи</p>
      <Calendar24 date={endDate} onDateChange={setEndDate} />
    </FilterWithTitle>
  );
};
