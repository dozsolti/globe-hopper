import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/useStore";
import { useNavigate } from "react-router";

export default function SettingsPage() {
  const { clearLocations } = useStore();
  const navigate = useNavigate();

  const clear = () => {
    if (!confirm("Delete everything?")) return;
    clearLocations();
    navigate("/map");
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col h-[calc(100vh-64px)] max-w-8/12 mx-auto p-4">
          <h1 className="text-3xl">Settings</h1>
          <section className="gap-2 mt-4">
            <h2 className="text-xl">Clear data</h2>
            <p className="text-zinc-400">
              Remove all the delete from your machine.{" "}
              <span className="text-red-500">THIS STEP IS IREVERSIBLE!</span>
            </p>
            <Button className="mt-2" variant={"destructive"} onClick={clear}>
              Clear
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}
