import Map from "@/pages/components/map";
import MapSidebar from "./components/map-sidebar";
import Navbar from "@/components/navbar";
import { useEffect, useRef } from "react";
import type { MapRef } from "react-leaflet/MapContainer";

export default function MapPage() {
  const mapRef = useRef<MapRef>(null);
  useEffect(() => {
    console.log(mapRef);
    mapRef?.current?.on("click", (e) => {
      console.log("Map clicked at", e.latlng);
      // setClickedLocation(e.latlng ? e.latlng.lng : null);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar mapRef={mapRef} />
      <div className="flex h-[calc(100vh-64px)]">
        <div className="left-0 w-1/2 md:w-2/5 lg:w-1/6 max-h-svh overflow-y-auto overflow-x-hidden">
          <MapSidebar mapRef={mapRef} />
        </div>
        <div className="relative w-1/2 md:w-3/5 lg:w-5/6 h-full">
          <Map ref={mapRef} />
        </div>
      </div>
    </div>
  );
}
