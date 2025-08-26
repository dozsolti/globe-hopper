"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cities } from "@/data/cities";

export default function SearchCountries({
  goToMap,
}: {
  goToMap: (coords: [number, number]) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

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
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0  z-[99999]"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search cities..." />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              {cities.slice(0, 10).map((city) => (
                <CommandItem
                  key={city.i}
                  value={city.n}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    goToMap([city.c[0], city.c[1]]);
                  }}
                >
                  <span className="text-xs leading-none text-muted-foreground">
                    {city.p}
                  </span>{" "}
                  {city.n}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
