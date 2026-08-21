import { Camera, Compass, Gem } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import { useField } from "@/lib/store";

const SLIDES = [
  {
    icon: Camera,
    kicker: "Scan",
    title: "Photograph a specimen. Get a field report.",
    body: "Clover reads color, habit, and luster. One photo is enough. Confidence stays honest.",
  },
  {
    icon: Compass,
    kicker: "Explore",
    title: "Localities with land status attached.",
    body: "Public beaches, fee digs, alpine claims. Every pin carries access notes — verify before you go.",
  },
  {
    icon: Gem,
    kicker: "Choose",
    title: "Collect, or mark it in place.",
    body: "GeoDex logs both paths. Steward XP for leaving a find. Collector XP for legal collection. Extraction is never the only win.",
  },
];

export function Onboarding() {
  const [i, setI] = useState(0);
  const [name, setName] = useState("");
  const complete = useField((s) => s.completeOnboarding);
  const slide = SLIDES[i];
  const Icon = slide.icon;
  const last = i === SLIDES.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/94 p-4">
      <div className="rh-panel rh-hairline w-full max-w-md rounded-2xl p-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-amethyst">RockHound-GO</p>
        <div className="mt-5 grid size-12 place-items-center rounded-lg border border-line bg-stone">
          <Icon className="size-5 text-gold" />
        </div>
        <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-faint">{slide.kicker}</p>
        <h1 className="mt-2 font-display text-2xl leading-tight text-fg">{slide.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{slide.body}</p>

        {last && (
          <label className="mt-5 block">
            <span className="text-[10px] uppercase tracking-[0.16em] text-faint">What should we call you</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Field name"
              className="mt-2 h-11 w-full rounded-md border border-line-strong bg-void px-3 text-sm text-fg outline-none placeholder:text-faint focus:border-amethyst"
            />
          </label>
        )}

        <div className="mt-6 flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 flex-1 rounded-full ${idx <= i ? "bg-amethyst" : "bg-fg/10"}`}
            />
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={() => complete(name)}>
            Skip
          </Button>
          {last ? (
            <Button variant="gold" className="flex-1" onClick={() => complete(name)}>
              Enter the field
            </Button>
          ) : (
            <Button variant="primary" className="flex-1" onClick={() => setI((v) => v + 1)}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
