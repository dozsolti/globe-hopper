import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { MapIcon, SettingsIcon } from "lucide-react";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const location = useLocation();

  const isSettings = location?.pathname == "/settings";
  return (
    <header className="border-b px-4 md:px-6 h-[64px] ">
      <div className="grid grid-cols-3 h-16 items-center justify-between gap-4 max-w-10/12 mx-auto">
        <Link
          to="/"
          className="text-primary hover:text-primary/90 flex gap-4 w-fit"
        >
          <Logo />
          <span className="text-xl">Globe Hopper</span>
        </Link>
        {children}
        <div className="flex flex-1 items-center justify-end gap-2">
          {isSettings ? (
            <Button variant="ghost" size="sm" className="text-sm">
              <MapIcon />
              <Link to="/map">Map</Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="text-sm">
              <SettingsIcon />
              <Link to="/settings">Settings</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
