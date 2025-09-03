import { useId, useState } from "react";
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
import SearchResult from "./search-countries-result";

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
            className="justify-between bg-background hover:bg-background px-3 border-input outline-none focus-visible:outline-[3px] outline-offset-0 w-full font-normal"
          >
            {value ? (
              <span className="flex items-center gap-2 min-w-0">
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
          className="z-[99999] p-0 border-input w-full min-w-[var(--radix-popper-anchor-width)]"
          align="center"
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
