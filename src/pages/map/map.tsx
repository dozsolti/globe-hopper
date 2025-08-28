import Navbar from "@/components/navbar";
import { createRef, useRef } from "react";
import type { MapRef } from "react-leaflet/MapContainer";
import MapComponent from "./components/map-component";
import MapSidebar from "./components/map-sidebar";
import SearchCountries from "@/components/search-countries";
import { useMapClicked } from "@/hooks/useMapClicked";
import type { LatLngArray } from "@/types";
import { useStore } from "@/hooks/useStore";
import PlaceMarker from "./components/place-marker";

export default function MapPage() {
  const mapRef = useRef<MapRef>(null);
  const { details, setCoords, loadDetails } = useMapClicked();

  const { visitedList } = useStore();
  const circleMarkerRefs = useRef(
    Array(visitedList.length)
      .fill(0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((_) => createRef<any>())
  );

  const goToCoords = (coords: LatLngArray) => {
    let animationTime = 2;

    const mapCenter = mapRef.current?.getCenter();
    if (
      mapCenter != null &&
      mapCenter.lat == coords[0] &&
      mapCenter?.lng === coords[1]
    )
      animationTime = 0;

    mapRef.current?.flyTo(coords, 8, {
      animate: true,
      duration: animationTime,
    });

    for (let i = 0; i < circleMarkerRefs.current.length; i++) {
      const marker = circleMarkerRefs.current[i].current;
      const latlng = marker.getLatLng();

      if (latlng.lat == coords[0] && latlng.lng == coords[1]) {
        if (animationTime === 0) marker.openPopup();
        else
          setTimeout(() => {
            marker.openPopup();
          }, animationTime * 1000);
      }
      marker.closePopup();
    }
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
      <div className="flex h-[calc(100vh-64px)] relative">
        {visitedList.length > 0 || details ? (
          <div className="left-0 min-w-2/6 md:min-w-1/6 max-h-svh overflow-y-auto overflow-x-hidden">
            <MapSidebar goToCoords={goToCoords} />
          </div>
        ) : (
          <div className="absolute italic my-4 top-0 left-0 right-0 mx-auto w-1/6 z-[9999] bg-background text-zinc-200 p-4 rounded border-2 border-zinc-500">
            Click on the last place you visited.
          </div>
        )}
        <div className="relative flex-1 h-full">
          <MapComponent ref={mapRef}>
            {visitedList.map((place, i) => (
              <PlaceMarker
                key={place.id}
                place={place}
                ref={circleMarkerRefs.current[i]}
              />
            ))}
          </MapComponent>
        </div>
      </div>
    </div>
  );
}
