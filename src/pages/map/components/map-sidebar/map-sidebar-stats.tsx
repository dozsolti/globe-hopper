import { useStore } from "@/hooks/useStore";
import { MapIcon } from "lucide-react";

export default function MapSidebarStats() {
  const { visitedList } = useStore();

  const totalCitiesVisited = visitedList.length;
  const totalCountriesVisited = new Set(visitedList.map((x) => x.country)).size;

  return (
    <>
      <div className="flex text-xl mb-4 align-middle">
        <MapIcon className="me-2" />
        <p>Stats</p>
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
    </>
  );
}
