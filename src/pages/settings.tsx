import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/useStore";
import { download } from "@/lib/downloader";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";

function SettingsSection({
  title,
  description,
  button,
}: {
  title: string;
  description: string | ReactNode;
  button: ReactNode;
}) {
  return (
    <section className="flex justify-between gap-2 mb-8 ml-auto w-11/12">
      <div>
        <h2 className="text-xl">{title}</h2>
        <p className="text-zinc-400">{description}</p>
      </div>
      {button}
    </section>
  );
}

export default function SettingsPage() {
  const { visitedList, clearLocations } = useStore();
  const navigate = useNavigate();

  const clear = () => {
    if (!confirm("Delete everything?")) return;
    clearLocations();
    navigate("/map");
  };

  const exportData = () => {
    const fileName = `global-hopper-exported-${format(
      new Date(),
      "yyy-MMM-d-hh-mm"
    )}.json`;
    const fileContent = {
      name: "Globe Hopper visited places.",
      exportedAt: new Date().valueOf(),
      places: visitedList,
    };
    download(JSON.stringify(fileContent, null, 2), fileName);
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col mx-auto p-4 max-w-10/12 h-[calc(100vh-64px)]">
          <h1 className="mb-4 text-3xl">Settings</h1>

          <SettingsSection
            title="Export data"
            description={<>Remove all the delete from your machine.</>}
            button={
              <Button className="mt-2" variant={"outline"} onClick={exportData}>
                Export
              </Button>
            }
          />

          <div className="mt-auto">
            <SettingsSection
              title="Clear data"
              description={
                <>
                  Remove all the delete from your machine.{" "}
                  <span className="text-red-500">
                    THIS STEP IS IREVERSIBLE!
                  </span>
                </>
              }
              button={
                <Button
                  className="mt-2"
                  variant={"destructive"}
                  onClick={clear}
                >
                  Clear
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
