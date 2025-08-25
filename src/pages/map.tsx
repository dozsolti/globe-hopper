import Map from "@/components/map";
import MapSearchBar from "@/components/MapSearchBar";
import Navbar from "@/components/NavBar";

export default function MapPage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <div className="w-1/5">Side bar</div>
        <div className="relative w-4/5">
          <Map />
        </div>
      </div>
    </>
  );
}
