import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useMapClicked } from "@/hooks/useMapClicked";
import { useStore } from "@/hooks/useStore";
import type { Place } from "@/types";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export default function LocationDetails() {
  const { addLocation } = useStore();
  const { details, clear: reset } = useMapClicked();

  const name = details.address.city || details.address.state || details.name;
  const country = details.address.country;

  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 3),
  });

  const colors = [
    "orange",
    "blue",
    "red",
    "green",
    "indigo",
  ];
  const [color, setColor] = useState(colors[0]);
  const [note, setNote] = useState("");

  const onSubmit = () => {
    if (date == undefined || date.from == undefined || date.to == undefined)
      return;

    const place: Place = {
      id: details.place_id,
      name,
      country,
      color,
      lat: +details.lat,
      lng: +details.lon,
      visitedStart: date.from.toISOString().slice(0, 10),
      visitedEnd: date.to.toISOString().slice(0, 10),
      note: note || undefined,
    };

    addLocation(place);
    console.log("Saving...", place);
    reset();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="mb-1 text-zinc-400">{details.address.country}</p>

      <span className="text-zinc-400 text-sm mb-4">
        {details.lat}, {details.lon}
      </span>

      <div className="h-px bg-gray-800 my-4" />

      <p className="text-xl">Date</p>
      <p className="text-sm text-zinc-400 mb-2">The duration of your visit</p>
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        className="rounded-md border p-2 w-full mb-2"
      />

      <br />

      <p className="text-xl mb-2">
        Note <span className="text-zinc-500 text-sm">(optional)</span>
      </p>

      <Textarea
        placeholder="Type your message here."
        rows={10}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <br />
      <fieldset className="space-y-4">
        <legend className="text-foreground text-xl leading-none font-medium">
          Choose a color
        </legend>
        <RadioGroup className="flex gap-1.5" defaultValue={color} onValueChange={setColor}>
          {colors.map((c) => (
            <RadioGroupItem
              value={c}
              aria-label={c}
              className={`size-6 border-${c}-500 bg-${c}-500 shadow-none data-[state=checked]:border-${c}-500 data-[state=checked]:bg-${c}-500`}
            />
          ))}
        </RadioGroup>
      </fieldset>

      <br />
      <Button className="mt-4 w-full" onClick={onSubmit} size={"lg"}>
        Save the visit
      </Button>

      <Accordion type="single" collapsible className="mt-3">
        <AccordionItem value="details">
          <AccordionTrigger className="text-muted text-sm">
            Stats for nerds
          </AccordionTrigger>
          <AccordionContent className="max-w-[300px]">
            <pre className="text-sm">{JSON.stringify(details, null, 2)}</pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
