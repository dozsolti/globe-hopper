import { GradientBars } from "@/components/gradient-bars";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Hero from "./components/hero";
import { isMobile } from "@/lib/constants";
import TeamSection from "./components/teams";
import Footer from "./components/footer";
import Screenshots from "./components/screenshots";
import FeaturesGrid from "./components/features-grid";

export default function HomePage() {
  return (
    <>
      <ScrollProgress className="top-0" />
      <GradientBars
        colors={
          isMobile
            ? ["rgb(241 179 0 / 35%)", "transparent"]
            : ["transparent", "rgb(241 179 0 / 30%)", "transparent"]
        }
        bars={isMobile ? 1 : 20}
      />
      <div className="w-full">
        <Hero />
        <FeaturesGrid />

        <Screenshots />

        <TeamSection
          className="mt-20"
          subtitle={`Found any bug? Don't hesitate to report it.\nDidn't found any? Leave a star ⭐.`}
        />

        <Footer />
      </div>
    </>
  );
}
