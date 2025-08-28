import {
  MapContainer,
  TileLayer,
  CircleMarker,
  useMapEvent,
} from "react-leaflet";
import { forwardRef } from "react";
import type { MapRef } from "react-leaflet/MapContainer";
import { useMapClicked } from "../../../hooks/useMapClicked";

function AddNewPlaceMarker() {
  const { coords, setCoords, loadDetails } = useMapClicked();

  const map = useMapEvent("click", (e) => {
    // console.log("Map clicked at", e.latlng);
    setCoords([e.latlng.lat, e.latlng.lng]);
    map.setView([e.latlng.lat, e.latlng.lng]);
    loadDetails();
  });

  if (coords) {
    return (
      <CircleMarker
        center={coords}
        radius={8}
        color="white"
        fillColor="white"
        fillOpacity={0.5}
      />
    );
  }
  return null;
}

const MapComponent = forwardRef(function Map(
  props: { children: React.ReactNode[] },
  ref: React.Ref<MapRef>
) {
  return (
    <>
      <MapContainer
        center={[50, 0]}
        zoom={4}
        style={{
          height: "100%",
          width: "100%",
        }}
        maxZoom={13}
        minZoom={3}
        ref={ref}
      >
        <AddNewPlaceMarker />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        />
        {props.children}
      </MapContainer>
    </>
  );
});

export default MapComponent;
