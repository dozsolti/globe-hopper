import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
const screenshots = [
  {
    filename: "Screenshot 2025-08-29 111010.png",
    title: "Interactive Map",
    description:
      "Explore the world with ease using our fully integrated and interactive map. Pan, zoom, and click on locations to discover detailed information, making navigation intuitive.",
  },
  {
    filename: "save.png",
    title: "Locations",
    description:
      "Easily save your favorite locations with just a click, you can bookmark places of interest, ensuring you never lose track of important destinations or memorable spots.",
  },
  {
    filename: "localdata.png",
    title: "Data is on Your device",
    description:
      "Even without an internet connection, you can view saved locations, notes, and history, providing uninterrupted usability wherever you go.",
  },
  {
    filename: "history.png",
    title: "Keep track of your past",
    description:
      "Review previously visited locations, search queries, and actions, helping you retrace your steps and revisit important information.",
  },
  {
    filename: "fullsearch.png",
    title: "Full Search",
    description:
      "Quickly find a city or state you want with our powerful search.",
  },
];

export default function Screenshots() {
  return (
    <div className="mx-auto mt-20 px-4 max-w-6xl text-center container">
      <h2 className="mb-4 text-3xl md:text-3xl">Screenshots</h2>

      {screenshots.map((s, i) => (
        <ScreenshotSection
          key={s.filename}
          align={i % 2 == 0 ? "left" : "right"}
          title={s.title}
          filename={s.filename}
          description={s.description}
        />
      ))}
    </div>
  );
}

function ScreenshotSection({
  align = "left",

  title,
  filename,
  description,
}: {
  align?: "left" | "right";

  title: string;
  filename: string;
  description: string;
}) {
  return (
    <section
      className={`flex flex-col justify-between items-center gap-4 my-10 pb-10 not-last:border-b-2 ${
        align == "left" ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className="w-full lg:w-3/4">
        <ImageZoom zoomMargin={50}>
          <img
            src={`/screenshots/${filename}`}
            className="mx-auto max-h-[400px]"
            alt={title}
          />
        </ImageZoom>
      </div>
      <div className="flex flex-col gap-2 mb-10 lg:mb-0 lg:pl-8 w-full lg:w-1/4 lg:text-left text-center">
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-md text-zinc-400">{description}</p>
      </div>
    </section>
  );
}
