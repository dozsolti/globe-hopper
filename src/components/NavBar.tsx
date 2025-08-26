import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import SearchCountries from "./search-countries";
import { Link } from "react-router";
import { SettingsIcon } from "lucide-react";
import type { MapRef } from "react-leaflet/MapContainer";

export default function Navbar({
  mapRef,
}: {
  mapRef: React.RefObject<MapRef>;
}) {
  return (
    <header className="border-b px-4 md:px-6 h-[64px] ">
      <div className="flex h-16 items-center justify-between gap-4 max-w-10/12 mx-auto">
        {/* Logo */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-primary hover:text-primary/90 flex gap-4"
          >
            <Logo />
            <span className="text-xl">Globe Hopper</span>
          </Link>
        </div>
        {/* Middle area */}
        <div className="grow max-sm:hidden">
          {/* Search form */}
          <div className="relative mx-auto w-full max-w-xs">
            <SearchCountries
              goToMap={(coords) =>
                mapRef.current?.flyTo(coords, 10, { duration: 1 })
              }
            />
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="sm" className="text-sm">
            <SettingsIcon />
            <Link to="/settings">Settings</Link>
          </Button>
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
}
