import Navbar from "@/components/navbar";
import { useRef } from "react";
import type { MapRef } from "react-leaflet/MapContainer";
import MapComponent from "./components/map-component";
import MapSidebar from "./components/map-sidebar";
import SearchCountries from "@/components/search-countries";
import { useMapClicked } from "@/hooks/useMapClicked";
import type { LatLngArray } from "@/types";

export default function MapPage() {
  const mapRef = useRef<MapRef>(null);
  const { setCoords, loadDetails } = useMapClicked();

  const goToCoords = (coords: LatLngArray) => {
    mapRef.current?.flyTo(coords, 8, { animate: true });
  };

  return (
    <div className="min-h-screen">
      <Navbar>
        <div className="grow max-sm:hidden relative mx-auto w-full max-w-xs">
          <SearchCountries
            goToMap={(coords) => {
              goToCoords(coords);
              setCoords(coords);
              loadDetails();
            }}
          />
        </div>
      </Navbar>
      <div className="flex h-[calc(100vh-64px)]">
        <div className="left-0 min-w-1/6 max-h-svh overflow-y-auto overflow-x-hidden">
          <MapSidebar goToCoords={goToCoords} />
        </div>
        <div className="relative flex-1 h-full">
          <MapComponent ref={mapRef} />
        </div>
      </div>
    </div>
  );
}
