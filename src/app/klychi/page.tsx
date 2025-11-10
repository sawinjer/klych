import { KlychFeed } from "@/components/KlychFeed/KlychFeed";
import { KlychFilters } from "@/components/KlychFilters/KlychFilters";
import { KlychSearchInput } from "@/components/KlychSearchInput/KlychSearchInput";
import { SearchKlychProvider } from "@/providers/SearchKlychProvider/SearchKlychProvider";

const KlychsList = () => {
  return (
    <SearchKlychProvider>
      <div className="flex flex-col gap-10 px-10">
        <KlychSearchInput />
        <div className="flex gap-10">
          <KlychFilters />
          <KlychFeed />
        </div>
      </div>
    </SearchKlychProvider>
  );
};

export default KlychsList;
