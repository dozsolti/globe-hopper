import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMapEvent,
} from "react-leaflet";
import { forwardRef } from "react";
import type { MapRef } from "react-leaflet/MapContainer";
import { useStore } from "@/hooks/store";
import { useMapClicked } from "../hooks/useMapClicked";

function AddNewPlaceMarker() {
  const { coords, setCoords, setDetails } = useMapClicked();

  const map = useMapEvent("click", (e) => {
    // console.log("Map clicked at", e.latlng);
    setCoords([e.latlng.lat, e.latlng.lng]);
    map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom(), { animate: true });

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
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

const Map = forwardRef(function Map(props, ref: React.Ref<MapRef>) {
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
            color="orange"
            fillColor="orange"
            fillOpacity={0.5}
          >
            <Popup>
              {place.name} - {place.country}
              <br />
              Visited at {place.visitedAt}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
});

export default Map;
