import {
  CodeIcon,
  SmartphoneIcon,
  CoinsIcon,
  User,
  type LucideIcon,
} from "lucide-react";

const features: FeatureItem[] = [
  {
    icon: CoinsIcon,
    title: "Free to Use",
    description: "Completely free to use with no hidden costs or premium features.",
  },
  {
    icon: CodeIcon,
    title: "Open Source",
    description:
      "My code is available on GitHub for transparency and community contributions.",
  },
  {
    icon: SmartphoneIcon,
    title: "Easy to Use",
    description:
      "Designed with user-friendliness in mind, following modern design principles.",
  },

  {
    icon: User,
    title: "Privacy Focused",
    description:
      "All the data is processed and saved locally on your device, ensuring maximum privacy.",
  },
];

export default function FeaturesGrid() {
  return (
    <div className="mx-auto mt-20 px-4 pt-20 pb-8 max-w-5xl text-center">
      <div className="mb-6">
        <h2 className="mb-2 sm:mb-2.5 text-foreground text-3xl text-center">
          Key Benefits of <span className="text-primary">Global Hopper</span>
        </h2>
        <p className="mx-auto text-muted-foreground text-center text-pretty">
          The best way to keep track of your visited places, because you have
          full flexibilty & control.
        </p>
      </div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  );
}

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon;

  return (
    <div className="relative bg-secondary/50 p-4 ring-border rounded-2xl ring text-sm text-center">
      <div className="top-0 left-0 absolute m-4 text-[2rem] text-primary">
        <Icon />
      </div>
      <h2 className="mb-2.5 text-foreground text-2xl">{feature.title}</h2>
      <p className="mx-auto max-w-10/12 text-muted-foreground text-base text-pretty">
        {feature.description}
      </p>
      {/* Decorative elements */}
      <span className="-bottom-px left-1/2 absolute bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-60 w-1/2 h-px -translate-x-1/2"></span>
      <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,hsl(var(--primary)/0.15)_0%,transparent_100%)] opacity-60"></span>
    </div>
  );
};
