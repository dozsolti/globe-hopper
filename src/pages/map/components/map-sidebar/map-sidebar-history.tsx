import { useStore } from "@/hooks/useStore";
import { Input } from "@/components/ui/input";
import { MapPinIcon, SearchIcon } from "lucide-react";
import MapSidebarHistoryList from "./map-sidebar-history-list";
import { useState } from "react";
import type { LatLngArray } from "@/types";

export default function MapSidebarHistory({
  goToCoords,
}: {
  goToCoords: (coords: LatLngArray) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const { visitedList } = useStore();

  const filteredVisitedList = visitedList.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex gap-2 mb-4 text-xl align-middle">
        <MapPinIcon />
        <p>Visited places</p>
      </div>
      
      {visitedList.length === 0 ? (
        <p className="text-center text-gray-500">No visited places yet.</p>
      ) : (
        <>
          <div className="relative mb-4">
            <Input
              className="peer ps-9 pe-9"
              placeholder="Search in history..."
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
          </div>

          <MapSidebarHistoryList
            places={filteredVisitedList}
            onPlaceClicked={(place) => goToCoords([place.lat, place.lng])}
          />
        </>
      )}
    </>
  );
}
