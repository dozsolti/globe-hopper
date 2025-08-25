import SearchCountries from "./search-countries";
import { Button } from "./ui/button";

export default function MapSearchBar() {
  return (
    <div className="absolute mx-auto bottom-0 p-2 m-4 z-[99999]">
      <div className="flex gap-4 bg-background p-4 z-[99999]">
        <SearchCountries />
        <Button className="self-end">Save</Button>
      </div>
    </div>
  );
}
