import { KlychFeed } from "@/components/KlychFeed/KlychFeed";
import { KlychFilters } from "@/components/KlychFilters/KlychFilters";
import { KlychSearchInput } from "@/components/KlychSearchInput/KlychSearchInput";
import { SearchKlychProviderWithServerProps } from "@/providers/SearchKlychProvider/SearchKlychProviderWithServerProps";

export const dynamic = "force-dynamic";

const KlychsList = () => {
  return (
    <SearchKlychProviderWithServerProps>
      <div className="flex flex-col gap-10 px-10">
        <KlychSearchInput />
        <div className="flex gap-10">
          <KlychFilters />
          <KlychFeed />
        </div>
      </div>
    </SearchKlychProviderWithServerProps>
  );
};

export default KlychsList;
