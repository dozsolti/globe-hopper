import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { MapIcon, SettingsIcon } from "lucide-react";
import { isMobile } from "@/lib/constants";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const location = useLocation();

  const isSettings = location?.pathname == "/settings";
  return (
    <header className="px-4 md:px-6 border-b h-[64px]">
      <div className="flex flex-cols justify-between items-center gap-2 mx-auto max-w-full min-md:max-w-10/12 h-16">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary hover:text-primary/90"
        >
          <Logo size={isMobile ? 30 : 40} />
          <span className="w-min max-md:text-lg text-xl">
            Globe
            <br />
            Hopper
          </span>
        </Link>
        <div className="relative max-md:flex-3 mx-auto w-1/6">{children}</div>
        <div className="flex justify-end items-center gap-2">
          {isSettings ? (
            <Link to="/map">
              <Button variant="ghost" size="sm" className="text-sm">
                <MapIcon />
                Map
              </Button>
            </Link>
          ) : (
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="text-sm">
                <SettingsIcon />
                <span className="max-md:hidden">Settings</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
