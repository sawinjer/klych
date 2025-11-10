"use client";

import { Search } from "lucide-react";
import type React from "react";
import { useSearchKlych } from "@/providers/SearchKlychProvider/SearchKlychProvider";
import { Input } from "../Input/Input";

export const KlychSearchInput: React.FC = () => {
  const { search, setSearch } = useSearchKlych();

  return (
    <Input
      value={search}
      onValueChange={setSearch}
      iconLeft={<Search size={15} />}
      placeholder="Пошук за ключовими словами..."
    />
  );
};
