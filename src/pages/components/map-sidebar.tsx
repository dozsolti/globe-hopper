import { MapIcon, MapPin, SearchIcon, Sidebar, XIcon } from "lucide-react";
import { useStore } from "@/hooks/store";
import type { MapRef } from "react-leaflet/MapContainer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import MapSidebarHistory from "@/components/map-sidebar/map-sidebar-history";
import { useMapClicked } from "../hooks/useMapClicked";
import { Button } from "@/components/ui/button";

export default function MapSidebar({
  mapRef,
}: {
  mapRef: React.RefObject<MapRef>;
}) {
  const { coords, details, reset } = useMapClicked();

  const [searchTerm, setSearchTerm] = useState("");

  const { visitedList } = useStore();

  const filteredVisitedList = visitedList.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCitiesVisited = visitedList.length;
  const totalCountriesVisited = visitedList.reduce((acc, place) => {
    if (!acc.includes(place.country)) {
      acc.push(place.country);
    }
    return acc;
  }, [] as string[]).length;

  const showOnMap = (place: { lat: number; lng: number }) => {
    mapRef.current?.flyTo([place.lat, place.lng], 8, { animate: true });
  };

  if (coords) {
    if (!details) {
      return <p className="text-center text-gray-500">Loading...</p>;
    }
    if (!details.address)
      return <p className="text-center text-gray-500">Ocean</p>;
    return (
      <div className="p-8">
        <div className="flex">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {details.address.city || details.address.state || details.name}
            </h2>
            <p className="mb-2 text-zinc-400">{details.address.country}</p>
          </div>
          <XIcon className="ms-auto cursor-pointer" onClick={reset} />
        </div>
        <div className="h-px bg-gray-800 my-2" />
        <p className="mb-2">
          <strong>Location:</strong> {details.lat}, {details.lon}
        </p>
        <strong>Descripition:</strong>
        <br />
        <textarea></textarea>
        <br />
        <br />
        <strong>Date:</strong>
        <br />
        <input type="date" />
        <Button className="mt-4 w-full">Add to visited</Button>
        <div className="h-px bg-gray-800 my-2" />
        <pre>{JSON.stringify(details, null, 2)}</pre>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="flex text-xl mb-4 align-middle">
        <MapIcon className="me-2" />
        <p>History</p>
        <Sidebar className="ml-auto" />
      </div>
      <div className="flex mb-4 justify-around  text-center">
        <div className="flex flex-col text-3xl font-bold">
          {totalCitiesVisited}
          <span className="text-sm font-normal text-gray-400">cities</span>
        </div>
        <div className="flex flex-col text-3xl font-bold">
          {totalCountriesVisited}
          <span className="text-sm font-normal text-gray-400">countries</span>
        </div>
      </div>

      <div className="h-px bg-gray-800 my-4" />
      <div className="relative">
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
      <div className="h-px bg-gray-800 my-4" />
      <div className="flex gap-2 mb-4 text-xl align-middle">
        <MapPin />
        <p>Visited places</p>
      </div>
      {visitedList.length === 0 ? (
        <p className="text-center text-gray-500">No visited places yet.</p>
      ) : (
        <MapSidebarHistory
          places={filteredVisitedList}
          onPlaceClicked={(place) => showOnMap(place)}
        />
      )}
    </div>
  );
}
