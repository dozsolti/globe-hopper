import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMapEvent,
} from "react-leaflet";
import { forwardRef } from "react";
import type { MapRef } from "react-leaflet/MapContainer";
import { useStore } from "@/hooks/useStore";
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

const MapComponent = forwardRef(function Map(_props, ref: React.Ref<MapRef>) {
  const { visitedList } = useStore();

  return (
    <>
      <MapContainer
        center={[40, 0]}
        zoom={3}
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
        {visitedList.map((place) => (
          <CircleMarker
            key={place.id}
            center={[place.lat, place.lng]}
            radius={8}
            color={place.color}
            fillColor={place.color}
            fillOpacity={0.5}
          >
            <Popup>
              <b>{place.name}</b> - {place.country}
              <br />
              <p>
                Visited at {place.visitedStart} - {place.visitedEnd}
              </p>
              {place.note ? <p className="mt-2">{place.note}</p> : null}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
});

export default MapComponent;
