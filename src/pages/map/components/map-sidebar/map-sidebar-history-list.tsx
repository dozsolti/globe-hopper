import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Location } from "@/hooks/useStore";
import { FixedSizeList } from "react-window";

export default function MapSidebarHistoryList({
  places,
  onPlaceClicked,
}: {
  places: Location[];
  onPlaceClicked?: (place: Location) => void;
}) {
  if (places.length == 0) {
    return <p className="text-center text-gray-500">No results.</p>;
  }

  return (
    <FixedSizeList
      height={800}
      width={"100%"}
      itemSize={120}
      itemCount={places.length}
    >
      {({ index, style }) => (
        <div style={style}>
          <Card
            key={places[index].id}
            className="gap-2 p-4"
            style={{ height: 110 }}
          >
            <CardHeader className="p-0">
              <CardTitle>{places[index].name}</CardTitle>
              <CardDescription>
                Visited at {places[index].visitedAt}
              </CardDescription>
              <CardAction>{places[index].country} </CardAction>
            </CardHeader>
            <CardFooter className="p-0">
              <Button
                variant={"link"}
                className="m-0"
                onClick={() => onPlaceClicked?.(places[index])}
              >
                See on map
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </FixedSizeList>
  );
}
