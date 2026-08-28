import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, FlipHorizontal, ImagePlus, Loader2, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CrystalGem } from "@/components/crystal-gem";
import { DiscoveryChoice, type DiscoveryChoiceValue } from "@/components/discovery-choice";
import { Button, Panel, RarityChip, SectionLabel } from "@/components/ui";
import { MINERALS } from "@/data/minerals";
import { nextInChain } from "@/data/chains";
import { captureFromVideo, fileToDataUrl } from "@/lib/image";
import { identifySpecimen, matchFieldKey, mineralToResult } from "@/lib/identify";
import { useField } from "@/lib/store";
import type { IdentifyResult } from "@/lib/types";
import { XP_REWARDS } from "@/lib/xp";
import { cn, formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/identify")({ component: IdentifyPage });

const COLORS = ["clear", "white", "purple", "green", "blue", "yellow", "red", "black", "pink", "gold", "brown"];
const LUSTERS = ["vitreous", "metallic", "pearly", "earthy", "silky", "waxy"];
const STREAKS = ["white", "black", "red", "yellow", "greenish-black", "gray"];
const SYSTEMS = ["cubic", "trigonal", "hexagonal", "orthorhombic", "monoclinic", "triclinic"];

const STEPS = [
  "Uploading your photo",
  "Reading mineral properties",
  "Matching the field catalog",
  "Estimating rarity and value",
  "Building your report",
];

function IdentifyPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [live, setLive] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifyResult | null>(null);
  const [tab, setTab] = useState<"lens" | "key" | "sample">("lens");
  const [key, setKey] = useState<{ color?: string; hardness?: number; luster?: string; streak?: string; system?: string }>({});
  const [matches, setMatches] = useState<IdentifyResult[]>([]);
  const addSpecimen = useField((s) => s.addSpecimen);
  const addXp = useField((s) => s.addXp);
  const completeQuest = useField((s) => s.completeQuest);
  const awardBadge = useField((s) => s.awardBadge);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (!busy) return;
    setStep(0);
    const t = window.setInterval(() => setStep((s) => Math.min(STEPS.length - 1, s + 1)), 900);
    return () => window.clearInterval(t);
  }, [busy]);

  async function startCam() {
    setError(null);
    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setLive(true);
    } catch {
      setError("Camera unavailable. Upload a photo instead.");
      setLive(false);
    }
  }

  function stopCam() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setLive(false);
  }

  async function shutter() {
    if (!videoRef.current) return;
    const data = await captureFromVideo(videoRef.current);
    setPhoto(data);
    stopCam();
  }

  async function onFile(f: File | undefined) {
    if (!f) return;
    const data = await fileToDataUrl(f);
    setPhoto(data);
    stopCam();
  }

  async function runIdentify() {
    if (!photo) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await identifySpecimen({ data: { imageDataUrl: photo } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setResult(res.result);
      addXp(XP_REWARDS.scan);
      completeQuest("scan");
      awardBadge("first-scan");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Scan failed.");
    } finally {
      setBusy(false);
    }
  }

  function save(r: IdentifyResult, src: "scan" | "sample" | "manual", choice: DiscoveryChoiceValue) {
    if (r.notGeological) {
      toast("Not a geological specimen.");
      return;
    }
    const sp = addSpecimen({
      mineralId: r.mineralId,
      name: r.name,
      family: r.family,
      formula: r.formula,
      rarity: r.rarity,
      confidence: r.confidence,
      photoDataUrl: photo ?? undefined,
      notes: "",
      hardness: r.hardness,
      luster: r.luster,
      crystalSystem: r.crystalSystem,
      valueLow: r.valueLow,
      valueHigh: r.valueHigh,
      fieldNotes: r.fieldNotes,
      alternatives: r.alternatives,
      source: src,
      ...choice,
    });
    const label =
      choice.disposition === "affixed_logged"
        ? "Marked in place"
        : choice.disposition === "restricted_observed"
          ? "Observed only"
          : "Logged to GeoDex";
    toast.success(`${r.name} · ${label}`);
    setResult(null);
    setPhoto(null);
    void navigate({ to: "/vault/$id", params: { id: sp.id } });
  }

  function runKey() {
    const found = matchFieldKey(key);
    setMatches(found);
    if (!found.length) toast("No catalog match — loosen a filter.");
    else {
      addXp(XP_REWARDS.scan);
      completeQuest("scan");
    }
  }

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-gold">Identify</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Specimen lens</h1>
        <p className="mt-1 text-sm text-muted">Center the specimen and fill the frame. One photo is enough.</p>
      </header>

      <div role="tablist" aria-label="Specimen identification mode" className="grid grid-cols-3 gap-1 rounded-lg bg-stone p-1">
        {(["lens", "key", "sample"] as const).map((t) => (
          <button
            key={t}
            id={`tab-${t}`}
            role="tab"
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "h-10 rounded-md text-xs font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian",
              tab === t ? "bg-obsidian text-fg" : "text-muted hover:text-fg",
            )}
          >
            {t === "lens" ? "Lens" : t === "key" ? "Field key" : "Catalog"}
          </button>
        ))}
      </div>

      {tab === "lens" && (
        <div id="panel-lens" role="tabpanel" aria-labelledby="tab-lens" className="space-y-3">
          <div className="relative overflow-hidden rounded-xl border border-line bg-obsidian aspect-[3/4]">
            {photo ? (
              <img src={photo} alt="Capture" className="size-full object-cover" />
            ) : (
              <video ref={videoRef} playsInline muted className="size-full object-cover" />
            )}
            {!photo && !live && (
              <div className="absolute inset-0 grid place-items-center p-6 text-center">
                <div>
                  <Camera className="mx-auto size-8 text-faint" />
                  <p className="mt-3 text-sm text-muted">Open the camera or upload from the roll.</p>
                  <p className="mt-2 text-xs text-faint">Good light. Fill the frame. One angle is enough.</p>
                </div>
              </div>
            )}
            {busy && (
              <div className="absolute inset-0 grid place-items-center bg-void/80 p-6 text-center">
                <div>
                  <Loader2 className="mx-auto size-8 animate-spin text-gold" />
                  <p className="mt-3 font-display text-lg text-fg">{STEPS[step]}</p>
                  <p className="mt-1 text-xs text-muted">Hold still. The report is assembling.</p>
                </div>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <div className="flex gap-2">
            {!photo && (
              <>
                <Button variant="gold" className="flex-1" onClick={live ? shutter : startCam}>
                  {live ? "Capture" : "Open camera"}
                </Button>
                <Button variant="line" onClick={() => fileRef.current?.click()} aria-label="Upload">
                  <ImagePlus className="size-4" />
                </Button>
                {live && (
                  <Button
                    variant="ghost"
                    aria-label="Flip camera"
                    onClick={() => {
                      setFacing((f) => (f === "environment" ? "user" : "environment"));
                      void startCam();
                    }}
                  >
                    <FlipHorizontal className="size-4" />
                  </Button>
                )}
              </>
            )}
            {photo && !busy && !result && (
              <>
                <Button variant="ghost" className="flex-1" onClick={() => setPhoto(null)}>
                  Retake
                </Button>
                <Button variant="gold" className="flex-1" onClick={() => void runIdentify()}>
                  Identify
                </Button>
              </>
            )}
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
        </div>
      )}

      {tab === "key" && (
        <div id="panel-key" role="tabpanel" aria-labelledby="tab-key" className="space-y-4">
          <p className="text-sm text-muted">No photo needed. Score the catalog with field tests.</p>
          <FieldChips label="Color" options={COLORS} value={key.color} onPick={(v) => setKey({ ...key, color: v })} />
          <div>
            <SectionLabel>Mohs hardness {key.hardness ?? ""}</SectionLabel>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={key.hardness ?? 5}
              onChange={(e) => setKey({ ...key, hardness: Number(e.target.value) })}
              className="w-full accent-amethyst"
            />
            <div className="mt-1 flex justify-between text-[10px] text-faint">
              <span>Talc 1</span>
              <span>Diamond 10</span>
            </div>
          </div>
          <FieldChips label="Luster" options={LUSTERS} value={key.luster} onPick={(v) => setKey({ ...key, luster: v })} />
          <FieldChips label="Streak" options={STREAKS} value={key.streak} onPick={(v) => setKey({ ...key, streak: v })} />
          <FieldChips label="System" options={SYSTEMS} value={key.system} onPick={(v) => setKey({ ...key, system: v })} />
          <Button variant="primary" className="w-full" onClick={runKey}>
            Match catalog
          </Button>
          <ul className="space-y-2">
            {matches.map((m) => (
              <li key={m.mineralId ?? m.name}>
                <ResultCard result={m} onSave={(c) => save(m, "manual", c)} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "sample" && (
        <div id="panel-sample" role="tabpanel" aria-labelledby="tab-sample" className="grid grid-cols-2 gap-3">
          {MINERALS.slice(0, 12).map((m) => (
            <button
              key={m.id}
              type="button"
              className="rh-panel rounded-xl p-3 text-left"
              onClick={() => {
                const r = mineralToResult(m, 0.9, "sample");
                setResult(r);
                addXp(XP_REWARDS.scan);
                completeQuest("scan");
                setTab("lens");
              }}
            >
              <CrystalGem hue={m.hue} system={m.crystalSystem} size={48} />
              <p className="mt-2 truncate text-sm text-fg">{m.name}</p>
              <p className="text-[11px] text-faint">{m.formula}</p>
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-void/80 p-4 pb-28">
          <div className="max-h-[78vh] w-full max-w-md overflow-y-auto">
            <button
              type="button"
              className="mb-2 ml-auto grid size-11 place-items-center rounded-md text-muted"
              onClick={() => setResult(null)}
              aria-label="Close report"
            >
              <X className="size-5" />
            </button>
            <ResultCard result={result} onSave={(c) => save(result, result.source === "sample" ? "sample" : "scan", c)} />
          </div>
        </div>
      )}
    </div>
  );
}

function FieldChips({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: string[];
  value?: string;
  onPick: (v: string) => void;
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onPick(o)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs capitalize",
              value === o ? "border-amethyst bg-amethyst/15 text-fg" : "border-line text-muted",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultCard({
  result,
  onSave,
}: {
  result: IdentifyResult;
  onSave: (choice: DiscoveryChoiceValue) => void;
}) {
  const mineral = MINERALS.find((m) => m.id === result.mineralId);
  const chain = nextInChain(result.mineralId)[0];
  const nextMin = chain ? MINERALS.find((m) => m.id === chain.nextId) : undefined;
  return (
    <Panel hairline className="p-5">
      <div className="flex items-start gap-3">
        <CrystalGem hue={mineral?.hue ?? "#8d7cff"} system={result.crystalSystem} size={64} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl text-fg">{result.name}</h2>
            <RarityChip rarity={result.rarity} />
          </div>
          <p className="mt-1 text-xs text-muted">
            {result.family}
            {result.formula ? ` · ${result.formula}` : ""}
          </p>
          <p className="mt-2 text-xs tabular-nums text-cyan">
            {Math.round(result.confidence * 100)}% confidence · {result.source === "ai" ? "Clover vision" : "field key"}
          </p>
        </div>
      </div>
      {result.notGeological && (
        <p className="mt-4 text-sm text-danger">This does not read as a geological specimen.</p>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted">{result.fieldNotes}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {[
          ["Hardness", result.hardness],
          ["Luster", result.luster],
          ["System", result.crystalSystem],
          ["Streak", result.streak],
          ["Color", result.color],
          [
            "Value",
            result.valueLow != null ? `${formatUsd(result.valueLow)}–${formatUsd(result.valueHigh ?? result.valueLow)}` : null,
          ],
        ]
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k} className="rounded-md border border-line bg-void/40 p-2.5">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-faint">{k}</dt>
              <dd className="mt-1 capitalize text-fg">{v}</dd>
            </div>
          ))}
      </dl>
      {result.keyFeatures.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-muted">
          {result.keyFeatures.map((f) => (
            <li key={f}>· {f}</li>
          ))}
        </ul>
      )}
      {result.alternatives.length > 0 && (
        <p className="mt-3 text-xs text-faint">
          Also consider {result.alternatives.map((a) => a.name).join(", ")}
        </p>
      )}
      {nextMin && chain && (
        <p className="mt-3 text-xs text-cyan">
          {chain.chain.name}: next look for {nextMin.name}.
        </p>
      )}
      {result.mineralId && (
        <Link to="/pedia/$id" params={{ id: result.mineralId }} className="mt-3 inline-flex items-center gap-1 text-xs text-cyan">
          <Sparkles className="size-3" /> Open in Mineralpedia
        </Link>
      )}
      {!result.notGeological && <DiscoveryChoice onConfirm={onSave} />}
    </Panel>
  );
}
