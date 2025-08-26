import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SettingsIcon } from "lucide-react";

export default function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="border-b px-4 md:px-6 h-[64px] ">
      <div className="flex h-16 items-center justify-between gap-4 max-w-10/12 mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="text-primary hover:text-primary/90 flex gap-4"
          >
            <Logo />
            <span className="text-xl">Globe Hopper</span>
          </Link>
        </div>
        {children}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="sm" className="text-sm">
            <SettingsIcon />
            <Link to="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
