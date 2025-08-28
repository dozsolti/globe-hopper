import { XIcon } from "lucide-react";
import { useMapClicked } from "../../../hooks/useMapClicked";
import type { LatLngArray } from "@/types";
import MapSidebarStats from "./map-sidebar/map-sidebar-stats";
import MapSidebarHistory from "./map-sidebar/map-sidebar-history";
import LocationDetails from "./map-sidebar/location-details";

export default function MapSidebar({
  goToCoords,
}: {
  goToCoords: (coords: LatLngArray) => void;
}) {
  const { coords, details, clear: reset } = useMapClicked();

  if (coords) {
    if (!details) {
      return (
        <div className="relative p-4">
          <p className="text-center text-gray-500">Loading...</p>
          <XIcon
            className="absolute top-5 right-5 ms-auto cursor-pointer"
            onClick={reset}
          />
        </div>
      );
    }
    if (!details.address)
      return (
        <div className="relative p-4">
          <p className="text-center text-gray-500">No data.</p>
          <pre className="text-muted text-sm">
            {JSON.stringify(details, null, 2)}
          </pre>
          <XIcon
            className="absolute top-5 right-5 ms-auto cursor-pointer"
            onClick={reset}
          />
        </div>
      );
    return (
      <div className="relative">
        <XIcon
          className="absolute top-5 right-5 ms-auto cursor-pointer"
          onClick={reset}
        />
        <LocationDetails />
      </div>
    );
  }

  return (
    <div className="relative p-5">
      {/* <SidebarIcon className="absolute top-5 right-5" /> */}

      <MapSidebarStats />

      <div className="h-px bg-gray-800 my-4" />

      <MapSidebarHistory goToCoords={goToCoords} />
    </div>
  );
}
