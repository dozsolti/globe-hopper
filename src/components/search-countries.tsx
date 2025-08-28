"use client";

import { useEffect, useId, useState } from "react";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { defaultCities } from "@/data/cities";
import { Input } from "./ui/input";
import type { City } from "@/types";

export default function SearchCountries({
  goToMap,
}: {
  goToMap: (coords: [number, number]) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const [allCities, setAllCities] = useState<City[]>(defaultCities);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">{value}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">Search for a city</span>
            )}
            <SearchIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0 z-[99999]"
          align="start"
        >
          <Input
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchResult
            allCities={allCities}
            setAllCities={setAllCities}
            searchTerm={searchTerm.toLowerCase()}
            onSelect={(city) => {
              setValue(city.n);
              setOpen(false);
              goToMap([city.c[0], city.c[1]]);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const MIN_CHAR_SEARCH = 3;
const CITIES_CACHE = new Map<string, City[]>();
function SearchResult({
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
    <div className="max-h-64 overflow-auto">
      {cities.length == 0 ? (
        searchTerm.length >= MIN_CHAR_SEARCH ? (
          <div className="p-4 text-zinc-500">No city found.</div>
        ) : null
      ) : (
        //TODO: replace with react-window
        cities.map((city) => (
          <div
            key={city.i}
            className="flex p-2 gap-4 border-b-2 items-center cursor-pointer hover:bg-accent"
            onClick={() => {
              onSelect(city);
            }}
          >
            <span className="text-xs leading-none text-muted-foreground">
              {city.p}
            </span>
            {city.n}
          </div>
        ))
      )}

      {searchTerm.length > 0 && searchTerm.length < MIN_CHAR_SEARCH ? (
        <div className="p-4 text-zinc-500">
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
