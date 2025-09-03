import { Globe } from "@/components/magicui/globe";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/useStore";
import { MoveRightIcon } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  const { visitedList } = useStore();
  const isFirstTime = visitedList.length == 0;
  return (
    <div className="mx-auto container">
      <div className="z-10 relative flex flex-col justify-center items-center bg-transparent md:mt-30 px-10 lg:px-40 pt-8">
        <div className="flex gap-2">
          <Badge variant="outline">Free</Badge>
          <Badge variant="outline">Open Source</Badge>
        </div>
        <span className="bg-clip-text bg-gradient-to-b from-black dark:from-white to-gray-300/90 dark:to-slate-900/10 font-semibold text-transparent text-8xl text-center leading-none whitespace-pre-wrap pointer-events-none">
          <h1 id="title2">{"Globe Hopper"}</h1>
        </span>
        <p className="max-w-2xl text-muted-foreground text-lg md:text-xl text-center leading-relaxed tracking-tight">
          Easily save and visualize all the cities or states you've ever visited
          on one beautiful, interactive map. Stop forgetting where you've been
          and start hopping.
        </p>
        <div className="flex flex-row gap-3 mt-8">
          <Button size="default" className="gap-2" variant="outline" asChild>
            <Link to="https://github.com/dozsolti/globe-hopper" target="_blank">
              See on Github
              <svg
                fill="white"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </Link>
          </Button>

          <div className="text-center">
            <Button size="lg" className="gap-4" asChild>
              {isFirstTime ? (
                <Link to={"/map"} className="relative">
                  Get Started <MoveRightIcon className="w-4 h-4" />
                </Link>
              ) : (
                <Link to={"/map"}>
                  Continue <MoveRightIcon className="w-4 h-4" />
                </Link>
              )}
            </Button>

            <p className="mt-2 text-muted-foreground text-sm tracking-tight">
              {isFirstTime ? "Your adventures, your data." : `Congrats! `}
              {!isFirstTime && (
                <AnimatedNumber
                  className="inline-flex items-center font-mono font-light"
                  springOptions={{
                    bounce: 0,
                    duration: 2000,
                  }}
                  value={visitedList.length}
                />
              )}{" "}
              {!isFirstTime && `locations saved already.`}
            </p>
          </div>
        </div>
      </div>
      <Globe className="top-48" />
    </div>
  );
}
