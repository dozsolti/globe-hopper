import type React from "react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  teamMembers?: TeamMember[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  secondaryColor?: string;
  className?: string;
}

export interface SupportTeamProps extends TeamSectionProps {
  ctaButtons?: Array<{
    label: string;
    href?: string;
    isPrimary?: boolean;
    icon?: React.ReactNode;
    onClick?: () => void;
  }>;
}

const TEAM_MEMBERS = [
  {
    id: 1,
    image:
      "https://scontent.fomr1-1.fna.fbcdn.net/v/t39.30808-1/433972441_7409327972439343_4617792587026520926_n.jpg?stp=c0.0.1365.1365a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=fuIRawvgEPEQ7kNvwHXmO-Z&_nc_oc=AdkwDZtUNRLg0YN65RMrQAIrj9B7kPWS0j1f3oasieUbd_WIASpKnJi9zucl5LIWwew&_nc_zt=24&_nc_ht=scontent.fomr1-1.fna&_nc_gid=eZMD8Yvh_kNYFI6LrmnTEw&oh=00_AfW7ajwUejvf2t34TndCrMBITvS6zl1EocG6mrH9GlIQTw&oe=68BCCA11",
    name: "Zsolti Domotor",
    role: "Developer",
  },
  {
    id: 2,
    image:
      "https://scontent.fomr1-1.fna.fbcdn.net/v/t39.30808-1/433972441_7409327972439343_4617792587026520926_n.jpg?stp=c0.0.1365.1365a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=fuIRawvgEPEQ7kNvwHXmO-Z&_nc_oc=AdkwDZtUNRLg0YN65RMrQAIrj9B7kPWS0j1f3oasieUbd_WIASpKnJi9zucl5LIWwew&_nc_zt=24&_nc_ht=scontent.fomr1-1.fna&_nc_gid=eZMD8Yvh_kNYFI6LrmnTEw&oh=00_AfW7ajwUejvf2t34TndCrMBITvS6zl1EocG6mrH9GlIQTw&oe=68BCCA11",
    name: "Zsolt Domotor",
    role: "Developer",
  },
  {
    id: 3,
    image:
      "https://scontent.fomr1-1.fna.fbcdn.net/v/t39.30808-1/433972441_7409327972439343_4617792587026520926_n.jpg?stp=c0.0.1365.1365a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=fuIRawvgEPEQ7kNvwHXmO-Z&_nc_oc=AdkwDZtUNRLg0YN65RMrQAIrj9B7kPWS0j1f3oasieUbd_WIASpKnJi9zucl5LIWwew&_nc_zt=24&_nc_ht=scontent.fomr1-1.fna&_nc_gid=eZMD8Yvh_kNYFI6LrmnTEw&oh=00_AfW7ajwUejvf2t34TndCrMBITvS6zl1EocG6mrH9GlIQTw&oe=68BCCA11",
    name: "Domotor Zsolt",
    role: "Designer",
  },
  {
    id: 4,
    image:
      "https://scontent.fomr1-1.fna.fbcdn.net/v/t39.30808-1/433972441_7409327972439343_4617792587026520926_n.jpg?stp=c0.0.1365.1365a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=fuIRawvgEPEQ7kNvwHXmO-Z&_nc_oc=AdkwDZtUNRLg0YN65RMrQAIrj9B7kPWS0j1f3oasieUbd_WIASpKnJi9zucl5LIWwew&_nc_zt=24&_nc_ht=scontent.fomr1-1.fna&_nc_gid=eZMD8Yvh_kNYFI6LrmnTEw&oh=00_AfW7ajwUejvf2t34TndCrMBITvS6zl1EocG6mrH9GlIQTw&oe=68BCCA11",
    name: "Dom Zso",
    role: "AI Engineer",
  },
  {
    id: 5,
    image:
      "https://scontent.fomr1-1.fna.fbcdn.net/v/t39.30808-1/433972441_7409327972439343_4617792587026520926_n.jpg?stp=c0.0.1365.1365a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=fuIRawvgEPEQ7kNvwHXmO-Z&_nc_oc=AdkwDZtUNRLg0YN65RMrQAIrj9B7kPWS0j1f3oasieUbd_WIASpKnJi9zucl5LIWwew&_nc_zt=24&_nc_ht=scontent.fomr1-1.fna&_nc_gid=eZMD8Yvh_kNYFI6LrmnTEw&oh=00_AfW7ajwUejvf2t34TndCrMBITvS6zl1EocG6mrH9GlIQTw&oe=68BCCA11",
    name: "DZ",
    role: "AI Engineer",
  },
];
const CTA_BUTTONS = [
  {
    label: "Report an issue",
    href: "https://github.com/dozsolti/globe-hopper/issues/new",
  },
  {
    label: "Star it on GitHub",
    isPrimary: true,
    icon: <GitHubLogoIcon className="mr-2" />,
    href: "https://github.com/dozsolti/globe-hopper/stargazers",
  },
];

export default function TeamSection({
  title,
  subtitle,
  teamMembers = TEAM_MEMBERS,
  accentColor = "#f0b100",
  secondaryColor = "#6b7280",
  className,
  ctaButtons = CTA_BUTTONS,
}: SupportTeamProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto px-4 max-w-6xl container">
        <div className="shadow-sm p-8 md:p-12 rounded-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-semibold text-3xl md:text-4xl">{title}</h2>
            <p
              className="mx-auto max-w-2xl text-base whitespace-pre-wrap"
              style={{ color: secondaryColor }}
            >
              {subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {ctaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href || "#"}
                  className={cn(
                    "flex justify-center items-center px-6 py-2.5 rounded-full font-medium text-sm transition-all",
                    button.isPrimary
                      ? "text-gray-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  )}
                  style={
                    button.isPrimary ? { backgroundColor: accentColor } : {}
                  }
                  onClick={button.onClick}
                >
                  {button.icon}
                  {button.label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative mt-12">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="top-1/2 left-0 z-10 absolute bg-primary shadow-md p-2 rounded-full -translate-y-1/2"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              className="flex gap-4 pb-4 overflow-x-auto hide-scrollbar"
              onScroll={checkScrollButtons}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 bg-card/90 opacity-100 hover:opacity-75 shadow-sm hover:shadow-md border border-white/10 rounded-lg w-64 overflow-hidden transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm" style={{ color: secondaryColor }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="top-1/2 right-0 z-10 absolute bg-primary shadow-md p-2 rounded-full -translate-y-1/2"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
