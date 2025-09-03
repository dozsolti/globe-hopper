import { useEffect } from "react";
import { defaultCities } from "@/data/cities";
import type { City } from "@/types";
import { FixedSizeList } from "react-window";

const MIN_CHAR_SEARCH = 3;
const CITIES_CACHE = new Map<string, City[]>();
export default function SearchResult({
  searchTerm,
  onSelect,
  allCities,
  setAllCities,
}: {
  searchTerm: string;

  allCities: City[];
  setAllCities: (cities: City[]) => void;

  onSelect: (city: City) => void;
}) {
  const cities = allCities.filter((x) =>
    x.n.toLowerCase().startsWith(searchTerm)
  );

  useEffect(() => {
    if (searchTerm.length == MIN_CHAR_SEARCH) {
      if (CITIES_CACHE.has(searchTerm))
        setAllCities(CITIES_CACHE.get(searchTerm) || []);
      // TODO: cache this using useQuery +isLoading/isError
      else
        fetch("./cities/" + searchTerm + ".json")
          .then((res) => res.json())
          .then((data: City[]) => {
            CITIES_CACHE.set(searchTerm, data);
            setAllCities(data);
          });
    } else if (searchTerm.length < MIN_CHAR_SEARCH) {
      setAllCities(defaultCities);
    }
  }, [searchTerm, setAllCities]);

  return (
    <div className="">
      {cities.length == 0 ? (
        searchTerm.length >= MIN_CHAR_SEARCH ? (
          <div className="p-4 text-zinc-500">No city found.</div>
        ) : null
      ) : (
        <FixedSizeList
          height={256}
          width={"100%"}
          itemCount={cities.length}
          itemSize={50}
        >
          {({ index, style }) => (
            <div
              style={style}
              key={cities[index].i}
              className="flex items-center gap-4 hover:bg-accent p-2 border-b-2 cursor-pointer"
              onClick={() => {
                onSelect(cities[index]);
              }}
            >
              <span className="text-muted-foreground text-xs leading-none">
                {cities[index].p}
              </span>
              {cities[index].n}
            </div>
          )}
        </FixedSizeList>
      )}

      {searchTerm.length > 0 && searchTerm.length < MIN_CHAR_SEARCH ? (
        <div className="p-4 max-w-[60vw] text-zinc-500">
          For more results keep typing{" "}
          <span className="text-sm">
            ({MIN_CHAR_SEARCH - searchTerm.length}{" "}
            {MIN_CHAR_SEARCH - searchTerm.length == 1
              ? "more"
              : "more characters"}
            )
          </span>
          ...
        </div>
      ) : null}
    </div>
  );
}
