import { searchKlychs } from "@/actions/searchKlychs";
import { SearchKlychProvider } from "./SearchKlychProvider";

export const SearchKlychProviderWithServerProps: React.FC<
  React.PropsWithChildren
> = async (props) => {
  const initResponse = await searchKlychs({ search: "", categories: [] }, 1);

  if (!initResponse) {
    return null;
  }

  return (
    <SearchKlychProvider initResponse={initResponse}>
      {props.children}
    </SearchKlychProvider>
  );
};
