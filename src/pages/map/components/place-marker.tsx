import { useStore } from "@/hooks/useStore";
import type { Place } from "@/types";
import { forwardRef } from "react";
import { CircleMarker, Popup } from "react-leaflet";

const PlaceMarker = forwardRef(function (
  { place }: { place: Place },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>
) {
  const { removeLocation } = useStore();
  const askForDelete = () => {
    if (
      !confirm(
        `Are you sure you wanna delete '${place.name}' ${place.visitedStart}?`
      )
    )
      return;
    removeLocation(place);
  };
  return (
    <CircleMarker
      center={[place.lat, place.lng]}
      radius={8}
      color={place.color}
      fillColor={place.color}
      fillOpacity={0.5}
      ref={ref}
    >
      <Popup>
        <b>{place.name}</b> - {place.country}
        <br />
        <p>
          Visited at {place.visitedStart} - {place.visitedEnd}
        </p>
        {place.note ? <p className="mt-2">{place.note}</p> : null}
        <button
          className="cursor-pointer text-amber-700"
          onClick={askForDelete}
        >
          Delete
        </button>
      </Popup>
    </CircleMarker>
  );
});

export default PlaceMarker;
